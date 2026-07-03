// app/blog/[slug]/page.js
export default async function Page({ params }) {
  const { slug } = await params;
  
  return (
    <div className="p-10">
      <h1>Yeh {slug} ka detail page hai</h1>
      {/* Yahan aap apna detail content load kar sakte hain */}
    </div>
  );
}