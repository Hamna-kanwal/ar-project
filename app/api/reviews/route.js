import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.APIFY_API_TOKEN;
  const mapsUrl = process.env.GOOGLE_MAPS_URL;

  if (!token || !mapsUrl) {
    return NextResponse.json(
      { error: "APIFY_API_TOKEN ya GOOGLE_MAPS_URL missing hai" },
      { status: 500 }
    );
  }

  try {
    const actorId = "compass~google-maps-reviews-scraper";
    const runUrl = `https://api.apify.com/v2/acts/${actorId}/runs?token=${token}`;

    const inputData = {
      startUrls: [{ url: mapsUrl }],
      maxReviews: 10,
      language: "en",
    };

    const runRes = await fetch(runUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    });

    if (!runRes.ok) {
      const errorText = await runRes.text();
      return NextResponse.json(
        { error: "Apify run start nahi hui", details: errorText },
        { status: 500 }
      );
    }

    const runJson = await runRes.json();
    const runId = runJson?.data?.id || runJson?.id;
    const datasetId = runJson?.data?.defaultDatasetId || runJson?.defaultDatasetId;

    if (!runId) {
      return NextResponse.json(
        { error: "Scraper run ID nahi mila" },
        { status: 500 }
      );
    }

    let status = runJson?.data?.status || "READY";

    for (let attempt = 0; attempt < 25; attempt += 1) {
      if (status === "SUCCEEDED") break;

      if (status === "FAILED" || status === "ABORTED" || status === "TIMED_OUT") {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const statusRes = await fetch(
        `https://api.apify.com/v2/acts/${actorId}/runs/${runId}?token=${token}`
      );

      if (!statusRes.ok) break;

      const statusJson = await statusRes.json();
      status = statusJson?.data?.status || status;
    }

    const finalDatasetId = datasetId || runJson?.data?.defaultDatasetId;

    if (!finalDatasetId) {
      return NextResponse.json(
        { error: "Dataset ID nahi mila, review scrape complete nahi hui" },
        { status: 500 }
      );
    }

    const itemsUrl = `https://api.apify.com/v2/datasets/${finalDatasetId}/items?token=${token}`;
    const itemsRes = await fetch(itemsUrl, { next: { revalidate: 86400 } });

    if (!itemsRes.ok) {
      const errorText = await itemsRes.text();
      return NextResponse.json(
        { error: "Dataset se reviews fetch nahi hui", details: errorText },
        { status: 500 }
      );
    }

    const rawData = await itemsRes.json();
    const rawReviews = Array.isArray(rawData)
      ? rawData
      : Array.isArray(rawData?.items)
        ? rawData.items
        : [];

    const formattedReviews = rawReviews.map((r) => ({
      name: r.name || r.author || "Customer",
      rating: Number(r.stars || r.rating || 5),
      text: r.text || r.textTranslated || "Great service!",
      photo: r.profilePhotoUrl || r.photo || "",
      relativeTime: r.publishedAtDate
        ? new Date(r.publishedAtDate).toLocaleDateString()
        : r.relativeTime || "Recently",
    }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}