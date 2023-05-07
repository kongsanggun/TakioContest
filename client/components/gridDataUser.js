import Router from "next/router";
import React, { useEffect } from "react";

import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";

export default function GridDatas() {

  var grid;

  function test(tmp) {
    return "test";
  }

  async function initGrid() {
    const dataSource = {
      contentType: "application/json",
      api: {
        readData: { url: "/admin/entry", method: "GET" },
        modifyData: { url: "/admin/entry", method: "POST" },
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

    grid = new Grid({
      el: document.getElementById("grid"),
      data: dataSource,
      bodyHeight: "fitToParent",
      scrollX: false,
      scrollY: false,
      rowHeight: "auto",
      rowHeaders: ["rowNum", "checkbox"],
      columns: [
        {
          name: "taikoId",
          header: "태고북번호",
          align: "center",
        },
        {
          name: "entryType",
          header: "참가 모드",
          align: "center",
          formatter: 'listItemText',
          editor: {
            type: 'select',
            options: {
              listItems: [
                { text: '선택', value: '' },
                { text: '오리지널', value: 'ORIGIN' },
                { text: '초고수', value: 'CHO_GO_SU' },
                { text: '참가 정지', value: 'BANNED' }
              ]
            }
          }
        },
        {
          name: "entryName",
          header: "참가자 이름",
          align: "center",
        },
        {
          name: "contacts",
          header: "연락처",
          align: "center",
        },
        {
          name: "songScore1",
          header: "곡 점수1",
          align: "center",
        },
        {
          name: "songScore2",
          header: "곡 점수2",
          align: "center",
        },
        {
          name: "songScore3",
          header: "곡 점수3",
          align: "center",
        },
        {
          name: "entryAt",
          header: "참가 시간",
          align: "center",
        },
        {
          name: "expiredAt",
          header: "만료 시간",
          align: "center",
        },
      ],
    });
  }

  async function Save(e) {
    console.log(grid.getCheckedRows());
  }

  useEffect(() => {
    initGrid();
  }, []);

  return (
    <div className="mt-10 mb-8">
      <div>
        <button
          className="text-xl p-3 mb-3 w-[15vw] h-auto bg-slate-500 rounded-md"
          onClick={Save}
        >
          BAN
        </button>
        <button
          className="text-xl p-3 mb-3 w-[15vw] h-auto bg-slate-500 rounded-md"
          onClick={null}
        >
          NOT BAN
        </button>
      </div>
      <div id="grid" className="text-xs w-full h-[50vh]"></div>
    </div>
  );
}
