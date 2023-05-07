import React, { useRef, useEffect, useState } from "react";

import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";

export default function GridData() {

  async function initGrid() {
    const dataSource = {
      contentType: "application/json",
      api: {
        readData: { url: "/ranking/origin", method: "GET" },
      },
      headers: {
        "Content-Type": "application/json",
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
          header: "恋文2000",
          align: "center",
        },
        {
          name: "songScore2",
          header: "タベルナ2000",
          align: "center",
        },
        {
          name: "songScore3",
          header: "きたさいたま2000",
          align: "center",
        },
      ],
    });
  }

  useEffect(() => {
    initGrid();
  }, []);

  return (
    <div id="grid" className="text-xs w-full h-auto"></div>
  );
}
