import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

const getCachedReviews = unstable_cache(
  async (token, mapsUrl) => {
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
      cache: "no-store",
    });

    if (!runRes.ok) {
      throw new Error(`Apify run start nahi hui: ${await runRes.text()}`);
    }

    const runJson = await runRes.json();
    const runId = runJson?.data?.id || runJson?.id;
    let datasetId = runJson?.data?.defaultDatasetId || runJson?.defaultDatasetId;

    if (!runId) {
      throw new Error("Scraper run ID nahi mila");
    }

    let status = runJson?.data?.status || "READY";

    for (let attempt = 0; attempt < 25 && status !== "SUCCEEDED"; attempt += 1) {
      if (["FAILED", "ABORTED", "TIMED_OUT"].includes(status)) {
        throw new Error(`Apify scraper ${status.toLowerCase()} ho gaya`);
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const statusRes = await fetch(
        `https://api.apify.com/v2/acts/${actorId}/runs/${runId}?token=${token}`,
        { cache: "no-store" }
      );

      if (!statusRes.ok) {
        throw new Error(`Apify run status fetch nahi ho saka: ${await statusRes.text()}`);
      }

      const statusJson = await statusRes.json();
      status = statusJson?.data?.status || status;
      datasetId = statusJson?.data?.defaultDatasetId || datasetId;
    }

    if (status !== "SUCCEEDED") {
      throw new Error("Apify scraper waqt par complete nahi hua");
    }

    if (!datasetId) {
      throw new Error("Dataset ID nahi mila, review scrape complete nahi hui");
    }

    const itemsUrl = `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`;
    const itemsRes = await fetch(itemsUrl, { cache: "no-store" });

    if (!itemsRes.ok) {
      throw new Error(`Dataset se reviews fetch nahi hui: ${await itemsRes.text()}`);
    }

    const rawData = await itemsRes.json();
    const rawReviews = Array.isArray(rawData)
      ? rawData
      : Array.isArray(rawData?.items)
        ? rawData.items
        : [];

    return rawReviews.map((r) => ({
      name: r.name || r.author || "Customer",
      rating: Number(r.stars || r.rating || 5),
      text: r.text || r.textTranslated || "Great service!",
      photo: r.profilePhotoUrl || r.photo || "",
      relativeTime: r.publishedAtDate
        ? new Date(r.publishedAtDate).toLocaleDateString()
        : r.relativeTime || "Recently",
    }));
  },
  ["google-maps-reviews"],
  { revalidate: 3600, tags: ["google-reviews"] }
);

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
    const reviews = await getCachedReviews(token, mapsUrl);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}