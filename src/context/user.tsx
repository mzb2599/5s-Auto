import React, { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserContextType {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  addUser: (newUser: User) => Promise<any>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  changePasswordMail: (
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  updatePassword: any
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changePasswordMail = async (email: string) => {
    try {
      if (!email) {
        return { success: false, message: "Email is required" };
      }

      const response = await fetch(
        "http://localhost:5000/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
          credentials: "include", // Include credentials if you're using cookies
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to send reset password email"
        );
      }

      return {
        success: true,
        message: result.message || "Password reset email sent successfully",
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return {
        success: false,
        message: error.message || "Failed to send reset password email",
      };
    }
  };

  const addUser = async (newUser: User) => {
    try {
      if (!newUser.email || !newUser.password) {
        throw new Error("Email and password are required");
      }

      const response = await fetch(
        `http://localhost:5000/api/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
          credentials: "include", // Include credentials if you're using cookies
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Authentication failed");
      }

      return { success: true, message: result.message };
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  const updatePassword = async (email:string, newPassword: string) => {
    try {
      if (!newPassword) {
        throw new Error("New password is required");
      }
  
      const response = await fetch("http://localhost:5000/api/update-password", {
        method: "PATCH", // Or "PUT" depending on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: newPassword }),
        credentials: "include", // Include credentials if using cookies
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to update password");
      }
  
      return { success: true, message: result.message };
    } catch (error) {
      console.error("Password update error:", error);
      throw error;
    }
  };
  
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        addUser,
        isLogin,
        setIsLogin,
        changePasswordMail,
        updatePassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
