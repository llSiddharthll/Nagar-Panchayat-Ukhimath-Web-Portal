"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAPI } from "@/utils/api";
import { User, LoginCredentials } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      console.log("🔐 Checking authentication...");
      const response = await authAPI.checkAuth();
      console.log("🔐 Auth check response:", response.data);

      if (response.data.is_authenticated && response.data.user) {
        // set user first, then mark loading false (prevents premature redirect)
        setUser(response.data.user);
        setLoading(false);
        console.log("✅ User is authenticated:", response.data.user);
      } else {
        console.log("❌ User is not authenticated");
        setUser(null);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("❌ Auth check failed:", error);
      localStorage.removeItem("adminToken");
      setUser(null);
      setLoading(false);
    }
  };

  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log("🔐 Attempting login...", credentials);
      const response = await authAPI.login(credentials);
      console.log("🔐 Login response:", response.data);

      const { token, user } = response.data;

      // Store token for future requests
      localStorage.setItem("adminToken", token);
      setUser(user);
      return { success: true };
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      let errorMessage = "Login failed";

      if (error.response) {
        const { data } = error.response;
        console.error("❌ Login error response:", data);
        if (typeof data === "object" && data !== null) {
          errorMessage =
            data.detail ||
            data.message ||
            (data.username && data.username[0]) ||
            (data.password && data.password[0]) ||
            "Invalid credentials";
        } else if (typeof data === "string") {
          errorMessage = data;
        }
      } else if (error.request) {
        errorMessage =
          "Unable to connect to server. Please check your connection.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const register = async (
    userData: any
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;

      localStorage.setItem("adminToken", token);
      setUser(user);

      return { success: true };
    } catch (error: any) {
      let errorMessage = "Registration failed";

      if (error.response) {
        const { data } = error.response;
        if (typeof data === "object" && data !== null) {
          errorMessage =
            data.detail ||
            data.message ||
            (data.username && data.username[0]) ||
            (data.email && data.email[0]) ||
            (data.password && data.password[0]) ||
            "Registration failed";
        }
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("adminToken");
      setUser(null);
      window.location.href = "/admin/login";
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: !!(user?.is_staff || user?.is_superuser),
  };

  console.log("🔄 AuthContext value:", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
