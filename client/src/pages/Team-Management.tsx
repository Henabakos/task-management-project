"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import {
  createTeam,
  fetchTeams,
  updateTeam,
  deleteTeam,
  addUserToTeam,
} from "@/features/teamSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";

export default function TeamManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, loading, error } = useSelector(
    (state: RootState) => state.team
  );
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [editingTeam, setEditingTeam] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = () => {
    dispatch(createTeam({ name: teamName, description: teamDescription }));
    setTeamName("");
    setTeamDescription("");
  };

  const handleUpdateTeam = (id: string) => {
    dispatch(
      updateTeam({
        id,
        teamData: { name: teamName, description: teamDescription },
      })
    );
    setEditingTeam(null);
    setTeamName("");
    setTeamDescription("");
  };

  const handleDeleteTeam = (id: string) => {
    dispatch(deleteTeam(id));
  };

  const handleAddMember = (teamId: string) => {
    const userId = "";
    dispatch(addUserToTeam({ teamId, userId }));
    setNewMemberEmail("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8 bg-gray-900/70 text-white">
        <CardHeader>
          <CardTitle>{editingTeam ? "Edit Team" : "Create New Team"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Input
              placeholder="Team Description"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
            />
            <Button
              onClick={
                editingTeam
                  ? () => handleUpdateTeam(editingTeam)
                  : handleCreateTeam
              }
            >
              {editingTeam ? "Update Team" : "Create Team"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {teams.map((team) => (
        <Card key={team._id} className="mb-8 bg-gray-900/70 text-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{team.name}</span>
              <div>
                <Button
                  variant="outline"
                  className="mr-2 text-black"
                  onClick={() => {
                    setEditingTeam(team._id);
                    setTeamName(team.name);
                    setTeamDescription(team.description || "");
                  }}
                >
                  <Edit className="h-4 w-4 mr-2 " />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteTeam(team._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{team.description}</p>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="New Member Email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <Button onClick={() => handleAddMember(team._id)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
            <Table className="bg-gray-900/70  ">
              <TableHeader className="hover:bg-gray-900/70">
                <TableRow className="hover:bg-gray-900/70 border-b border-gray-700">
                  <TableHead>Member ID</TableHead>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="hover:bg-gray-900/70">
                {team.members?.length ? (
                  team.members.map((memberId) => (
                    <TableRow key={memberId}>
                      <TableCell>{memberId}</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-gray-900/70">
                    <TableCell colSpan={3} className="text-center">
                      No members yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
