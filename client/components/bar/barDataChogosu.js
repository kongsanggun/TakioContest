import React, { useRef, useEffect, useState } from "react";

import Chart from "@toast-ui/chart";
import '@toast-ui/chart/dist/toastui-chart.min.css'; // Chart 스타일


export default function BarData() {

  async function initBar() {
    const el = document.getElementById('chart');
    const data = {
      categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        {
          name: 'Budget',
          data: [5000, 3000, 5000, 7000, 6000, 4000, 1000],
        },
        {
          name: 'Income',
          data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
        },
      ],
    };
    const options = {
      chart: { width: 700, height: 400 },
    };
    
    const chart = Chart.barChart({ el, data, options });
  }


  useEffect(() => {
    initBar();
  }, []);


  return (
    <div className="mt-10 mb-8">
      <div id="chart" className="text-xs w-full h-auto"></div>
    </div>
  );
}