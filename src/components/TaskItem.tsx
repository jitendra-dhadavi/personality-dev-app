// Single task row with completion toggle and delete
import { Check, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { deleteTask, toggleTask, type Task } from "@/redux/slices/tasksSlice";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border bg-card transition-smooth hover:shadow-soft animate-fade-in",
        task.completed ? "border-success/30 bg-success/5" : "border-border hover:border-primary/40"
      )}
    >
      <button
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.completed ? "Mark as pending" : "Mark as complete"}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-bounce",
          task.completed
            ? "bg-success border-success text-success-foreground scale-100"
            : "border-muted-foreground/40 hover:border-primary hover:scale-110"
        )}
      >
        {task.completed && <Check className="w-4 h-4" strokeWidth={3} />}
      </button>

      <span
        className={cn(
          "flex-1 text-sm sm:text-base transition-smooth",
          task.completed ? "text-muted-foreground line-through" : "text-foreground"
        )}
      >
        {task.title}
      </span>

      <button
        onClick={() => dispatch(deleteTask(task.id))}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TaskItem;
