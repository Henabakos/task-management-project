"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "@/features/projectSlice";
import type { RootState, AppDispatch } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateProjectForm } from "@/components/projects/CreateProject-form";
import { Link } from "react-router-dom";

export function ProjectList() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.project
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const projectsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    dispatch(fetchAllProjects());
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="p-6 space-y-6 bg-foreground">
      <Header onCreateClick={() => setIsCreateDialogOpen(true)} />
      <SearchInput search={search} setSearch={setSearch} />
      <ProjectGrid projects={currentProjects} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <CreateProjectForm onSuccess={handleCreateSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin" />
      <span className="sr-only">Loading projects...</span>
    </div>
  );
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="text-center text-red-500 p-6" role="alert">
      {error}
    </div>
  );
}

function Header({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Projects</h1>
      <Button onClick={onCreateClick}>Create Project</Button>
    </div>
  );
}

function SearchInput({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <Input
      type="search"
      placeholder="Search projects..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full"
    />
  );
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: Project) => (
        <Link to={`/projects/${project._id}`} key={project._id}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
};

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="bg-foreground border border-gray-700 text-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
        <Badge variant="secondary">{project.visibility}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="text-sm text-primary font-medium">
          Deadline: {new Date(project.deadline).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-between">
          <AvatarGroup members={project.members} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{project.activityLog.length} activities</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AvatarGroup({ members }: { members: any[] }) {
  return (
    <div className="flex -space-x-2">
      {members.slice(0, 3).map((member, index) => (
        <Avatar key={index} className="border-2 border-background">
          <AvatarImage src="/default-avatar.png" alt={member.user} />
          <AvatarFallback>{member.user[0]}</AvatarFallback>
        </Avatar>
      ))}
      {members.length > 3 && (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground border-2 border-background text-sm font-medium">
          +{members.length - 3}
        </div>
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
