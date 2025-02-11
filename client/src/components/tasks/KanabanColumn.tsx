import { useDrop } from "react-dnd";
import { KanbanTask } from "./KanbanTask";
import type { Task } from "@/features/taskSlice";

interface KanbanColumnProps {
  status: Task["status"];
  title: string;
  color: string;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: Task["status"]) => void;
}

export function KanbanColumn({
  status,
  title,
  color,
  tasks,
  onDropTask,
}: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string }) => {
      onDropTask(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`space-y-4 ${
        isOver ? "bg-muted/50" : ""
      } p-4 rounded-lg transition-colors`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <KanbanTask key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
