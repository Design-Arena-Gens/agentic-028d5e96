"use client";

import { useMemo, useState } from "react";

const PROGRAMS = [
  {
    id: "nourishment",
    name: "Community Nourishment",
    description: "Fresh produce boxes, culturally rooted cooking classes, and neighborhood food hubs.",
    impact: {
      mealsPerDollar: 2.8,
      familiesPer100: 4,
      youthWorkshopsPer250: 1,
    },
  },
  {
    id: "healing",
    name: "Healing Arts & Wellness",
    description: "Trauma-informed counseling, mindfulness labs, and healing arts residencies.",
    impact: {
      therapyMinutesPerDollar: 2.2,
      wellnessKitsPer120: 1,
      cohortSpotsPer500: 1,
    },
  },
  {
    id: "shelter",
    name: "Safe Harbor Housing",
    description: "Transitional housing, survivor navigation, and rapid rehousing stipends.",
    impact: {
      nightsPerDollar: 0.35,
      householdsStabilizedPer400: 1,
      safetyAuditsPer150: 1,
    },
  },
] as const;

type ProgramConfig = (typeof PROGRAMS)[number];
type ProgramId = ProgramConfig["id"];

type Frequency = "one-time" | "monthly";

export function ImpactCalculator() {
  const [amount, setAmount] = useState(250);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [programId, setProgramId] = useState<ProgramId>(PROGRAMS[0].id);

  const program = useMemo(
    (): ProgramConfig => PROGRAMS.find((item) => item.id === programId) ?? PROGRAMS[0],
    [programId],
  );

  const projection = useMemo(() => {
    const multiplier = frequency === "monthly" ? 12 : 1;
    const annual = amount * multiplier;

    if (program.id === "nourishment") {
      return {
        headline: `${Math.round(program.impact.mealsPerDollar * annual).toLocaleString()} meals`,
        secondary: `${Math.round((annual / 100) * program.impact.familiesPer100)} families supported`,
        tertiary: `${Math.round((annual / 250) * program.impact.youthWorkshopsPer250)} youth workshops funded`,
      };
    }

    if (program.id === "healing") {
      return {
        headline: `${Math.round(program.impact.therapyMinutesPerDollar * annual).toLocaleString()} therapy minutes`,
        secondary: `${Math.round((annual / 120) * program.impact.wellnessKitsPer120)} wellness kits delivered`,
        tertiary: `${Math.round((annual / 500) * program.impact.cohortSpotsPer500)} cohort scholarships`,
      };
    }

    return {
      headline: `${(program.impact.nightsPerDollar * annual).toFixed(0)} safe nights`,
      secondary: `${Math.round((annual / 400) * program.impact.householdsStabilizedPer400)} households stabilized`,
      tertiary: `${Math.round((annual / 150) * program.impact.safetyAuditsPer150)} safety audits completed`,
    };
  }, [amount, frequency, program]);

  return (
    <section className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-emerald-50 p-6 shadow-sm dark:border-orange-500/20 dark:from-orange-400/10 dark:via-zinc-900 dark:to-emerald-400/10">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-500 dark:text-orange-300">
            Impact calculator
          </p>
          <h3 className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Forecast your Orange Blossom impact
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Adjust your gift to see the ripple effect across community nourishment, healing, and housing initiatives.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="donation-amount"
              className="flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Monthly commitment
              <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                ${amount}
              </span>
            </label>
            <input
              id="donation-amount"
              type="range"
              min={25}
              max={2500}
              step={25}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-3 w-full accent-orange-500"
            />
            <div className="mt-1 flex justify-between text-[11px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              <span>$25</span>
              <span>$1,250</span>
              <span>$2,500</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Frequency
            </label>
            <div className="flex rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
              {(["monthly", "one-time"] as Frequency[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFrequency(option)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    frequency === option
                      ? "bg-orange-500 text-white shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {option === "monthly" ? "Monthly" : "One-time"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Partner program
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {PROGRAMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProgramId(item.id)}
                  className={`rounded-2xl border p-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-zinc-700 ${
                    programId === item.id
                      ? "border-orange-500 bg-white shadow-sm dark:bg-zinc-900"
                      : "border-zinc-200 bg-white/60 hover:border-orange-300 dark:bg-zinc-900/60"
                  }`}
                >
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col justify-between rounded-2xl border border-orange-200 bg-white/80 p-5 text-sm shadow-sm dark:border-orange-500/30 dark:bg-zinc-900/80">
          <div>
            <p className="text-xs uppercase tracking-wide text-orange-500 dark:text-orange-300">
              Annualized impact
            </p>
            <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {projection.headline}
            </p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{projection.secondary}</p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">{projection.tertiary}</p>
          </div>
          <div className="mt-6 rounded-xl border border-dashed border-orange-300 bg-orange-50 p-4 text-xs text-orange-700 dark:border-orange-500/50 dark:bg-orange-500/10 dark:text-orange-200">
            Consistent giving unlocks cohort mentorship, on-site volunteers, and storytelling touchpoints from the Orange Blossom Alliance field teams.
          </div>
        </aside>
      </div>
    </section>
  );
}
