// Dashboard page — overall progress + grid of categories
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import CategoryCard from "@/components/CategoryCard";
import ProgressBar from "@/components/ProgressBar";
import { useAppSelector } from "@/redux/hooks";
import { selectOverallProgress } from "@/redux/selectors";
import { TrendingUp, Target, CheckCircle2 } from "lucide-react";

const Index = () => {
  const categories = useAppSelector((s) => s.categories.items);
  const tasks = useAppSelector((s) => s.tasks.items);
  const overall = useAppSelector(selectOverallProgress);

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Dashboard | Personality Development App"
        description="Track your personality development progress across key growth areas."
      />
      <Navbar />

      <main className="container py-10 sm:py-14">
        {/* Hero header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 sm:p-12 mb-10 shadow-elegant animate-fade-in">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
          <div className="relative max-w-2xl text-primary-foreground">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">
              Become the best version of you.
            </h1>
            <p className="text-base sm:text-lg opacity-90 mb-6">
              Track your personal growth across communication, leadership, mindset, and more.
            </p>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
              <Stat icon={<Target className="w-4 h-4" />} label="Categories" value={categories.length} />
              <Stat icon={<CheckCircle2 className="w-4 h-4" />} label="Completed" value={completed} />
              <Stat icon={<TrendingUp className="w-4 h-4" />} label="Progress" value={`${overall}%`} />
            </div>
          </div>
        </section>

        {/* Overall progress */}
        <section className="bg-gradient-card border border-border rounded-2xl p-6 mb-10 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Overall Growth</h2>
            <span className="text-2xl font-bold text-gradient">{overall}%</span>
          </div>
          <ProgressBar value={overall} size="lg" />
          <p className="text-sm text-muted-foreground mt-3">
            {completed} of {tasks.length} tasks completed across all categories.
          </p>
        </section>

        {/* Categories grid */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Your Growth Areas</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick a category to start improving today.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
    <div className="flex items-center gap-1.5 opacity-80 text-xs">
      {icon}
      <span>{label}</span>
    </div>
    <div className="text-xl sm:text-2xl font-bold mt-1">{value}</div>
  </div>
);

export default Index;
