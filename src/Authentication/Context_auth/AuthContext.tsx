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
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  );
  const [username, setUsername] = useState<string | null>(
    sessionStorage.getItem("username")
  );
  const [email, setEmail] = useState<string | null>(
    sessionStorage.getItem("email")
  );
  const [roles, setRoles] = useState<string[]>(
    JSON.parse(sessionStorage.getItem("roles") || "[]")
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

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("roles", JSON.stringify(roles));
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setEmail(null);
    setRoles([]);

    sessionStorage.clear();
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
