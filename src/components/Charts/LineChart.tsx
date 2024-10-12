import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

const data = [
  { name: "Jan", sales: 240 },
  { name: "Feb", sales: 2210 },
  { name: "Mar", sales: 2290 },
  { name: "Apr", sales: 300 },
  { name: "May", sales: 2181 },
  { name: "Jun", sales: 2500 },
];

const LineChartComponent = ({heading}) => {
  return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="sales" stroke="#880ED4" />
          </LineChart>
        </ResponsiveContainer>
  );
};

export default LineChartComponent;
