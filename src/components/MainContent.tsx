import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function MainContent() {
  return (
    <LineChart
      series={[
        { curve: "catmullRom", data: [0, 5, 2, 6, 3, 9.3] },
        { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
      ]}
      width={750}
      height={450}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      axisLabel={"Revenue"}
    />
  );
}
