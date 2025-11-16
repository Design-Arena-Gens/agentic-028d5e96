"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Frequency = "One-time" | "Monthly" | "Quarterly";

type FocusArea = "Community Nourishment" | "Healing Arts" | "Safe Harbor Housing";

interface DonationRecord {
  id: string;
  donor: string;
  amount: number;
  frequency: Frequency;
  focusArea: FocusArea;
  date: string;
  note?: string;
}

const STORAGE_KEY = "orangeblossomalliance-donations";

const PRESEEDED_DONATIONS: DonationRecord[] = [
  {
    id: "seed-1",
    donor: "Azalea Cooperative",
    amount: 2500,
    frequency: "Monthly",
    focusArea: "Community Nourishment",
    date: "2024-03-02",
    note: "Supports mobile market activation.",
  },
  {
    id: "seed-2",
    donor: "Harper & Luna",
    amount: 1200,
    frequency: "Quarterly",
    focusArea: "Healing Arts",
    date: "2024-02-16",
  },
  {
    id: "seed-3",
    donor: "Sunrise Credit Union",
    amount: 5000,
    frequency: "One-time",
    focusArea: "Safe Harbor Housing",
    date: "2024-01-28",
    note: "Emergency relocation fund.",
  },
  {
    id: "seed-4",
    donor: "Gardenia Circle Giving",
    amount: 650,
    frequency: "Monthly",
    focusArea: "Community Nourishment",
    date: "2024-03-10",
  },
];

interface DonationTrackerProps {
  onGiftAdded?: (donation: DonationRecord) => void;
}

export function DonationTracker({ onGiftAdded }: DonationTrackerProps) {
  const [donations, setDonations] = useState<DonationRecord[]>(PRESEEDED_DONATIONS);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);
  const [formState, setFormState] = useState({
    donor: "",
    amount: "",
    frequency: "Monthly" as Frequency,
    focusArea: "Community Nourishment" as FocusArea,
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DonationRecord[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDonations(parsed);
        }
      }
    } catch (error) {
      console.warn("Unable to read stored donations", error);
    } finally {
      setIsLoadingStorage(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoadingStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    }
  }, [donations, isLoadingStorage]);

  const metrics = useMemo(() => {
    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);
    const recurring = donations.filter((donation) => donation.frequency !== "One-time").length;
    const thisMonth = donations
      .filter((donation) => {
        const donationDate = new Date(donation.date);
        const now = new Date();
        return (
          donationDate.getUTCFullYear() === now.getUTCFullYear() &&
          donationDate.getUTCMonth() === now.getUTCMonth()
        );
      })
      .reduce((sum, donation) => sum + donation.amount, 0);

    const averageGift = donations.length > 0 ? totalRaised / donations.length : 0;

    const byFocusArea = donations.reduce<Record<FocusArea, number>>(
      (acc, donation) => {
        acc[donation.focusArea] += donation.amount;
        return acc;
      },
      {
        "Community Nourishment": 0,
        "Healing Arts": 0,
        "Safe Harbor Housing": 0,
      },
    );

    return {
      totalRaised,
      recurring,
      thisMonth,
      averageGift,
      byFocusArea,
    };
  }, [donations]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formState.donor.trim() || !formState.amount) {
      return;
    }

    const newDonation: DonationRecord = {
      id: crypto.randomUUID(),
      donor: formState.donor.trim(),
      amount: Number(formState.amount),
      frequency: formState.frequency,
      focusArea: formState.focusArea,
      date: formState.date,
      note: formState.note?.trim() || undefined,
    };

    setDonations((current) => [newDonation, ...current]);
    setFormState((current) => ({
      ...current,
      donor: "",
      amount: "",
      note: "",
    }));

    onGiftAdded?.(newDonation);
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-500 dark:text-emerald-300">
            Gift pipeline
          </p>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Track supporter momentum
          </h3>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
            ${metrics.thisMonth.toLocaleString()} this month
          </span>
          <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-600 dark:bg-orange-500/20 dark:text-orange-200">
            {metrics.recurring} recurring allies
          </span>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10">
          <div className="grid gap-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Donor or fund name
              <input
                type="text"
                value={formState.donor}
                onChange={(event) => setFormState((state) => ({ ...state, donor: event.target.value }))}
                placeholder="Orange Grove Collective"
                className="mt-1 w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:bg-zinc-900/70 dark:text-zinc-50 dark:focus:border-emerald-400/80"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Amount (USD)
              <input
                type="number"
                min={25}
                step={25}
                value={formState.amount}
                onChange={(event) => setFormState((state) => ({ ...state, amount: event.target.value }))}
                placeholder="500"
                className="mt-1 w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:bg-zinc-900/70 dark:text-zinc-50 dark:focus:border-emerald-400/80"
                required
              />
            </label>

            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Gift date
              <input
                type="date"
                value={formState.date}
                onChange={(event) => setFormState((state) => ({ ...state, date: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:bg-zinc-900/70 dark:text-zinc-50 dark:focus:border-emerald-400/80"
                required
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Frequency
              <select
                value={formState.frequency}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, frequency: event.target.value as Frequency }))
                }
                className="mt-1 w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:bg-zinc-900/70 dark:text-zinc-50 dark:focus:border-emerald-400/80"
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>One-time</option>
              </select>
            </label>

            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Focus area
              <select
                value={formState.focusArea}
                onChange={(event) =>
                  setFormState((state) => ({ ...state, focusArea: event.target.value as FocusArea }))
                }
                className="mt-1 w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:bg-zinc-900/70 dark:text-zinc-50 dark:focus:border-emerald-400/80"
              >
                <option>Community Nourishment</option>
                <option>Healing Arts</option>
                <option>Safe Harbor Housing</option>
              </select>
            </label>
          </div>

          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Stewardship notes
            <textarea
              value={formState.note}
              onChange={(event) => setFormState((state) => ({ ...state, note: event.target.value }))}
              placeholder="Preferred volunteer day, storytelling invite, etc."
              className="mt-1 min-h-[90px] w-full rounded-xl border border-transparent bg-white/60 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:bg-zinc-900/70 dark:text-zinc-50 dark:focus:border-emerald-400/80"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
          >
            Record donation
          </button>
        </form>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricTile
              label="Lifetime impact"
              value={`$${metrics.totalRaised.toLocaleString()}`}
              helper="Across all tracked gifts"
            />
            <MetricTile
              label="Average gift"
              value={`$${metrics.averageGift.toFixed(0)}`}
              helper="Mean contribution value"
            />
            <MetricTile
              label="Focus momentum"
              value={`${metrics.byFocusArea["Community Nourishment"] >= metrics.byFocusArea["Healing Arts"] && metrics.byFocusArea["Community Nourishment"] >= metrics.byFocusArea["Safe Harbor Housing"] ? "Community Nourishment" : metrics.byFocusArea["Healing Arts"] >= metrics.byFocusArea["Safe Harbor Housing"] ? "Healing Arts" : "Safe Harbor Housing"}`}
              helper="Top funded program"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
              <thead className="bg-zinc-50/80 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400">
                <tr>
                  <th className="px-4 py-3 text-left">Donor</th>
                  <th className="px-4 py-3 text-left">Focus</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left">Frequency</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
                {donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-orange-50/40 dark:hover:bg-orange-500/10">
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                      {donation.donor}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {donation.focusArea}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-zinc-900 dark:text-zinc-50">
                      ${donation.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {donation.frequency}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {new Date(donation.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                      {donation.note ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {donations.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                Start logging gifts to build your Orange Blossom story.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricTile({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{helper}</p>
    </div>
  );
}

