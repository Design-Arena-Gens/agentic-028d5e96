export function Hero() {
  return (
    <section className="rounded-3xl border border-transparent bg-gradient-to-br from-orange-500 via-rose-500 to-emerald-500 p-1 shadow-xl shadow-orange-500/20">
      <div className="rounded-[22px] bg-white/90 p-8 backdrop-blur dark:bg-zinc-950/90">
        <p className="text-xs uppercase tracking-[0.35em] text-orange-500 dark:text-orange-300">
          Orange Blossom Alliance
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          Track the ripple of every donation
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-300">
          The Impact Tracker blends fundraising velocity with on-the-ground transformation. Surface
          progress, steward recurring allies, and narrate the change Orange Blossom Alliance unlocks
          across nourishment, healing, and housing justice.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-700 dark:bg-orange-500/20 dark:text-orange-100">
            2024 Impact Cohort Dashboard
          </span>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100">
            Updated daily from alliance field reports
          </span>
        </div>
      </div>
    </section>
  );
}

