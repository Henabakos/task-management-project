import type React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { createProject } from "@/features/projectSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { fetchUserProfile } from "@/features/authSlice";

export function CreateProjectForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentUser) {
    return <div>No user data</div>;
  }

  const userid = currentUser.id;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "PRIVATE",
    deadline: undefined as Date | undefined,
    members: [] as { user: string; role: string }[],
  });
  if (!currentUser) {
    console.log(currentUser);
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVisibilityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, visibility: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, deadline: date }));
  };

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { user: "", role: "VIEWER" }],
    }));
  };

  const handleMemberChange = (
    index: number,
    field: "user" | "role",
    value: string
  ) => {
    setFormData((prev) => {
      const newMembers = [...prev.members];
      newMembers[index][field] = value;
      return { ...prev, members: newMembers };
    });
  };

  const handleRemoveMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        createProject({
          ...formData,
          deadline: formData.deadline
            ? formData.deadline.toISOString()
            : undefined,
          owner: userid,
        })
      ).unwrap();
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
        />
      </div>

      <div>
        <Label>Visibility</Label>
        <RadioGroup
          value={formData.visibility}
          onValueChange={handleVisibilityChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PRIVATE" id="private" />
            <Label htmlFor="private">Private</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PUBLIC" id="public" />
            <Label htmlFor="public">Public</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.deadline ? (
                format(formData.deadline, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.deadline}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Members</Label>
        {formData.members.map((member, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Input
              placeholder="User ID"
              value={member.user}
              onChange={(e) =>
                handleMemberChange(index, "user", e.target.value)
              }
            />
            <select
              value={member.role}
              onChange={(e) =>
                handleMemberChange(index, "role", e.target.value)
              }
              className="border rounded p-2"
            >
              <option value="VIEWER">Viewer</option>
              <option value="EDITOR">Editor</option>
              <option value="OWNER">Owner</option>
            </select>
            <Button
              type="button"
              onClick={() => handleRemoveMember(index)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddMember}
          variant="outline"
          className="mt-2"
        >
          Add Member
        </Button>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
