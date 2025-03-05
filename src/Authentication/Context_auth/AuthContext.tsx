import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  email: string | null;
  roles: string[];
  login: (
    token: string,
    username: string,
    email: string,
    roles: string[]
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use localStorage to persist data even after browser restarts
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [roles, setRoles] = useState<string[]>(
    JSON.parse(localStorage.getItem("roles") || "[]")
  );

  const login = (
    token: string,
    username: string,
    email: string,
    roles: string[]
  ) => {
    setToken(token);
    setUsername(username);
    setEmail(email);
    setRoles(roles);

    // Store in localStorage so it persists across browser restarts
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("roles", JSON.stringify(roles));
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setEmail(null);
    setRoles([]);

    // Clear localStorage on logout
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ token, username, email, roles, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
