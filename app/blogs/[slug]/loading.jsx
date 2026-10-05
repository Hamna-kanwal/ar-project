export default function BlogDetailLoading() {
  return (
    <main className="mt-[50px] min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading article">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 space-y-4 text-center">
          <div className="mx-auto h-10 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="mx-auto h-10 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="mx-auto h-1.5 w-20 rounded-full bg-slate-200" />
        </div>
        <div className="mb-12 h-[300px] animate-pulse rounded-3xl bg-slate-200 sm:h-[400px]" />
        <div className="space-y-4">
          <div className="h-5 animate-pulse rounded bg-slate-200" />
          <div className="h-5 animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </main>
  );
}
