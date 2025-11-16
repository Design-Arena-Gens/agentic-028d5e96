import { CommunityHighlights } from "@/components/CommunityHighlights";
import { DonationTracker } from "@/components/DonationTracker";
import { GoalProgress } from "@/components/GoalProgress";
import { Hero } from "@/components/Hero";
import { ImpactBreakdown } from "@/components/ImpactBreakdown";
import { ImpactCalculator } from "@/components/ImpactCalculator";
import { ImpactSummary } from "@/components/ImpactSummary";

const summaryMetrics = [
  {
    title: "Raised in 2024",
    value: "$482,340",
    sublabel: "Fueling 37 neighborhood activations",
    trend: { value: 18.6, label: "vs last cycle" },
  },
  {
    title: "Active allies",
    value: "428 supporters",
    sublabel: "62% are recurring givers",
    trend: { value: 12.2, label: "new in March" },
  },
  {
    title: "Impact delivered",
    value: "58,320 meals",
    sublabel: "Alongside 1,840 nights of safe housing",
  },
  {
    title: "Story touchpoints",
    value: "96 engagements",
    sublabel: "From volunteer labs to art residencies",
    trend: { value: 9.4, label: "community resonance" },
  },
] as const;

const campaignGoals = [
  {
    id: "sprouting-kitchens",
    name: "Sprouting Kitchens Expansion Fund",
    description: "Activate two additional community kitchens with seed capital, culinary mentors, and mobile pantry routes.",
    goal: 180_000,
    raised: 146_800,
    supporters: 213,
    focus: "Community Nourishment",
    deadlineLabel: "Q2 field launch",
    highlights: ["24 apprentices placed", "84% culturally rooted menus", "New partnership: Bloom High"],
  },
  {
    id: "healing-neighborhoods",
    name: "Neighborhood Healing Studios",
    description: "Bring pop-up healing arts studios to neighborhoods experiencing displacement and climate stress.",
    goal: 120_000,
    raised: 82_450,
    supporters: 147,
    focus: "Healing Arts",
    deadlineLabel: "Summer 2024 residency series",
    highlights: ["Therapist cohort funded", "24% BIPOC-led residencies", "Story archive in progress"],
  },
  {
    id: "harbor-homes",
    name: "Harbor Homes Stabilization Grants",
    description: "Provide rapid rehousing stipends and on-site advocates for survivor-led families seeking safe housing.",
    goal: 210_000,
    raised: 164_930,
    supporters: 189,
    focus: "Safe Harbor Housing",
    deadlineLabel: "Emergency response ready",
    highlights: ["16 safety audits scheduled", "Partnership: Sun County Legal", "Housing mentors recruited"],
  },
] as const;

const allocationSlices = [
  {
    id: "nourishment",
    label: "Community Nourishment",
    value: 212_400,
    descriptor: "Mobile markets, garden stipends, and youth culinary labs.",
    accent: "#f97316",
  },
  {
    id: "healing",
    label: "Healing Arts",
    value: 138_900,
    descriptor: "Therapy scholarships, creative residencies, and wellbeing kits.",
    accent: "#ea580c",
  },
  {
    id: "housing",
    label: "Safe Harbor Housing",
    value: 131_040,
    descriptor: "Rapid rehousing grants and survivor navigation.",
    accent: "#10b981",
  },
] as const;

const fieldHighlights = [
  {
    title: "Citrus Grove resilience hub opens its doors",
    summary: "Donor dollars transformed an unused auditorium into an overnight warming and resource hub co-designed with survivor advocates.",
    location: "Eastbrook • Safe Harbor Housing",
    timeframe: "Launched March 5",
    categories: ["Housing justice", "Survivor-led"],
  },
  {
    title: "Healing studio residency graduates first cohort",
    summary: "Twelve artists-in-healing paired trauma-informed therapy with storytelling circles, reaching 380 community members in five weeks.",
    location: "Riverside Commons • Healing Arts",
    timeframe: "Cohort 01 complete",
    categories: ["Therapeutics", "Storytelling"],
  },
  {
    title: "Mobile produce markets hit climate frontline blocks",
    summary: "Fresh Citrus Vans now reach four additional neighborhoods weekly, co-led by youth kitchen fellows and neighborhood elders.",
    location: "Sunset District • Nourishment",
    timeframe: "Route expanded",
    categories: ["Food sovereignty", "Youth leadership"],
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-orange-50/40 to-emerald-50/40 pb-16 pt-10 font-sans dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <Hero />

        <ImpactSummary metrics={summaryMetrics} />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
          <GoalProgress campaigns={campaignGoals} />
          <ImpactBreakdown slices={allocationSlices} />
        </div>

        <ImpactCalculator />

        <DonationTracker />

        <CommunityHighlights highlights={fieldHighlights} />
      </main>
    </div>
  );
}
