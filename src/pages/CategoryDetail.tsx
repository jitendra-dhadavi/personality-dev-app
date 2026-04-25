// Category detail page — shows tasks, progress, add form, and filters
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ListChecks } from "lucide-react";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import TaskItem from "@/components/TaskItem";
import AddTaskForm from "@/components/AddTaskForm";
import { useAppSelector } from "@/redux/hooks";
import { selectCategoryProgress, selectTasksByCategory } from "@/redux/selectors";
import { cn } from "@/lib/utils";

type Filter = "all" | "pending" | "completed";

const CategoryDetail = () => {
  const { id = "" } = useParams();
  const category = useAppSelector((s) => s.categories.items.find((c) => c.id === id));
  const tasks = useAppSelector(selectTasksByCategory(id));
  const progress = useAppSelector(selectCategoryProgress(id));
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-3">Category not found</h1>
          <Link to="/" className="text-primary hover:underline">Back to dashboard</Link>
        </main>
      </div>
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8 sm:py-12 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-smooth" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <section className={cn("relative overflow-hidden rounded-3xl p-8 mb-8 shadow-elegant animate-fade-in bg-gradient-to-br text-white", category.color)}>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_20%,white,transparent_60%)]" />
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{category.title}</h1>
            <p className="opacity-90 mb-6 max-w-xl">{category.description}</p>

            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="opacity-90">Your progress</span>
                <span className="font-bold text-lg">{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs opacity-80 mt-2">
                {completedCount} of {tasks.length} tasks completed
              </div>
            </div>
          </div>
        </section>

        {/* Add task */}
        <section className="mb-6">
          <AddTaskForm categoryId={id} />
        </section>

        {/* Filters */}
        <section className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 font-semibold text-foreground">
            <ListChecks className="w-5 h-5 text-primary" />
            Tasks
          </h2>
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-secondary border border-border">
            {(["all", "pending", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg capitalize transition-smooth",
                  filter === f
                    ? "bg-card text-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Tasks list */}
        <section className="space-y-2.5">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-border bg-card">
              <p className="text-muted-foreground">
                {filter === "all" ? "No tasks yet — add one above!" : `No ${filter} tasks.`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </section>

        {/* Bottom progress */}
        {tasks.length > 0 && (
          <section className="mt-8 pt-6 border-t border-border">
            <ProgressBar value={progress} showLabel size="md" />
          </section>
        )}
      </main>
    </div>
  );
};

export default CategoryDetail;
