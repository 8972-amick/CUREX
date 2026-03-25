import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    const parsed = JSON.parse(storedUser);
    return {
      ...parsed,
      role: parsed.role?.toUpperCase(),
    };
  });

  const login = (userData) => {
    const updatedUser = {
      ...userData,
      role: userData.role?.toUpperCase() || "PATIENT",
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem("role", updatedUser.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 