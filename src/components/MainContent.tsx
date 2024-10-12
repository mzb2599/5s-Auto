import React from "react";
import "./MainContent.css";
import Card from "./Card/Card.tsx";
import { Grid } from "@mui/material";
import HarmonySummaryCard from "./Card/SummaryCard.tsx";
import BarChartComponent from "./Charts/BarChart.tsx";
import LineChartComponent from "./Charts/LineChart.tsx";
//import GeoPieChartComponent from "./Charts/HeatmapChart.tsx";
import SalesDistributionChart from "./Charts/SalesDistributionChart.tsx";
import HalfPieChart from "./Charts/PieChart.tsx";
import HorizontalBarChart from "./Charts/horizontalBarChart.tsx";

export default function MainContent() {
  return (
    <>
      <HarmonySummaryCard />
      <SalesDistributionChart />
      <Grid container spacing={1} justifyContent="center" mt={6}>
        <Grid item xs={5}>
          <BarChartComponent heading={"Order by Area"} />
        </Grid>
        <Grid item xs={5}>
          <LineChartComponent heading={"Revenue By Area"} />
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="center" mt={6} mb={3}>
        <Grid item xs={5}>
          <HalfPieChart />
        </Grid>
        <Grid item xs={5} >
          <HorizontalBarChart />
        </Grid>
      </Grid>
    </>
  );
}
