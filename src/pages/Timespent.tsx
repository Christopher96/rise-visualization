import { useContext, useEffect } from "react";
import Context from "../context";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function Home() {
  const context = useContext(Context);
  useEffect(() => {
    context?.setPage("timespent");
  });

  /*  const data = [
    {
      "country": "AD",
      "hot dog": 169,
      "hot dogColor": "hsl(135, 70%, 50%)",
      "burger": 46,
      "burgerColor": "hsl(322, 70%, 50%)",
      "sandwich": 122,
      "sandwichColor": "hsl(299, 70%, 50%)",
      "kebab": 84,
      "kebabColor": "hsl(315, 70%, 50%)",
      "fries": 36,
      "friesColor": "hsl(190, 70%, 50%)",
      "donut": 136,
      "donutColor": "hsl(304, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 180,
      "hot dogColor": "hsl(38, 70%, 50%)",
      "burger": 19,
      "burgerColor": "hsl(268, 70%, 50%)",
      "sandwich": 52,
      "sandwichColor": "hsl(197, 70%, 50%)",
      "kebab": 31,
      "kebabColor": "hsl(171, 70%, 50%)",
      "fries": 67,
      "friesColor": "hsl(292, 70%, 50%)",
      "donut": 159,
      "donutColor": "hsl(274, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 176,
      "hot dogColor": "hsl(47, 70%, 50%)",
      "burger": 189,
      "burgerColor": "hsl(310, 70%, 50%)",
      "sandwich": 184,
      "sandwichColor": "hsl(336, 70%, 50%)",
      "kebab": 194,
      "kebabColor": "hsl(92, 70%, 50%)",
      "fries": 33,
      "friesColor": "hsl(69, 70%, 50%)",
      "donut": 41,
      "donutColor": "hsl(82, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 178,
      "hot dogColor": "hsl(157, 70%, 50%)",
      "burger": 147,
      "burgerColor": "hsl(356, 70%, 50%)",
      "sandwich": 141,
      "sandwichColor": "hsl(174, 70%, 50%)",
      "kebab": 164,
      "kebabColor": "hsl(151, 70%, 50%)",
      "fries": 26,
      "friesColor": "hsl(119, 70%, 50%)",
      "donut": 149,
      "donutColor": "hsl(254, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 87,
      "hot dogColor": "hsl(211, 70%, 50%)",
      "burger": 137,
      "burgerColor": "hsl(59, 70%, 50%)",
      "sandwich": 54,
      "sandwichColor": "hsl(17, 70%, 50%)",
      "kebab": 2,
      "kebabColor": "hsl(109, 70%, 50%)",
      "fries": 188,
      "friesColor": "hsl(199, 70%, 50%)",
      "donut": 23,
      "donutColor": "hsl(9, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 85,
      "hot dogColor": "hsl(170, 70%, 50%)",
      "burger": 105,
      "burgerColor": "hsl(88, 70%, 50%)",
      "sandwich": 137,
      "sandwichColor": "hsl(338, 70%, 50%)",
      "kebab": 70,
      "kebabColor": "hsl(227, 70%, 50%)",
      "fries": 190,
      "friesColor": "hsl(59, 70%, 50%)",
      "donut": 128,
      "donutColor": "hsl(190, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 123,
      "hot dogColor": "hsl(224, 70%, 50%)",
      "burger": 173,
      "burgerColor": "hsl(97, 70%, 50%)",
      "sandwich": 30,
      "sandwichColor": "hsl(142, 70%, 50%)",
      "kebab": 140,
      "kebabColor": "hsl(136, 70%, 50%)",
      "fries": 61,
      "friesColor": "hsl(239, 70%, 50%)",
      "donut": 133,
      "donutColor": "hsl(151, 70%, 50%)"
    }
  ]*/

  const data = [
    { location: "Stockholm1", numberOfVisitors: 10 },
    { location: "Stockholm2", numberOfVisitors: 20 },
    { location: "Stockholm3", numberOfVisitors: 30 },
  ];

  return (
    <div style={{ height: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["numberOfVisitors"]}
        indexBy="location"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "numberOfVisitors",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "location",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "average time spent",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={false}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}
