import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthenContext } from "./Components/AuthenContext";

interface ProtectedRouteProps {
  allowedRoles: ('6489cb2a-f4df-4020-bf31-56f2a19d30c3' | '42feaeb5-fc53-4163-98b5-d28cfceafa7c' | '5a4226d9-e58a-42c4-a786-dba8369b234b')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const context = useContext(AuthenContext);

  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }

  const { user } = context;

  useEffect(() => {
    if (user) {
      console.log("user exists");
      if (allowedRoles.includes(user.roleId)) {
        switch (user.roleId) {
          case "6489cb2a-f4df-4020-bf31-56f2a19d30c3":
            console.log("Admin")
            navigate("/dashboard", { replace: true });
            break;
          case "42feaeb5-fc53-4163-98b5-d28cfceafa7c":
            console.log("Manager")
            navigate("/dashboard", { replace: true });
            break
          case "5a4226d9-e58a-42c4-a786-dba8369b234b":
            console.log("Staff")
            navigate("/check-in", { replace: true });
            break;
          case "8f02a88d-24d3-43ee-8020-40b9dc94e4cb":
            navigate("/", { replace: true });
        }
      }
    } else {
      console.log("roleId doesn't exist");
      navigate("/")
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return allowedRoles.includes(user.roleId) ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
