import Router from "next/router";
import React, { useRef, useEffect, useState } from "react";

import Chart from "@toast-ui/chart";
import "@toast-ui/chart/dist/toastui-chart.min.css"; // Chart 스타일

export default function BarData({date, size, labels, songScore1, songScore2, songScore3}) {
  useEffect(() => {
    initBar();
  }, []);

  async function initBar() {
    const el = document.getElementById("chart");
    const data = {
      categories: labels,
      series: [
        {
          name: "Xevel",
          data: songScore1,
        },
        {
          name: "Hurtling Boys",
          data: songScore2,
        },
        {
          name: "ANiMA",
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
          color: "#BEC0D7",
        },
        yAxis: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
          },
          width: 1,
          margin: 50,
          color: "#BEC0D7",
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
        <p className="text-base mb-2 w-[full]">
          기간 : {date.start} ~ {date.end}
        </p>
        <p className="text-base mb-4 w-[full]">
          참가자 수 : {size}명
          <br />
        </p>
        <p className="text-base mb-2 w-[full]">
          랭킹 갱신은 매일 06:00에 갱신됩니다.
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
