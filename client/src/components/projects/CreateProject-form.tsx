import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { createProject } from "@/features/projectSlice";
import { fetchTeams } from "@/features/teamSlice";
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
import { toast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

export function CreateProjectForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, loading } = useSelector((state: RootState) => state.team);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    visibility: "PRIVATE" | "PUBLIC";
    deadline: Date | undefined;
    team: string;
  }>({
    name: "",
    description: "",
    visibility: "PRIVATE",
    deadline: undefined,
    team: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    dispatch(fetchTeams());
  }, [dispatch]);

  if (!userId) return <div>Loading...</div>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVisibilityChange = (value: string) => {
    setFormData({ ...formData, visibility: value as "PRIVATE" | "PUBLIC" });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, team: e.target.value });
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
          owner: userId,
        })
      ).unwrap();
      toast({ title: "Success", description: "Project created successfully!" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project.",
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
          <RadioGroupItem value="PRIVATE" id="private" />
          <Label htmlFor="private">Private</Label>
          <RadioGroupItem value="PUBLIC" id="public" />
          <Label htmlFor="public">Public</Label>
        </RadioGroup>
      </div>

      <div>
        <Label>Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
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
        <Label htmlFor="team">Select Team</Label>
        <select
          id="team"
          name="team"
          value={formData.team}
          onChange={handleTeamChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Choose a team</option>
          {loading ? (
            <option disabled>Loading teams...</option>
          ) : (
            teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))
          )}
        </select>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}
