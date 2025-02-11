import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";

const useAuth = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!currentUser) {
      }
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return currentUser;
};

export default useAuth;
