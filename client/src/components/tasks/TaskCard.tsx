import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RiMoreLine } from "react-icons/ri";

interface Task {
  id: string;
  title: string;
  description?: string;
  tags: { text: string; color: string }[];
  progress?: number;
  dueDate: string;
  assignees: { image: string; fallback: string }[];
  attachments?: number;
}

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <Button variant="ghost" size="sm">
          <RiMoreLine />
        </Button>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex items-center mt-2">
        {task.tags.map((tag, index) => (
          <Badge key={index} color={tag.color}>
            {tag.text}
          </Badge>
        ))}
      </div>
      <div className="flex items-center mt-2">
        {task.assignees.map((assignee, index) => (
          <Avatar key={index} className="mr-2">
            <AvatarImage src={assignee.image} />
            <AvatarFallback>{assignee.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
        <span className="text-sm text-gray-600">
          {task.attachments} attachments
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
