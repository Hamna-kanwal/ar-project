export default function BlogsLoading() {
  return (
    <main className="bg-slate-100 px-6 py-20" aria-busy="true" aria-label="Loading blog posts">
      <header className="mb-12 text-center">
        <div className="mx-auto mb-3 h-10 w-64 animate-pulse rounded bg-slate-200" />
        <div className="mx-auto h-1.5 w-20 rounded-full bg-slate-200" />
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {[0, 1, 2].map((card) => (
          <div key={card} className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="h-56 animate-pulse bg-slate-200" />
            <div className="space-y-4 p-8">
              <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
