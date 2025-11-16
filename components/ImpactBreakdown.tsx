interface ImpactSlice {
  id: string;
  label: string;
  value: number;
  descriptor: string;
  accent: string;
}

export function ImpactBreakdown({ slices }: { slices: ReadonlyArray<ImpactSlice> }) {
  const max = Math.max(...slices.map((slice) => slice.value));

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-500 dark:text-orange-300">
            Program allocation
          </p>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Where Orange Blossom dollars are landing
          </h3>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Live allocation from the current campaign cycle.
        </p>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {slices.map((slice) => {
          const percent = max === 0 ? 0 : Math.round((slice.value / max) * 100);
          return (
            <article
              key={slice.id}
              className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {slice.label}
                </p>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: slice.accent }}
                  aria-hidden
                />
              </div>
              <p className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                ${slice.value.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{slice.descriptor}</p>
              <div className="mt-4">
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800" aria-hidden>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percent}%`,
                      background: `linear-gradient(90deg, ${slice.accent}, rgba(255,255,255,0.2))`,
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {percent}% of top funded program
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
