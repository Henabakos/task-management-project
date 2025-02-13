import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  RiDashboardLine,
  RiFolderLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiAddLine,
  RiNotification2Line,
} from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="h-screen w-64  flex flex-col border-r border-gray-700 fixed top-0 left-0 text-white ">
      <div className="overflow-y-scroll">
        <div className="p-4 border-b border-gray-700 ">
          <div className="flex items-center gap-2 h-10">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">W</span>
            </div>
            <span className="text-lg font-semibold text-zinc-100">Taskify</span>
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs font-semibold text-zinc-500 mb-4">
            MAIN MENU
          </div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              asChild
            >
              <Link to="/">
                <RiDashboardLine className="h-5 w-5" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              asChild
            >
              <Link to="/projects">
                <RiFolderLine className="h-5 w-5" />
                Projects
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              asChild
            >
              <Link to="/chat">
                <RiNotification2Line className="h-5 w-5" />
                Notification
              </Link>
            </Button>
          </nav>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500 ">TEAM</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-violet-300 hover:text-violet-600 hover:bg-foreground"
            >
              <RiAddLine className="h-4 w-4 " />
            </Button>
          </div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white bg-foreground hover:bg-zinc-800/50"
              asChild
            >
              <Link to="/teams" className="">
                Teams
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              asChild
            >
              <Link to="/personal-tasks">Personal Task</Link>
            </Button>
          </nav>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-zinc-500">
              PROJECTS
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5  text-violet-300 hover:text-violet-600 hover:bg-foreground"
            >
              <RiAddLine className="h-4 w-4" />
            </Button>
          </div>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 truncate"
              asChild
            >
              <Link to="/erp-website">ERP Website</Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 truncate"
              asChild
            >
              <Link to="/mobile-app">Mobile App</Link>
            </Button>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-700 ">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 mb-1"
            asChild
          >
            <Link to="/settings">
              <RiSettings3Line className="h-5 w-5" />
              Settings
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
            asChild
          >
            <Link to="/logout">
              <RiLogoutBoxLine className="h-5 w-5" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
