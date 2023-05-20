import React, { useRef, useEffect, useState } from "react";

import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";

export default function GridData() {
  async function initGrid() {
    const dataSource = {
      contentType: "application/json",
      api: {
        readData: { url: "/ranking/chogosu", method: "GET" },
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
      scrollY: true,
      rowHeight: "600px",
      selectionUnit: 'row',
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
                  ? "#F0B45E"
                  : Number(props.value) == 2
                  ? "#435F7A"
                  : Number(props.value) == 3
                  ? "#AD5601"
                  : Number(props.value) < 9
                  ? "#AD5601"
                  : "#000",
            },
            classNames: ["my-styled-cell"],
          },
        },
        {
          name: "entryName",
          header: "닉네임",
          width: 'auto',
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
          width: 100,
          align: "center",
        },
        {
          name: "songScore1",
          header: "Xevel",
          width: 100,
          align: "center",
        },
        {
          name: "songScore2",
          header: "Hurtling Boys",
          width: 100,
          align: "center",
        },
        {
          name: "songScore3",
          header: "ANiMA",
          width: 100,
          align: "center",
        },
      ],
      contextMenu : null,
    });
  }

  useEffect(() => {
    initGrid();
  }, []);

  return <div id="grid" className="w-full h-auto text-xs"></div>;
}
