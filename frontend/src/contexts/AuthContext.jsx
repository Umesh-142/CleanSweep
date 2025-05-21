import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await api.get("/users/getCurrentUser");
          setUser(response.data.data.user);
        }
      } catch (err) {
        // ✅ Only remove token if NOT a retry case or refresh failed
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.post("/users/login", credentials);
      const { user, accessToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      console.log("Token is set to = ", accessToken);

      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Registration function (with file upload support)
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (key === "avatar" && userData[key]) {
          formData.append("avatar", userData.avatar);
        } else {
          formData.append(key, userData[key]);
        }
      });

      const response = await api.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Auto-login after registration
      const { user, accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await api.post("/users/logout");
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (verificationData) => {
    try {
      setIsLoading(true);
      const response = await api.post("/users/verify", verificationData);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        verifyEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
