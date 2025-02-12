import { Loader2 } from "lucide-react";
interface LoaderProps {
  text: String;
}

export default function LoadingState({ text }: LoaderProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
