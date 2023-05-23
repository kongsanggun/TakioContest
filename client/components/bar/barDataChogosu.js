import Router from "next/router";
import React, { useRef, useEffect, useState } from "react";

import Chart from "@toast-ui/chart";
import "@toast-ui/chart/dist/toastui-chart.min.css"; // Chart 스타일

export default function BarData({
  size,
  labels,
  songScore1,
  songScore2,
  songScore3,
}) {
  const segInside =
    "w-full h-auto py-6 px-6 mb-8 bg-[#E9F2FA] border-[2px] border-[#E9F2FA] rounded-xl drop-shadow-md";
  const segInsideTitle =
    "w-full h-auto text-xl mb-4 text-[#245A8D] font-['SDKukdetopokki']";
  const segp = "w-full h-auto text-xl sm:text-2xl";

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
        width: "auto",
        height: 500,
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
        eventDetectType: "grouped",
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
        margin: 50,
      },
      tooltip: {
        formatter: (value, tooltipDataInfo) => {
          return `${value}점`;
        },
      },
      theme: {
        chart: {
          backgroundColor: "#E9F2FA",
        },
        series: {
          dataLabels: {
            fontFamily: "SDKukdetopokki-Lt",
            fontSize: 12,
            textStrokeColor: "#ffffff",
            shadowColor: "#ffffff",
            shadowBlur: 3,
            color: "#1B1C1C",
            stackTotal: {
              fontFamily: "SDKukdetopokki-Lt",
              fontSize: 10,
              color: "#245A8D",
              textBubble: {
                visible: false,
              },
            },
          },
          barWidth: 40,
          colors: ["#BED5ED", "#89AEC5", "#506B92"],
        },
        xAxis: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
            fontSize: 10,
            color: "#245A8D",
          },
          margin: 40,
          color: "#245A8D",
        },
        yAxis: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
            fontSize: 10,
            color: "#245A8D",
          },
          width: 1,
          margin: 50,
          color: "#245A8D",
        },
        legend: {
          label: {
            fontFamily: "SDKukdetopokki-Lt",
            fontSize: 15,
            color: "#245A8D",
          },
        },
        tooltip: {
          header: {
            fontFamily: "SDKukdetopokki-Lt",
          },
          body: {
            fontFamily: "SDKukdetopokki-Lt",
          },
        },
        plot: {
          vertical: {
            lineColor: "#BED5ED",
          },
          horizontal: {
            lineColor: "#BED5ED",
          },
        },
      },
      exportMenu: {
        visible: false,
      },
      responsive: {
        rules: [
          {
            condition: ({ width: w }) => {
              return w <= 490;
            },
            options: {
              series: {
                stack: true,
                dataLabels: { visible: false },
              },
              yAxis: {
                label: {
                  formatter: (value) => {
                    if (value.length > 2) {
                      return `${value.substr(0, 2)}..`;
                    }
                    return `${value}`;
                  },
                },
                width: 30,
              },
              legend: {
                visible: false,
              },
              tooltip: {
                template: (model, defaultTooltipTemplate, theme) => {
                  const { body, header } = defaultTooltipTemplate;
                  const { background } = theme;

                  const label = [
                    model.data[0].label.substr(0, 5) + "..",
                    model.data[1].label.substr(0, 5) + "..",
                    model.data[2].label.substr(0, 5) + "..",
                  ];
                  const value = [
                    model.data[0].value,
                    model.data[1].value,
                    model.data[2].value,
                  ];

                  return `<div style="background: ${background}; width: 140px; text-align: center; color: white;">
                          ${header}
                          <div class="toastui-chart-tooltip-series-wrapper" style="font-weight: normal; font-family: SDKukdetopokki-Lt; font-size: 6px; color: #ffffff;">
                          <div class="toastui-chart-tooltip-series">
                                    <span class="toastui-chart-series-name">
                        <i class="toastui-chart-icon" style="background: #BED5ED"></i>
                        <span class="toastui-chart-name">${label[0]}</span>
                      </span>
                                    <span class="toastui-chart-series-value">${value[0]}</span>
                                  </div><div class="toastui-chart-tooltip-series">
                                    <span class="toastui-chart-series-name">
                        <i class="toastui-chart-icon" style="background: #89AEC5"></i>
                        <span class="toastui-chart-name">${label[1]}</span>
                      </span>
                                    <span class="toastui-chart-series-value">${value[1]}</span>
                                  </div><div class="toastui-chart-tooltip-series">
                                    <span class="toastui-chart-series-name">
                        <i class="toastui-chart-icon" style="background: #506B92"></i>
                        <span class="toastui-chart-name">${label[2]}</span>
                      </span>
                                    <span class="toastui-chart-series-value">${value[2]}</span>
                                  </div>
                        </div>
                          
                          
                          </div>`;
                },
              },
              theme: {
                tooltip: {
                  yAxis: {
                    fontSize: 6,
                  },
                  header: {
                    fontSize: 8,
                    fontFamily: "SDKukdetopokki-Lt",
                  },
                  body: {
                    fontSize: 6,
                    fontFamily: "SDKukdetopokki-Lt",
                  },
                },
              },
            },
          },
        ],
      },
    };

    const chart = Chart.barChart({ el, data, options });
  }

  return (
    <>
      <div className="flex flex-row items-center justify-start w-full h-auto mt-2 mb-8 text-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-5 h-5 mr-3 sm:w-6 sm:h-6"
        >
          <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
        </svg>
        <div className={segp}>
          현재 참가자 수 :{" "}
          <span className="font-['SDKukdetopokki']">{size}</span>명{" "}
        </div>
      </div>
      <div className={segInside}>
        <div
          className={
            segInsideTitle +
            " flex flex-row items-center justify-start text-center"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 fill-[#245A8D] mr-2"
          >
            <path d="M24 32c13.3 0 24 10.7 24 24V408c0 13.3 10.7 24 24 24H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H72c-39.8 0-72-32.2-72-72V56C0 42.7 10.7 32 24 32zM128 136c0-13.3 10.7-24 24-24l208 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-208 0c-13.3 0-24-10.7-24-24zm24 72H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 96H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
          </svg>
          Top 8 Bar Graph
        </div>
        <div id="chart" style={{ width: "100%", height: "500px" }}></div>
      </div>
    </>
  );
}
