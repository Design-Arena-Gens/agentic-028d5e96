interface CampaignGoal {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  supporters: number;
  focus: string;
  deadlineLabel: string;
  highlights: ReadonlyArray<string>;
}

export function GoalProgress({ campaigns }: { campaigns: ReadonlyArray<CampaignGoal> }) {
  return (
    <section className="space-y-4">
      {campaigns.map((campaign) => {
        const percent = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));
        return (
          <article
            key={campaign.id}
            className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70"
          >
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-orange-500 dark:text-orange-300">
                  {campaign.focus}
                </p>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {campaign.name}
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {campaign.deadlineLabel}
              </p>
            </header>

            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {campaign.description}
            </p>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 transition-all"
                  style={{ width: `${percent}%` }}
                  aria-hidden
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
                <p className="text-zinc-900 dark:text-zinc-50">
                  ${campaign.raised.toLocaleString()} raised
                </p>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Goal ${campaign.goal.toLocaleString()} • {campaign.supporters} supporters
                </p>
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              {campaign.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-full bg-orange-50 px-3 py-1 dark:bg-orange-500/10"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
