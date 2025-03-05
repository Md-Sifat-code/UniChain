import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  user: any;
  fetchUserDetails: (username: string, token: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  // Fetch user details on page load
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log("Stored username:", storedUsername);
    const storedToken = localStorage.getItem("token");

    if (storedUsername && storedToken) {
      fetchUserDetails(storedUsername, storedToken);
    }
  }, []); // Runs once when the component mounts

  const fetchUserDetails = async (username: string, token: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_api_url}/User/search/${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch user details");

      const data = await response.json();
      console.log("User details:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
