"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksByProject, updateTask } from "@/features/taskSlice";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { KanbanColumn } from "./KanabanColumn";
import LoadingState from "../layout/Loader";

export function KanbanBoard() {
  const { projectId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchTasksByProject(projectId));
    }
  }, [dispatch, projectId]);

  const columns: { id: Task["status"]; title: string; color: string }[] = [
    { id: "TODO", title: "To Do", color: "bg-blue-500" },
    { id: "IN_PROGRESS", title: "In Progress", color: "bg-yellow-500" },
    { id: "DONE", title: "Done", color: "bg-green-500" },
  ];

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    dispatch(updateTask({ id: taskId, updates: { status: newStatus } }));
  };

  if (loading) return <LoadingState text={"Loading Tasks"} />;
  if (error) return <div>Error: {error}</div>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-foreground min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary-foreground hover:bg-primary/90 border-b-2 border-primary rounded-none"
            >
              All Tasks
            </Button>
            {columns.map((column) => {
              const count = tasks.filter(
                (task) => task.status === column.id
              ).length;
              return (
                <Button
                  key={column.id}
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary hover:bg-background rounded-none"
                >
                  {column.title}
                  <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              status={column.id}
              title={column.title}
              projectId={projectId ?? ""}
              color={column.color}
              tasks={tasks.filter((task) => task.status === column.id)}
              onDropTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
