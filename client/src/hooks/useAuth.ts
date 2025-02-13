import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUserProfile } from "@/features/authSlice";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!currentUser) {
        dispatch(fetchUserProfile());
      }
    } else {
      navigate("/login");
    }
  }, [currentUser, navigate, dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return currentUser;
};

export default useAuth;
