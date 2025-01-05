import React, { useContext, useEffect, useState } from "react";
import "./SummaryCard.css"; // Assuming you're styling with a CSS file
import { OrderContext } from "../../context/Orders.tsx";
import { CustomerContext } from "../../context/Customer.tsx";
import { getCurrentMonthCustomers } from "../helpers/Customers.tsx";

const HarmonySummaryCard = () => {
  const { ordersData } = useContext(OrderContext);
  const { CustomerData } = useContext(CustomerContext);

  const [orderCount, setOrderCount] = useState(0);
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  var uniqueOrderIds = new Set();
  useEffect(() => {
    let revenue = 0;
    let discount = 0;
    ordersData?.forEach((order) => {
      if (
        new Date(order.orderDate).getMonth() === new Date().getMonth() &&
        new Date(order.orderDate).getFullYear() === new Date().getFullYear()
      ) {
        uniqueOrderIds.add(order.orderId);
        revenue += parseInt(order.totalOrderValue) - parseInt(order.discount);
        discount += parseInt(order.discount);
      }
    });
    setOrderCount(uniqueOrderIds?.size);
    setTotalOrderValue(revenue);
    setDiscountValue(discount);
  }, [ordersData]);

  useEffect(() => {
    setCustomerCount(getCurrentMonthCustomers(ordersData));
  }, [CustomerData, ordersData]);

  const cardsData = [
    { heading: "Customers", metric: customerCount },
    { heading: "Revenue", metric: totalOrderValue },
    { heading: "Discount", metric: discountValue },
    { heading: "Orders", metric: orderCount },
  ];

  return (
    <div className="summary-card-container">
      {cardsData?.map((card, index) => (
        <div key={index} className="card">
          <h1>{card.heading}</h1>
          <h3>{card.metric}</h3>
        </div>
      ))}
    </div>
  );
};

export default HarmonySummaryCard;
