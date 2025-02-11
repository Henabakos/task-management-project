import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import type Task from "@/features/taskSlice";

interface KanbanTaskProps {
  task: Task;
}

export function KanbanTask({ task }: KanbanTaskProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move"
    >
      <Card className="bg-card border border-border">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{task.title}</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {task.labels.map((label, index) => (
              <Badge key={index} variant="secondary">
                {label}
              </Badge>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
