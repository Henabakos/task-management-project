import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/features/projectSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export function CreateProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("PRIVATE");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [members, setMembers] = useState<{ user: string; role: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !currentUser) return;

    try {
      await dispatch(
        createProject({
          name,
          description,
          owner: currentUser.id,
          members,
          visibility,
          deadline: deadline?.toISOString(),
          activityLog: [],
        })
      ).unwrap();
      onSuccess();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={255}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={3}
        />
        <p className="text-sm text-muted-foreground">
          {description.length}/500 characters
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="visibility">Visibility</Label>
        <Select value={visibility} onValueChange={setVisibility}>
          <SelectTrigger>
            <SelectValue placeholder="Select visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PUBLIC">Public</SelectItem>
            <SelectItem value="PRIVATE">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline (Optional)</Label>
        <DatePicker id="deadline" selected={deadline} onSelect={setDeadline} />
      </div>
      <div className="space-y-2">
        <Label>Members</Label>
        <Button
          type="button"
          onClick={() => setMembers([...members, { user: "", role: "VIEWER" }])}
        >
          Add Member
        </Button>
        {members.map((member, index) => (
          <div key={index} className="flex space-x-2">
            <Input
              placeholder="User ID"
              value={member.user}
              onChange={(e) => {
                const newMembers = [...members];
                newMembers[index].user = e.target.value;
                setMembers(newMembers);
              }}
            />
            <Select
              value={member.role}
              onValueChange={(role) => {
                const newMembers = [...members];
                newMembers[index].role = role;
                setMembers(newMembers);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OWNER">Owner</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="VIEWER">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  );
}
