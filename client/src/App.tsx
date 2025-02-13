import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidbar from "./components/layout/Sidbar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Project";
import Notification from "./pages/Notification";
import Navbar from "./components/layout/Navbar";
import { ProjectDetail } from "./components/projects/Project-Detail";
import LoginPage from "./components/users/Login";
import { KanbanBoard } from "./components/tasks/KanbanBoard";
import TeamManagement from "./pages/Team-Management";
import useAuth from "./hooks/useAuth";

const AppContent = () => {
  const location = useLocation();
  const currentUser = useAuth();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex">
      {!isLoginPage && <Sidbar />}
      <div className={`w-full ${!isLoginPage ? "pl-64" : ""}`}>
        {!isLoginPage && <Navbar />}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/teams" element={<TeamManagement />} />
            <Route path="/tasks/:projectId" element={<KanbanBoard />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
