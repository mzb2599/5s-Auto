import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { OrderContext } from "../../context/Orders.tsx";
import {
  formatMonth,
  getOrdersWithinLastYear,
  getOrderValueByMonth,
  sortByMonth,
} from "../helpers/order.tsx";
import { Typography } from "@mui/material";

const BarChartComponent = ({ heading }) => {
  const { ordersData } = useContext(OrderContext);
  const orders = getOrderValueByMonth(getOrdersWithinLastYear(ordersData))?.reverse();

  const data = sortByMonth(
    orders?.map((order) => {
      return { month: formatMonth(order.month), value: order.revenue };
    })
  );
  //console.log(data);

  return (
    <div>
      {/* Chart Heading */}
      <Typography variant="h6" align="center" gutterBottom>
        {"Monthly Revenue"}
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
