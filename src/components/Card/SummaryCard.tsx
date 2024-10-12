import React from "react";
import "./SummaryCard.css"; // Assuming you're styling with a CSS file

const HarmonySummaryCard = () => {
  const cardsData = [
    { heading: "Users", metric: 1200 },
    { heading: "Revenue", metric: "$35,000" },
    { heading: "Orders", metric: 980 },
  ];

  return (
    <div className="summary-card-container">
      {cardsData.map((card, index) => (
        <div key={index} className="card">
          <h1>{card.heading}</h1>
          <h3>{card.metric}</h3>
        </div>
      ))}
    </div>
  );
};

export default HarmonySummaryCard;
