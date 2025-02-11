import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  RiCheckLine,
  RiTimeLine,
  RiGroupLine,
  RiCalendarEventLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { format } from "date-fns";

const projectData = [
  { name: "Project A", completed: 20, inProgress: 10, pending: 5 },
  { name: "Project B", completed: 15, inProgress: 8, pending: 3 },
  { name: "Project C", completed: 25, inProgress: 12, pending: 8 },
  { name: "Project D", completed: 18, inProgress: 15, pending: 2 },
];

const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    assignee: "Alice",
    avatar: "/avatars/alice.png",
    progress: 75,
    dueDate: "2023-06-15",
  },
  {
    id: 2,
    title: "Implement user authentication",
    assignee: "Bob",
    avatar: "/avatars/bob.png",
    progress: 30,
    dueDate: "2023-06-18",
  },
  {
    id: 3,
    title: "Create API documentation",
    assignee: "Charlie",
    avatar: "/avatars/charlie.png",
    progress: 90,
    dueDate: "2023-06-20",
  },
  {
    id: 4,
    title: "Optimize database queries",
    assignee: "David",
    avatar: "/avatars/david.png",
    progress: 50,
    dueDate: "2023-06-22",
  },
];

const DashboardLayout = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-8  p-6 min-h-screen text-zinc-100">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-violet-500">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <RiCalendarEventLine className="h-6 w-6 text-violet-500" />
          <span className="text-lg">{format(new Date(), "MMMM d, yyyy")}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between">
        <Card className="bg-[#030712] border border-gray-800 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-violet-500">
              Total Projects
            </CardTitle>
            <RiCheckLine className="h-6 w-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-200">12</div>
            <p className="text-sm text-zinc-400">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#030712] border border-gray-800 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-violet-500">
              Ongoing Tasks
            </CardTitle>
            <RiTimeLine className="h-6 w-6 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-200">45</div>
            <p className="text-sm text-zinc-400">+5 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-[#030712] border border-gray-800 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold text-violet-500">
              Team Members
            </CardTitle>
            <RiGroupLine className="h-6 w-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-200">8</div>
            <p className="text-sm text-zinc-400">+1 new member</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#030712] border border-gray-800 rounded-xll md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-violet-500">
              Project Overview
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Task distribution across projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                />
                <Bar dataKey="completed" stackId="a" fill="#4F46E5" />
                <Bar dataKey="inProgress" stackId="a" fill="#10B981" />
                <Bar dataKey="pending" stackId="a" fill="#FBBF24" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[#030712] border border-gray-800 rounded-xl row-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-violet-500">
              Calendar
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Upcoming events and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-start w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border text-gray-500 border-gray-800 "
            />
          </CardContent>
        </Card>

        <Card className="bg-[#030712] border border-gray-800 rounded-xl md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-violet-500">
                Recent Tasks
              </CardTitle>
              <CardDescription className="text-sm text-zinc-400">
                Your team's latest assignments
              </CardDescription>
            </div>
            <button className="text-violet-500 hover:text-violet-400 transition-colors">
              View All <RiArrowRightLine className="inline-block ml-1" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={task.avatar} />
                    <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-500">
                      {task.title}
                    </p>
                    <p className="text-sm text-violet-400">
                      Assigned to {task.assignee}
                    </p>
                  </div>
                  <div className="w-1/3">
                    <Progress value={task.progress} className="h-2" />
                  </div>
                  <div className="text-sm text-zinc-400">{task.dueDate}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;
