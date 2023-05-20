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
        fontFamily: "SDKukdetopokki-Lt",
        align: "top",
        showCheckbox: false,
      },
      series: {
        stack: true,
        dataLabels: { visible: true },
        eventDetectType: 'grouped'
      },
      xAxis: {
        scale: {
          min: 0,
          max: 3500000,
          stepSize: 500000,
        },
        tick: {
          interval: 2,
        },
        label: {
          interval: 2,
        },
        margin: 50
      },
      tooltip: {
        formatter: (value, tooltipDataInfo) => {
          return `${value}점`;
        },
      },
      theme: {
        series: {
          dataLabels: {
            fontFamily: "SDKukdetopokki-Lt",
            textStrokeColor: '#ffffff',
            shadowColor: '#ffffff',
            shadowBlur: 3,    
            color: '#1B1C1C',
            stackTotal: {
              fontFamily: "SDKukdetopokki-Lt",
              fontWeight: 14,
              color: '#1876A9',
              textBubble:{
                visible: false,
              }
            }
          },
          barWidth: 40,
          colors: ["#BED5ED", "#89AEC5", "#506B92"],
        },
        xAxis: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
          },
          margin: 40,
          color: "#919EA2",
        },
        yAxis: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
          },
          width: 1,
          margin: 50,
          color: "#919EA2",
        },
        legend: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
            fontSize: 15,
          }
        },
        tooltip: {
          header: {
            fontFamily: "SDKukdetopokki-Lt",
          },
          body: {
            fontFamily: "SDKukdetopokki-Lt",
          }
        }
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
      <div id="chart" className="text-xs w-full h-[500px]"></div>
    </div>
  );
}
