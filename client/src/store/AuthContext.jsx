import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Decode JWT token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  const isTokenExpired = (token) => {
    const payload = decodeToken(token);
    if (!payload?.exp) return true;
    return payload.exp < Date.now() / 1000;
  };

  const validateToken = () => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      logout();
      setIsLoading(false); // Done loading
      return;
    }

    const payload = decodeToken(token);
    setUserRole(payload?.role || null);
    setUserID(payload?.id || null);
    setUserName(payload?.name || null);
    setIsLoggedIn(true);
    setIsLoading(false); // Done loading
  };

  const login = (token) => {
    if (!token || isTokenExpired(token)) {
      console.error("Invalid or expired token");
      setIsLoading(false);
      return false;
    }

    localStorage.setItem("token", token);
    validateToken(); // Set state based on valid token
    return true;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    setUserID(null);
    setUserName(null);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true); // Start loading
    validateToken();
    const handleStorageChange = () => {
      setIsLoading(true); // Start loading on storage change
      validateToken();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true); // Start loading for periodic check
      validateToken();
    }, 5 * 60 * 1000); // every 5 min
    return () => clearInterval(interval);
  }, []);

  const getToken = () => localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        login,
        logout,
        getToken,
        userID,
        userName,
        isLoading, // Expose isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Optional: Helper hook for protected components
export const useProtectedRoute = (allowedRoles = []) => {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) return false;
  if (allowedRoles.length === 0) return true;

  return allowedRoles.includes(userRole);
};