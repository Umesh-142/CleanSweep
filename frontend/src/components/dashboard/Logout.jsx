import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../../pages/HomePage"; // adjust path if needed

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:2200/api/v1/users/logout",
          {
            method: "POST",
            credentials: "include", // include cookies if needed
          }
        );

        if (response.ok) {
          // Redirect to homepage after successful logout
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("An error occurred during logout:", error);
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
