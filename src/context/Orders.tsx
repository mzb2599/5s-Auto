import React, { createContext, useState, useEffect } from "react";

export interface Order {
  orderId: string;
  orderDate: string;
  totalOrderValue: number;
  discount: number;
  orderCustomerId: string;
  itemDetails: Array<{}>;
  paymentMethod: string;
  balanceAmount: number;
  customerAddress: string;
}

const OrderContext = createContext({});

const OrderProvider = (props) => {
  const [ordersData, setOrdersData] = useState<Order[]>();
  const [order, setOrder] = useState<Order>({
    orderId: "",
    orderDate: "",
    totalOrderValue: 0,
    discount: 0,
    orderCustomerId: "",
    itemDetails: [{}],
    paymentMethod: "cash",
    balanceAmount: 0,
    customerAddress: "",
  });

  //const [lastAddedOrderId, setLastAddedOrderId] = useState<string>("");

  // Fetching orders data initially
  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + "/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrdersData(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Function to add a new order to the database and update the state
  const addOrder = async (newOrder: Order) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrder),
        }
      );
      const addedOrder = await response.json();
      setOrdersData((prevOrders) =>
        prevOrders ? [...prevOrders, addedOrder] : [addedOrder]
      );
      console.log("ORDER CREATED", addedOrder);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // Function to update an existing order
  const updateOrder = async (updatedOrder: Order) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL +
          `/api/orders/${updatedOrder.orderCustomerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        }
      );
      const updatedData = await response.json();
      setOrdersData((prevOrders) =>
        prevOrders?.map((order) =>
          order.orderId === updatedOrder.orderId ? updatedData : order
        )
      );
      console.log(updatedData);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        ordersData,
        setOrdersData,
        addOrder,
        updateOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
