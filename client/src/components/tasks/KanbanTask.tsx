"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  MessageSquare,
  CheckSquare,
  Paperclip,
} from "lucide-react";
import {
  updateTask,
  addComment,
  addSubtask,
  updateSubtaskStatus,
  type Task,
} from "@/features/taskSlice";
import { AppDispatch } from "@/store/store";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}
interface KanbanTaskProps {
  task: Task;
}

export function KanbanTask({ task }: KanbanTaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userid, setUserId] = useState<string | null>(null);
  const [description, setDescription] = useState(task.description);
  const [newSubtask, setNewSubtask] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleUpdateTask = async (updates: Partial<Task>) => {
    try {
      await dispatch(updateTask({ id: task._id, updates }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await dispatch(
        addComment({
          id: task._id,
          userId: userid!,
          comment: newComment,
        })
      );
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;
    try {
      await dispatch(addSubtask({ id: task._id, title: newSubtask }));
      setNewSubtask("");
    } catch (error) {
      console.error("Failed to add subtask:", error);
    }
  };

  const handleSubtaskStatusChange = async (
    subtaskId: string,
    status: "TODO" | "DONE"
  ) => {
    try {
      await dispatch(updateSubtaskStatus({ id: task._id, subtaskId, status }));
    } catch (error) {
      console.error("Failed to update subtask status:", error);
    }
  };

  return (
    <>
      <div
        ref={drag}
        onClick={() => setIsOpen(true)}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="cursor-move"
      >
        <Card className="bg-foreground border border-gray-700 text-gray-200">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">{task.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 -mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {task.labels?.map((label, index) => (
                <Badge key={index} variant="secondary">
                  {label}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div>
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No date"}
              </div>
              <div className="flex items-center gap-2">
                {(task.subtasks?.length ?? 0) > 0 && (
                  <span className="flex items-center gap-1">
                    <CheckSquare className="h-4 w-4" />
                    {
                      (task.subtasks ?? []).filter((st) => st.status === "DONE")
                        .length
                    }
                    /{task.subtasks?.length ?? 0}
                  </span>
                )}
                {task.attachments?.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Paperclip className="h-4 w-4" />
                    {task.attachments.length}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <div className="grid gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{task.title}</h2>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>Status: {task.status}</span>
                <span>•</span>
                <span>
                  Created {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTask({ description });
              }}
            >
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger value="subtasks">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Subtasks
                  </TabsTrigger>
                  <TabsTrigger value="comments">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="attachments">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attachments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-4">
                  <Textarea
                    id="description"
                    placeholder="Add a more detailed description..."
                    className="min-h-[200px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </TabsContent>

                <TabsContent value="subtasks" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a subtask..."
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                    />
                    <Button onClick={handleAddSubtask}>Add</Button>
                  </div>
                  <div className="space-y-2">
                    {task.subtasks?.map((subtask) => (
                      <div
                        key={subtask._id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={subtask.status === "DONE"}
                          onCheckedChange={(checked) => {
                            handleSubtaskStatusChange(
                              subtask._id!,
                              checked ? "DONE" : "TODO"
                            );
                          }}
                        />
                        <span
                          className={
                            subtask.status === "DONE" ? "line-through" : ""
                          }
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <Button onClick={handleAddComment}>Comment</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {task.comments?.map((comment, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm">{comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4">
                  <div className="grid gap-2">
                    {task.attachments?.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded"
                      >
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span>{attachment.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              <Button type="submit">Update Task</Button>
            </form>
            <div className="space-y-4">
              <h3 className="font-medium">Due Date</h3>
              <Calendar
                mode="single"
                selected={task.dueDate ? new Date(task.dueDate) : undefined}
                onSelect={(date) =>
                  handleUpdateTask({ dueDate: date?.toISOString() })
                }
                className="rounded-md border"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
