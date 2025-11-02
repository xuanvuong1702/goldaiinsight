import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthUser, getStoredUser, getAccessToken, clearTokens, isAccessTokenExpired } from "../../lib/auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from stored token
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (getAccessToken() && !isAccessTokenExpired()) {
          const storedUser = getStoredUser();
          setUser(storedUser);
        } else if (getAccessToken()) {
          // Token expired, clear it
          clearTokens();
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Check token expiry periodically and auto-logout
  useEffect(() => {
    if (!user) return;

    const checkTokenExpiry = setInterval(() => {
      if (isAccessTokenExpired()) {
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenExpiry);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    debugger

    try {

      const headers = new Headers();

      headers.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": email,
        "password": password
      });

      const response = await fetch("https://phungxuanvuong97.app.n8n.cloud/webhook/login", {
        method: "POST",
        headers: headers,
        body: raw,
      });

      if (!response.ok) {
        const data = await response.text();
        throw new Error(data.error || "Login failed");
      }

      const data = await response.json();
      
      // Store tokens and update user
      localStorage.setItem("auth_access_token", data.accessToken);
      localStorage.setItem("auth_refresh_token", data.refreshToken);
      localStorage.setItem("auth_token_expiry", (Date.now() + data.expiresIn * 1000).toString());

      const storedUser = getStoredUser();
      setUser(storedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setError(null);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch("https://phungxuanvuong97.app.n8n.cloud/webhook/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("auth_refresh_token"),
        }),
      });

      if (!response.ok) {
        logout();
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      localStorage.setItem("auth_access_token", data.accessToken);
      localStorage.setItem("auth_token_expiry", (Date.now() + data.expiresIn * 1000).toString());

      const storedUser = getStoredUser();
      setUser(storedUser);
    } catch (err) {
      console.error("Token refresh error:", err);
      logout();
      throw err;
    }
  }, [logout]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
