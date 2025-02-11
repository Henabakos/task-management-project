"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { inviteMember } from "@/features/projectSlice";
import type { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InviteMemberFormProps {
  projectId: string;
}

export function InviteMemberForm({ projectId }: InviteMemberFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await dispatch(inviteMember({ projectId, email })).unwrap();
      setSuccess("Invitation sent successfully");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Failed to send invitation");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter member's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Button type="submit">Send Invitation</Button>
        </form>
      </CardContent>
    </Card>
  );
}
