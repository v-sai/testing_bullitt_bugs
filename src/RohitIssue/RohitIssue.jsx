import React, { useState } from "react";
import OrgChart from "@unicef/react-org-chart";

function RohitIssue() {
  const [tree, setTree] = useState({
    name: "Company",
    children: [
      {
        name: "CEO",
        children: [
          {
            name: "CTO",
            children: [
              {
                name: "Software Engineer",
              },
              {
                name: "QA Engineer",
              },
            ],
          },
          {
            name: "COO",
            children: [
              {
                name: "Sales Manager",
              },
              {
                name: "Marketing Manager",
              },
            ],
          },
        ],
      },
      {
        name: "CFO",
        children: [
          {
            name: "Accountant",
          },
          {
            name: "Financial Analyst",
          },
        ],
      },
    ],
  });

  return (
    <div>
      <OrgChart
        tree={tree}
        nodeWidth={180}
        nodeHeight={100}
        nodeSpacing={12}
        animationDuration={350}
        lineType="angle"
      />
    </div>
  );
}

export default RohitIssue;
