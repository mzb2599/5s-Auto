import React, { createContext, useState, useEffect } from "react";

export interface Order {
  orderId: string;
  orderDate: string;
  totalOrderValue: number;
  discount: number;
  numberOfItems: number;
  orderCustomerId: string;
  itemDetails: object;
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
    numberOfItems: 0,
    orderCustomerId: "",
    itemDetails: {},
    paymentMethod: "cash",
    balanceAmount: 0,
    customerAddress: "",
  });

  const [lastAddedOrderId, setLastAddedOrderId] = useState<string>("");

  // Fetching orders data initially
  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrdersData(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Effect to handle the addition of a new order based on changes in ordersData
  // useEffect(() => {
  //   if (ordersData.length > 0) {
  //     const latestOrder = ordersData[ordersData.length - 1]; // Get the latest added order
  //     // Ensure the new order is not the same as the last added order
  //     if (latestOrder.orderId !== lastAddedOrderId) {
  //       addOrder(latestOrder); // Trigger the addOrder function
  //       setLastAddedOrderId(latestOrder.orderId); // Update lastAddedOrderId to the current one
  //     }
  //   }
  // }, [ordersData]); // Trigger when ordersData changes (i.e., when it’s updated)

  // Function to add a new order to the database and update the state
  const addOrder = async (newOrder: Order) => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      const addedOrder = await response.json();
      setOrdersData((prevOrders) => [...prevOrders, addedOrder]); 
      console.log("ORDER CREATED", addedOrder);
      
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // Function to update an existing order
  const updateOrder = async (updatedOrder: Order) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${updatedOrder.orderCustomerId}`,
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
        prevOrders.map((order) =>
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
