import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "@/features/projectSlice";
import { fetchTasksByProject } from "@/features/taskSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProject, loading, error } = useSelector(
    (state: RootState) => state.project
  );
  const { tasks, loading: taskLoading } = useSelector(
    (state: RootState) => state.task
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchTasksByProject(id));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedProject) return <div>Project not found</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/projects" className="hover:text-primary">
          Projects
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>{selectedProject.name}</span>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{selectedProject.name}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {selectedProject.description}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to={`/tasks/${id}`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Kanban Board
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>Share Project</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Archive Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Display Tasks */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>
        {taskLoading ? (
          <div>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div>No tasks found for this project.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <Card key={task._id} className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {task.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="mt-4 text-sm">
                    <span className="font-bold">Status:</span> {task.status}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">Priority:</span> {task.priority}
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">Due Date:</span>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
