import React, { createContext, useState, useEffect } from "react";

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
const CustomerContext = createContext({});

// Define a functional component to provide the context
const UserProvider = (props) => {
  // Define initial state using useState hook
  const [CustomerData, setCustomerData] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({
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

  // Fetch customers from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomerData(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Function to add a new customer using POST request
  const addCustomer = async (newCustomer: Customer) => {
    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });
      const addedCustomer = await response.json();
      setCustomerData([...CustomerData, addedCustomer]);
      console.log("Cusomer added", addedCustomer);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // Function to update an existing customer using PUT request
  const updateCustomer = async (updatedCustomer: Customer) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/${updatedCustomer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCustomer),
        }
      );
      const updatedData = await response.json();
      console.log("updated customer", updatedData);

      const updatedCustomerData = CustomerData.map((c) =>
        c.id === updatedCustomer.id ? updatedData : c
      );
      setCustomerData(updatedCustomerData);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // Return the provider with the updated value
  return (
    <CustomerContext.Provider
      value={{
        customer,
        setCustomer,
        CustomerData,
        setCustomerData,
        addCustomer,
        updateCustomer,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, UserProvider };
