export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: Date;
  }
  
  export interface AuthUser {
    userId: string;
    email: string;
    name?: string;
    iat: number;
    exp: number;
  }
  
  export interface DecodedToken {
    userId: string;
    email: string;
    name?: string;
    iat: number;
    exp: number;
    type: "access" | "refresh";
  }
  
  // Token storage keys
  const ACCESS_TOKEN_KEY = "auth_access_token";
  const REFRESH_TOKEN_KEY = "auth_refresh_token";
  const TOKEN_EXPIRY_KEY = "auth_token_expiry";
  
  // Token expiration times (in seconds)
  export const TOKEN_EXPIRY = {
    ACCESS: 15 * 60, // 15 minutes
    REFRESH: 7 * 24 * 60 * 60, // 7 days
  };
  
  /**
   * Store tokens in localStorage
   */
  export const storeTokens = (tokens: AuthTokens) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, tokens.expiresIn.toString());
  };
  
  /**
   * Retrieve access token from localStorage
   */
  export const getAccessToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  };
  
  /**
   * Retrieve refresh token from localStorage
   */
  export const getRefreshToken = (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  };
  
  /**
   * Check if access token is expired
   */
  export const isAccessTokenExpired = (): boolean => {
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return true;
    return Date.now() > new Date(expiry).getTime();
  };
  
  /**
   * Clear all tokens from localStorage
   */
  export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  };
  
  /**
   * Decode JWT token (client-side parsing only, no verification)
   */
  export const decodeToken = (token: string): DecodedToken | null => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
  
      const decoded = JSON.parse(atob(parts[1]));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  /**
   * Extract user info from stored access token
   */
  export const getStoredUser = (): AuthUser | null => {

    const token = getAccessToken();
    if (!token) return null;
  
    const decoded = decodeToken(token);

    if (!decoded || decoded.type !== "access") return null;

  
    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      exp: decoded.exp,
      iat: decoded.iat  
    };
  };
  
  /**
   * Check if user is authenticated
   */
  export const isAuthenticated = (): boolean => {
    const token = getAccessToken();
    if (!token) return false;
    return !isAccessTokenExpired();
  };
  