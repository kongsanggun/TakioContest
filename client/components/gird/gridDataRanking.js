import Router from "next/router";
import React, { useEffect } from "react";

import Grid from "tui-grid";
import "tui-grid/dist/tui-grid.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

export default function GridDatas() {
  // 주로 자주 사용하는 CSS 정리
  const mainDiv = "w-full h-auto flex flex-col items-center";
  const segDiv =
    "w-[80vw] sm:w-[70vw] h-auto py-10 text-[#121316] text-sm sm:text-base flex flex-col font-['SDKukdetopokki-Lt']";
  const segTitle =
    "w-full h-auto text-2xl sm:text-4xl mb-6 font-['SDKukdetopokki']";
  const segSubTitle =
    "w-full h-auto text-xl sm:text-2xl mb-6 font-['SDKukdetopokki']";
  const segp = "w-full h-auto";
  const seglink =
    "w-[15%] min-w-[100px] h-auto text-[#E69E4E] hover:text-[#B2712A] font-['SDKukdetopokki']";

  const segInside =
    "w-full h-[700px] py-6 px-6 mb-8 bg-[#E9F2FA] border-[2px] border-[#BED5ED] rounded-xl drop-shadow-md";
  const segInsideTitle =
    "w-full h-auto text-xl mb-4 text-[#245A8D] font-['SDKukdetopokki']";
  const segInsideP = "w-full h-auto text-sm";

  const inputDiv =
    "w-full h-auto p-2 mb-6 text-sm text-base border-2 focus:border-[#BED5ED] rounded-lg";
  const inputButton =
    "text-sm sm:text-base text-[#245A8D] hover:text-[#3E484A] hover:border-[#3E484A] font-['SDKukdetopokki-Lt'] py-1 w-[80px] h-auto bg-[#F9F9FB] hover:bg-[#E5FBFD] rounded-3xl border-[2px] border-[#245A8D] duration-300";

  var grid;

  async function initGrid() {
    const dataSource = {
      contentType: "application/json",
      api: {
        readData: { url: "/admin/raking", method: "GET" },
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      scrollX: true,
      scrollY: true,
      rowHeight: 50,
      bodyHeight: 515,
      header: {
        height: 50,
      },
      rowHeaders: ["rowNum", "checkbox"],
      columns: [
        {
          name: "state",
          header: "상태",
          align: "center",
          hidden: true,
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "stateIcon",
          header: " ",
          align: "center",
          width: 28,
          minWidth: 28,
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "compeId",
          header: "대회 번호",
          width: 120,
          align: "center",
          editor: "text",
          validation: { required: true },
          filter: 'select',
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "entryType",
          header: "참가 모드",
          width: 100,
          align: "center",
          formatter: "listItemText",
          editor: {
            type: "select",
            options: {
              listItems: [
                { text: "선택", value: "" },
                { text: "오리지널", value: "ORIGIN" },
                { text: "초고수", value: "CHO_GO_SU" },
              ],
            },
          },
          validation: { required: true },
          filter: 'select',
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "hostTaikoId",
          header: "주최자 북 번호",
          align: "center",
          width: 120,
          editor: "text",
          validation: { required: true },
          filter: 'select',
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "hostName",
          header: "주최자 이름",
          minWidth: 200,
          align: "center",
          editor: "text",
          validation: { required: true },
          filter: 'select',
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "startAt",
          header: "시작 시간",
          width: 120,
          align: "center",
          editor: "datePicker",
          validation: { required: true },
          filter: {
            type: 'date',
            options: {
              format: 'yyyy.MM.dd'
            }
          },
          className: "font-['SDKukdetopokki']"
        },
        {
          name: "endAt",
          header: "종료 시간",
          width: 120,
          align: "center",
          editor: "datePicker",
          validation: { required: true },
          filter: {
            type: 'date',
            options: {
              format: 'yyyy.MM.dd'
            }
          },
          className: "font-['SDKukdetopokki']"
        },
      ],
      columnOptions: {
        frozenCount: 1,
        frozenBorderWidth: 1,
      },
    });

    grid.on("afterChange", (origin) => {
      let changeKey = origin.changes[0].rowKey;
      let originRow = grid.dataManager.getOriginData()[changeKey];
      let afterRow = grid.store.data.rawData[changeKey];

      if (afterRow["state"] == "C") {
        return;
      }

      if (!checkUpdate(originRow, afterRow)) {
        afterRow["state"] = "U";
        afterRow[
          "stateIcon"
        ] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px] h-[20px] fill-[#6589c8]"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
        return;
      }
      afterRow["state"] = "";
      afterRow["stateIcon"] = "";
      return;
    }); // 상태 바 표시
  }

  const checkUpdate = (originRow, afterRow) => {
    for (let index in originRow) {
      if (originRow[index] !== afterRow[index]) return false;
    }
    return true;
  };

  const addRow = async () => {
    grid.appendRow({
      state: "C",
      entryType: "",
      startAt: new Date().toISOString().split("T")[0],
      endAt: new Date().toISOString().split("T")[0],
      stateIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-[20px] h-[20px] fill-[#2aa743]"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>`,
    });
  };

  const deleteRow = async () => {
    const checked = grid.getCheckedRowKeys();
    if (checked.length === 0) {
      alert("삭제하고자 하는 항목을 선택해주세요.");
    }
    grid.removeRows(checked);
  };

  async function Save(e) {
    const createdLength = grid.getModifiedRows().createdRows.length;
    const deletedLength = grid.getModifiedRows().deletedRows.length;
    const updatedLength = grid.getModifiedRows().updatedRows.length;

    if (createdLength + deletedLength + updatedLength === 0) {
      alert("변경된 내역이 없습니다.");
      return;
    }

    try {
      let response = await fetch(`/admin/raking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(grid.getModifiedRows()),
      });

      if (!response.ok) {
        const data = (await response.text()).split(",");
        const message = await data[1].split(":")[1].replaceAll('"', "");

        setAlertMessage(message);
        throw new Error(message);
      }

      alert("저장 완료");
      grid.reloadData();
    } catch (Error) {
      alert("에러");
      return;
    }
  }

  useEffect(() => {
    initGrid();
  }, []);

  return (
    <div className="mb-6">
      <div className="flex justify-end mb-4">
        <button className={inputButton + " mr-2"} onClick={addRow}>
          추가
        </button>
        <button className={inputButton + " mr-2"} onClick={deleteRow}>
          삭제
        </button>
        <button className={inputButton + " mr-2"} onClick={Save}>
          저장
        </button>
      </div>
      <div id="grid" className="w-full h-auto text-['SDKukdetopokki-Lt']"></div>
    </div>
  );
}
