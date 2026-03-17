/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute2 = ({ children }) => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.error("Please login first");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      toast.error("User not authorized");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute2;