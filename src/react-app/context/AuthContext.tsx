import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthUser, getStoredUser, getAccessToken, clearTokens, isAccessTokenExpired,storeTokens, getRefreshToken } from "../../lib/auth";


interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: AuthUser; // in seconds,
  success: boolean;
  message: string;
  expiresAt: Date;
  createdAt: Date;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from stored token on component mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        // Check if token is expired
        if (isAccessTokenExpired()) {
          clearTokens();
          setIsLoading(false);
          return;
        }

        // Token is valid, restore user from it
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
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

    try {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        email: email,
        password: password,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch("https://phungxuanvuong97.app.n8n.cloud/webhook/login", requestOptions as RequestInit);

      const text = await response.text();

      if (!text) throw new Error("Empty response from server");
      let authData: AuthData;
      try {
        authData = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON returned: " + text);
      }

      if(authData.success === false){
        throw new Error(authData.message || "Login failed");
      }
      
      // Store tokens using the utility function
      storeTokens({
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        expiresIn: authData.expiresAt,
      });

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
      const currentRefreshToken = getRefreshToken();

      if (!currentRefreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: currentRefreshToken,
        }),
      });

      if (!response.ok) {
        logout();
        throw new Error("Token refresh failed");
      }

      const data = await response.json();

      // Store the new access token (refresh token stays the same)
      storeTokens({
        accessToken: data.accessToken,
        refreshToken: currentRefreshToken,
        expiresIn: data.expiresIn,
      });

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

