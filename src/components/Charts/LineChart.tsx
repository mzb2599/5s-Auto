import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { OrderContext } from "../../context/Orders.tsx";
import {
  getOrderCountByMonth,
  formatMonth,
  sortByMonth,
} from "../helpers/order.tsx";
import { Typography } from "@mui/material";
import {getOrdersWithinLastYear} from '../helpers/order.tsx'

const LineChartComponent = (props) => {
  const { ordersData } = useContext(OrderContext);
  const order = getOrderCountByMonth(getOrdersWithinLastYear(ordersData))?.reverse();

  // Map the data correctly to use in the chart
  const data = sortByMonth(
    order?.map((order) => {
      return { month: formatMonth(order.month), orderCount: order.orderCount };
    })
  );

  return (
    <div>
      {/* Chart Heading */}
      <Typography variant="h6" align="center" gutterBottom>
        {"Monthly Order count"}
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="bump" dataKey="orderCount" stroke="#880ED4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
