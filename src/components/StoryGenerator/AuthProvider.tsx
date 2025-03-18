import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  storiesGenerated: number;
  storiesLimit: number;
  wordLimit: number;
  savedStoriesLimit: number;
  avatarSeed?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  updateUserPlan: (plan: string) => Promise<void>;
  incrementStoriesGenerated: () => Promise<void>;
  canGenerateStory: () => boolean;
  getRemainingStories: () => number;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  error: null,
  updateUserPlan: async () => {},
  incrementStoriesGenerated: async () => {},
  canGenerateStory: () => true,
  getRemainingStories: () => 0,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // In a real app, this would check with Supabase or another auth provider
        // For demo purposes, we'll check localStorage
        const storedUser = localStorage.getItem("narrativeforge-user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would authenticate with Supabase or another auth provider
      // For demo purposes, we'll simulate a successful login
      if (email && password) {
        // Create a mock user
        const mockUser: User = {
          id: "user-" + Date.now(),
          name: email.split("@")[0],
          email,
          plan: "free",
          storiesGenerated: 0,
          storiesLimit: 5,
          wordLimit: 500,
          savedStoriesLimit: 10,
          avatarSeed: Math.random().toString(36).substring(2, 8),
        };

        // Save to localStorage for persistence
        localStorage.setItem("narrativeforge-user", JSON.stringify(mockUser));
        setUser(mockUser);
      } else {
        throw new Error("Email and password are required");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to log in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would create a new user with Supabase or another auth provider
      // For demo purposes, we'll simulate a successful signup
      if (name && email && password) {
        // Create a new user
        const newUser: User = {
          id: "user-" + Date.now(),
          name,
          email,
          plan: "free",
          storiesGenerated: 0,
          storiesLimit: 5,
          wordLimit: 500,
          savedStoriesLimit: 10,
          avatarSeed: Math.random().toString(36).substring(2, 8),
        };

        // Save to localStorage for persistence
        localStorage.setItem("narrativeforge-user", JSON.stringify(newUser));
        setUser(newUser);
      } else {
        throw new Error("Name, email, and password are required");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign up");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // In a real app, this would sign out from Supabase or another auth provider
    localStorage.removeItem("narrativeforge-user");
    setUser(null);
  };

  const updateUserPlan = async (plan: string) => {
    if (!user) return;

    // Update plan and limits based on the selected plan
    const updatedUser = { ...user, plan };

    // Set limits based on plan
    switch (plan) {
      case "free":
        updatedUser.storiesLimit = 5;
        updatedUser.wordLimit = 500;
        updatedUser.savedStoriesLimit = 10;
        break;
      case "pro":
        updatedUser.storiesLimit = 1000; // Effectively unlimited
        updatedUser.wordLimit = 2000;
        updatedUser.savedStoriesLimit = 1000; // Effectively unlimited
        break;
      case "premium":
        updatedUser.storiesLimit = 10000; // Effectively unlimited
        updatedUser.wordLimit = 5000; // Updated to 5000 words per story
        updatedUser.savedStoriesLimit = 10000; // Effectively unlimited
        break;
    }

    // Save to localStorage
    localStorage.setItem("narrativeforge-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const incrementStoriesGenerated = async () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      storiesGenerated: user.storiesGenerated + 1,
    };

    localStorage.setItem("narrativeforge-user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const canGenerateStory = () => {
    if (!user) return false;

    // For "pro" and "premium" plans, effectively no limit
    if (user.plan !== "free") return true;

    // For free plan, check daily limit
    return user.storiesGenerated < user.storiesLimit;
  };

  const getRemainingStories = () => {
    if (!user) return 0;
    if (user.plan !== "free") return 999; // Effectively unlimited
    return Math.max(0, user.storiesLimit - user.storiesGenerated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        error,
        updateUserPlan,
        incrementStoriesGenerated,
        canGenerateStory,
        getRemainingStories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
