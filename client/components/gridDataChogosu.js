import React, { useRef, useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";


export default function GridData() {

  const [size, setSize] = useState(0);
  const [labels, setLabels] = useState([]);
  const [songScore1, setSongScore1] = useState([]);
  const [songScore2, setSongScore2] = useState([]);
  const [songScore3, setSongScore3] = useState([]);

  async function initBar() {
    try {
      const setBar = await fetch(`/entry/chogosu`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(message);
          }
          return res.json();
        })
        .then(async (data) => {
          const rankData = data.data.contents;
          setSize(rankData.length); // 참가자 수

          rankData.forEach((element, index) => {
            labels.push(element.entryName);

            songScore1.push(element.songScore1);
            songScore2.push(element.songScore2);
            songScore3.push(element.songScore3);
          });
        });
    } catch (Error) {
        Router.push("/error");
        return;
    }
  }

  async function initGrid() {
    const dataSource = {
      contentType: "application/json",
      api: {
        readData: { url: "/entry/chogosu", method: "GET" },
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    Grid.applyTheme("clean", {
      cell: {
        normal: {
          background: "#fff",
          border: "#e0e0e0",
          showVerticalBorder: false,
          showHorizontalBorder: true,
        },
        header: {
          background: "#fff",
          border: "#fff",
        },
        selectedHeader: {
          background: "#e0e0e0",
        },
      },
    });

    const grid = new Grid({
      el: document.getElementById("grid"),
      data: dataSource,
      scrollX: false,
      scrollY: false,
      rowHeight: "auto",
      columns: [
        {
          header: "#",
          name: "ranking",
          width: 10,
          align: "center",
        },
        {
          name: "entryName",
          header: "닉네임",
          align: "center",
        },
        {
          name: "takioImg",
          header: "사진",
          width: 50,
          align: "center",
        },
        {
          name: "songTotal",
          header: "Total",
          align: "center",
        },
        {
          name: "songScore1",
          header: "Xevel",
          align: "center",
        },
        {
          name: "songScore2",
          header: "Hurtling Boys",
          align: "center",
        },
        {
          name: "songScore3",
          header: "ANiMA",
          align: "center",
        },
      ],
    });
  }

  useEffect(() => {
    initBar();
    initGrid();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend); // TODO : 정보 반영하기

    const data = {
        labels,
        datasets: [
            {
                label: 'Xevel',
                data: songScore1,
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Hurtling Boys',
                data: songScore2,
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'ANiMA',
                data: songScore3,
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ],
    };
    
    const options = {
        indexAxis: 'y',
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '참가자 랭킹',
            },
        },
        elements: {
            bar: {
                borderWidth: 0,
            }
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                min: 0,
                max: 3100000,
                ticks: {
                    stepSize: 100000,
                }
            },
            y: {
                stacked: true,
            },
        },
    
    };

  const RankMain = () => {
    return (
      <div className="w-full h-auto mb-10 pb-8 border-b-[1.5px] border-b-[#BEC0D7]">
        <p className="text-xl mb-2 w-[full]">
          기간 : 0000-00-00 ~ 0000-00-00
        </p>
        <p className="text-xl mb-2 w-[full]">
          참가자 수 : {size}명
          <br />
        </p>
        <p className="text-xl mb-2 w-[full]">
          랭킹 갱신은 매일 06:00에 갱신됩니다.
        </p>
      </div>
    );
  };

  return (
    <div className="mt-10 mb-8">
      <RankMain />
      <div className="w-full min-w-[300px] h-auto mb-10">
        <Bar options={options} data={data} className="w-full h-full" />
      </div>
      <div id="grid" className="text-xs w-full h-auto"></div>
    </div>
  );
}