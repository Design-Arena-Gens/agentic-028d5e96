interface ImpactMetric {
  title: string;
  value: string;
  sublabel: string;
  trend?: {
    value: number;
    label: string;
  };
}

export function ImpactSummary({ metrics }: { metrics: ReadonlyArray<ImpactMetric> }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.title}
          className="rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
        >
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {metric.title}
          </p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            {metric.value}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {metric.sublabel}
          </p>
          {metric.trend && (
            <p
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                metric.trend.value >= 0
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-100"
              }`}
            >
              <span aria-hidden className="text-base leading-none">
                {metric.trend.value >= 0 ? "↑" : "↓"}
              </span>
              {Math.abs(metric.trend.value).toFixed(1)}% {metric.trend.label}
            </p>
          )}
        </article>
      ))}
    </section>
  );
}
