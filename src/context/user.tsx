import React, { createContext, useState, ReactNode } from "react";

// Define the User interface with proper types for the fields
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the shape of the context value
interface UserContextType {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  addUser:Object,
  isLogin: boolean,
  setIsLogin: any
}

// Create a context with a default value of `undefined` and later populate it
const UserContext = createContext<UserContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  
  const [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Function to add a new order to the database and update the state
    const addUser = async (newUser: User) => {
      try {
        const response = await fetch(`http://localhost:5000/api/${isLogin?'login':'signup'}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const addedUser = await response.json();
        console.log("USER CREATED/ADDED", addedUser);
      } catch (error) {
        console.error("Error adding order:", error);
      }
    };

  return (
    <UserContext.Provider value={{ userData, setUserData, addUser, isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext,UserProvider };
