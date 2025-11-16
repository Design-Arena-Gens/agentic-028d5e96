interface Highlight {
  title: string;
  summary: string;
  location: string;
  timeframe: string;
  categories: ReadonlyArray<string>;
}

export function CommunityHighlights({ highlights }: { highlights: ReadonlyArray<Highlight> }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
            Field notes
          </p>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Orange Blossom stories in motion
          </h3>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Snapshot moments to share with donors and community partners.
        </p>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/60"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-orange-500 dark:text-orange-300">
                {highlight.location}
              </p>
              <h4 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {highlight.title}
              </h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {highlight.summary}
              </p>
            </div>
            <footer className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                {highlight.timeframe}
              </span>
              <ul className="flex gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                {highlight.categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 dark:bg-zinc-800"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
