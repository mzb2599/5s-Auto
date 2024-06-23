// OrderContext.tsx
import React, { createContext, useState } from "react";
import { InitialOrders } from "../Data/Orders.tsx";

interface Order {
  orderId: string;
  orderDate: string;
  totalOrderValue: Number;
  discount: Number;
  numberOfItems: Number;
  orderCustomerId: string;
  paymentMethod: string;
  billingAddress: string;
}

const OrderContext = createContext({});
// Define a functional component to provide the context
const OrderProvider = (props) => {
  // Define initial state using useState hook
  const [ordersData, setOrdersData] = useState(InitialOrders);
  const [order, setOrder] = useState<Order>({
    orderId: "",
    orderDate: "",
    totalOrderValue: 0,
    discount: 0,
    numberOfItems: 0,
    orderCustomerId: "",
    paymentMethod: "cash",
    billingAddress: "",
  });

  // Return the provider with the updated value
  return (
    <OrderContext.Provider
      value={{ order, setOrder, ordersData, setOrdersData }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
