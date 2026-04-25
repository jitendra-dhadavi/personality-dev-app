// Inline form for adding new tasks/goals
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addTask } from "@/redux/slices/tasksSlice";

interface Props {
  categoryId: string;
}

const AddTaskForm = ({ categoryId }: Props) => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addTask(categoryId, trimmed));
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-gradient-card border border-border shadow-soft"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new goal or task..."
        className="flex-1 bg-transparent px-4 py-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-medium text-sm shadow-soft hover:shadow-glow hover:scale-[1.02] active:scale-95 transition-bounce"
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;
