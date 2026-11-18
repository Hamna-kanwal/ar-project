import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL);

try {
  await client.connect();
  const col = client.db().collection("pages");

  const total = await col.countDocuments();

  const duplicates = await col.aggregate([
    { $group: { _id: "$id", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]).toArray();

  console.log("Total pages:", total);
  console.log("Duplicate page IDs:", duplicates.length);
  console.log("Duplicates:", duplicates);
  console.log("Existing service pages:", await col.countDocuments({ id: /^services-/ }));
  console.log("About Us page:", await col.countDocuments({ id: "about-us" }));
  console.log("Blogs page:", await col.countDocuments({ id: "blogs" }));

} catch (error) {
  console.log("ERROR:", error.message);
} finally {
  await client.close();
}
