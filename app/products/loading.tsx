export default async function ProductsLoading() {
  return (
    <div className="mx-auto max-w-2xl flex-1 px-8 py-16">
      <div
        className="mb-8 h-6 w-1/3 animate-pulse rounded bg-black/[.06]
         dark:bg-white/[.08]"
      ></div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-black/[.04]
                 dark:bg-white/[.06]"
          >
            준비중
          </div>
        ))}
      </div>
    </div>
  );
}
