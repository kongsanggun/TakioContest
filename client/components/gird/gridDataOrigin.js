import React, { useRef, useEffect, useState } from "react";

import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";

export default function GridData() {
  const segInside =
    "w-full h-auto py-6 px-6 mb-8 bg-[#E9F2FA] border-[2px] border-[#E9F2FA] rounded-xl drop-shadow-md";
  const segInsideTitle =
    "w-full h-auto text-xl mb-4 text-[#245A8D] font-['SDKukdetopokki']";

  async function initGrid() {
    const dataSource = {
      contentType: "application/json",
      api: {
        readData: { url: "/ranking/origin", method: "GET" },
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
          showVerticalBorder: true,
          showHorizontalBorder: true,
        },
        header: {
          background: "#F7F6F3",
          border: "#F7F6F3",
          className: "font-['SDKukdetopokki']",
        },
        selectedHeader: {
          background: "#E9F2FA",
        },
      },
    });

    const grid = new Grid({
      el: document.getElementById("grid"),
      data: dataSource,
      scrollX: true,
      scrollY: true,
      rowHeight: 50,
      bodyHeight: 515,
      header: {
        height:50,
      },
      columns: [
        {
          header: "#",
          name: "ranking",
          width: 10,
          align: "center",
          renderer: {
            styles: {
              fontWeight: "bold",
              color: (props) =>
                Number(props.value) == 1
                  ? "rgb(98,43,155)"
                  : Number(props.value) == 2
                  ? "#F0B45E"
                  : Number(props.value) < 5
                  ? "rgb(101,106,146)"
                  : Number(props.value) < 9
                  ? "#AD5601"
                  : "#000",
            },
          },
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "entryName",
          header: "닉네임",
          minWidth : 200,
          align: "center",
          renderer: {
            styles: {
              fontWeight: "bold",
              color: (props) =>
                Number(props.rowKey) + 1 == 1
                  ? "rgb(98,43,155)"
                  : Number(props.rowKey) + 1 == 2
                  ? "#F0B45E"
                  : Number(props.rowKey) + 1 < 5
                  ? "rgb(101,106,146)"
                  : Number(props.rowKey) + 1 < 9
                  ? "#AD5601"
                  : "#000",
            },
          },
          className: "font-['SDKukdetopokki-Lt']"
        },
        {
          name: "takioImg",
          header: "사진",
          width: 50,
          align: "center",
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "songTotal",
          header: "Total",
          minWidth: 100,
          align: "center",
          renderer: {
            styles: {
              color: (props) =>
                Number(props.value) >= 3012550
                  ? "rgb(98,43,155)"
                  : Number(props.value) >= 3012550 * (0.95)
                  ? "rgb(207,93,105)"
                  : Number(props.value) >= 3012550 * (0.90)
                  ? "#F0B45E"
                  : Number(props.value) >= 3012550 * (0.85)
                  ? "rgb(101,106,146)"
                  : Number(props.value) >= 3012550 * (0.80)
                  ? "#AD5601"
                  : "#000",
            },
          },
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "songScore1",
          header: "恋文2000",
          minWidth: 100,
          align: "center",
          renderer: {
            styles: {
              color: (props) =>
                Number(props.value) >= 1003430
                  ? "rgb(98,43,155)"
                  : Number(props.value) >= 1003430 * (0.95)
                  ? "rgb(207,93,105)"
                  : Number(props.value) >= 1003430 * (0.90)
                  ? "#F0B45E"
                  : Number(props.value) >= 1003430 * (0.85)
                  ? "rgb(101,106,146)"
                  : Number(props.value) >= 1003430 * (0.80)
                  ? "#AD5601"
                  : "#000",
            },
          },
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "songScore2",
          header: "タベルナ2000",
          minWidth: 100,
          align: "center",
          renderer: {
            styles: {
              color: (props) =>
                Number(props.value) >= 1001620
                  ? "rgb(98,43,155)"
                  : Number(props.value) >= 1001620 * (0.95)
                  ? "rgb(207,93,105)"
                  : Number(props.value) >= 1001620 * (0.90)
                  ? "#F0B45E"
                  : Number(props.value) >= 1001620 * (0.85)
                  ? "rgb(101,106,146)"
                  : Number(props.value) >= 1001620 * (0.80)
                  ? "#AD5601"
                  : "#000",
            },
          },
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "songScore3",
          header: "きたさいたま2000",
          minWidth: 100,
          align: "center",
          renderer: {
            styles: {
              fontWeight: "bold",
              color: (props) =>
                Number(props.value) >= 1007500
                  ? "rgb(98,43,155)"
                  : Number(props.value) >= 1007500 * (0.95)
                  ? "rgb(207,93,105)"
                  : Number(props.value) >= 1007500 * (0.90)
                  ? "#F0B45E"
                  : Number(props.value) >= 1007500 * (0.85)
                  ? "rgb(101,106,146)"
                  : Number(props.value) >= 1007500 * (0.80)
                  ? "#AD5601"
                  : "#000",
            },
          },
          className: "font-['SDKukdetopokki']"
        },
      ],
      contextMenu: null,
    });
  }

  useEffect(() => {
    initGrid();
  }, []);

  return (
    <div className={segInside}>
      <div
        className={
          segInsideTitle +
          " flex flex-row items-center justify-start text-center"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className="w-5 h-5 fill-[#245A8D] mr-2"
        >
          <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V288c0-17.7-14.3-32-32-32H256zM32 320c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H160c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zm416 96v64c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V416c0-17.7-14.3-32-32-32H480c-17.7 0-32 14.3-32 32z" />
        </svg>
        대회 랭킹
      </div>
      <div id="grid" className="w-full h-auto text-['SDKukdetopokki-Lt']"></div>
    </div>
  );
}
