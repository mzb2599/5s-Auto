import React, { createContext, useState } from "react";
import { initialUsers } from "../Data/Users.tsx";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  vehicle: string;
  yearOfManufacture: Number;
  creditLimit: Number;
  paymentType: string;
}

// Create a context with default value
const UserContext = createContext({});

// Define a functional component to provide the context
const UserProvider = (props) => {
  // Define initial state using useState hook
  const [userData, setUserData] = useState(initialUsers);
  const [user, setUser] = useState<User>({
    id: "",
    name: " ",
    phone: " ",
    email: " ",
    city: "",
    state: "",
    country: "",
    vehicle: " ",
    yearOfManufacture: 2024,
    creditLimit: 0,
    paymentType: "cash",
  });

  // Return the provider with the updated value
  return (
    <UserContext.Provider value={{ user, setUser, userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
