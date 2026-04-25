// Card showing a personality development category and its progress
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Crown, Clock, Sparkles, Heart, Zap, type LucideIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCategoryProgress, selectTasksByCategory } from "@/redux/selectors";
import ProgressBar from "./ProgressBar";
import type { Category } from "@/redux/slices/categoriesSlice";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Crown,
  Clock,
  Sparkles,
  Heart,
  Zap,
};

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const progress = useAppSelector(selectCategoryProgress(category.id));
  const tasks = useAppSelector(selectTasksByCategory(category.id));
  const Icon = iconMap[category.icon] ?? Sparkles;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative bg-gradient-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1 overflow-hidden block"
    >
      {/* Decorative gradient blob */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${category.color} opacity-20 blur-2xl group-hover:opacity-40 transition-smooth`}
      />

      <div className="relative">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-soft mb-4 group-hover:scale-110 transition-bounce`}>
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{category.title}</h3>
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{category.description}</p>

        <ProgressBar value={progress} showLabel />

        <div className="flex items-center justify-between mt-5">
          <span className="text-xs text-muted-foreground">
            {tasks.filter((t) => t.completed).length} / {tasks.length} tasks
          </span>
          <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-smooth">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
