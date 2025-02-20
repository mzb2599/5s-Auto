import React from "react";
import "./Dashboard.css";
import { Grid } from "@mui/material";
import HarmonySummaryCard from "./Card/SummaryCard.tsx";
import BarChartComponent from "./Charts/BarChart.tsx";
import LineChartComponent from "./Charts/LineChart.tsx";
import PieChart from "./Charts/PieChart.tsx";

export default function MainContent() {
  return (
    <>
      <HarmonySummaryCard />
      <Grid container spacing={2} justifyContent="center" mt={6} mb={3}>
        <Grid item xs={8}>
          <PieChart />
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="center" mt={6}>
        <Grid item xs={5}>
          <BarChartComponent heading={"Order by Area"} />
        </Grid>
        <Grid item xs={5}>
          <LineChartComponent heading={"Revenue By Area"} />
        </Grid>
      </Grid>
    </>
  );
}
