import React, { createContext, useState } from "react";
import { data } from "../Data/Users.tsx";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  gstNumber: string;
  area: string;
  TypeofWork: string;
  creditLimit: Number;
  paymentType: string;
}

// Create a context with default value
const UserContext = createContext({});

// Define a functional component to provide the context
const UserProvider = (props) => {
  // Define initial state using useState hook
  const [userData, setUserData] = useState(data);
  const [user, setUser] = useState<Customer>({
    id: "",
    name: " ",
    phone: " ",
    email: " ",
    city: "",
    state: "",
    area: "",
    TypeofWork: " ",
    gstNumber: "",
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
