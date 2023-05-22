import Router from "next/router";
import React, { useRef, useEffect, useState } from "react";

import Chart from "@toast-ui/chart";
import "@toast-ui/chart/dist/toastui-chart.min.css"; // Chart 스타일

export default function BarData({size, labels, songScore1, songScore2, songScore3}) {
  useEffect(() => {
    initBar();
  }, []);

  async function initBar() {
    const el = document.getElementById("chart");
    const data = {
      categories: labels,
      series: [
        {
          name: "Clotho クロートー",
          data: songScore1,
        },
        {
          name: "月影SASURAI",
          data: songScore2,
        },
        {
          name: "Venomous",
          data: songScore3,
        },
      ],
    };
    const options = {
      chart: {
        width: "100%",
        height: "30vh",
        animation: {
          duration: 1500,
        },
      },
      legend: {
        align: "bottom",
        showCheckbox: false,
      },
      series: {
        stack: true,
        dataLabels: { visible: true },
      },
      xAxis: {
        scale: {
          min: 0,
          max: 3100000,
          stepSize: 250000,
        },
        tick: {
          interval: 1,
        },
        label: {
          interval: 4,
        },
      },
      theme: {
        series: {
          barWidth: 40,
          colors: ["#FF0000", "#FFFF00", "#03FF00"],
        },
        xAxis: {
            margin: 40,
            color: '#BEC0D7',
        },
        yAxis: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
          },
          width: 1,
          margin: 50,
          color: '#BEC0D7',
        },
      },
      exportMenu: {
        visible: false,
      },
    };

    const chart = Chart.barChart({ el, data, options });
  }

  const RankMain = () => {
    return (
      <div className="w-full h-auto">
        <p className="text-base mb-4 w-[full]">
          참가자 수 : {size}명
          <br />
        </p>
      </div>
    );
  };

  return (
    <div className="my-6">
      <RankMain />
      <div id="chart" className="text-xs w-full h-[30vh]"></div>
    </div>
  );
}
