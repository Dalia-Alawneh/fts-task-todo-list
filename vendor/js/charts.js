const generateChartData = async () => {
  try {
    const { todos } = await getTodos();
    const counts = todos.reduce(
      (acc, todo) => {
        todo.completed ? acc.doneCount += 1 : acc.todoCount += 1
        return acc;
      },
      { doneCount: 0, todoCount: 0 }
    );

    const total = todos.length;

    if (total === 0) {
      series = [0, 0];
    } else {
      series = [
        (counts.doneCount / total) * 100,
        (counts.todoCount / total) * 100
      ];

      return { counts, series }
    }
  } catch (e) {
    console.log("error" + e);

    return { counts: { doneCount: 0, todoCount: 0 }, series }
  }
}

const getChartOptions = (series) => {
  return {
    series: series,
    colors: ["#16BDCA", "#FDBA8C"],
    chart: {
      height: "350px",
      width: "100%",
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#E5E7EB',
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          margin: 0,
          size: "32%",
        }
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20,
      },
    },
    labels: ["Done", "To do"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value) {
          return value + '%';
        }
      }
    }
  }
}

const initChart = async () => {
  const { counts, series } = await generateChartData();

  if (document.getElementById("radial-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.querySelector("#radial-chart"), getChartOptions(series));
    chart.render();
  }

  document.getElementById('todo').innerText = counts.todoCount ?? 0;
  document.getElementById('done').innerText = counts.doneCount ?? 0;
};

initChart();