import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for the user object
interface User {
  id: number;
  name: string;
  role: string;
}

// Define the context's shape
interface UserContextType {
  id: number; // id is required here
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context with the default value
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      id: user ? user.id : -1, 
      user, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
