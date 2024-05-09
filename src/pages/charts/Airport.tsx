import React, { useEffect } from "react";
import * as echarts from "echarts";
import request from "@/utils/request";
import styles from "./style.less";

const Index = () => {
  // 已选中的座位数据
  const takenSeatNames = ["27E", "26D", "26C", "25D", "23C", "21A", "20F"];
  function makeTakenRegions(takenSeatNames: string[]) {
    var regions = [];
    for (var i = 0; i < takenSeatNames.length; i++) {
      regions.push({
        name: takenSeatNames[i],
        silent: true,
        itemStyle: {
          color: "red", //初始状态时的颜色
        },
        emphasis: {
          itemStyle: {
            borderColor: "yellow", //hover座位时的边框色
            borderWidth: 1,
          },
        },
        select: {
          itemStyle: {
            color: "pink", //再次选择的背景色
          },
        },
      });
    }
    return regions;
  }
  //   飞机图的相关配置项
  const option = {
    tooltip: {},
    geo: {
      map: "flight-seats",
      roam: true,
      selectedMode: "multiple",
      layoutCenter: ["50%", "50%"],
      layoutSize: "300%", //整个机舱的放大缩小比例
      tooltip: {
        show: true,
      },
      itemStyle: {
        color: "#fff", //未选择的座位
      },
      emphasis: {
        itemStyle: {
          color: undefined,
          borderColor: "green",
          borderWidth: 2,
        },
        label: {
          show: false,
        },
      },
      select: {
        itemStyle: {
          color: "green",
        },
        label: {
          show: false, //是否显示座位号
          textBorderColor: "#fff",
          textBorderWidth: 2,
        },
      },
      regions: makeTakenRegions(takenSeatNames),
    },
  };

  const execEcharts = async () => {
    // 初始化配置
    const chartContainer = document.getElementById("a1");
    const myChart = echarts.init(chartContainer, null, {
      renderer: "svg", // 必须使用 SVG 模式
      width: 600, // 需要指明高和宽
      height: 800,
    });
    // 获取整个飞机选座的svg
    await request.get("/getOthersUrlSvg").then((res) => {
      //使用DOMParser将SVG字符串转换成DOM结构
      //   var parser = new DOMParser();
      //   var svgDoc = parser.parseFromString(res.svg, "image/svg+xml");
      //   // 获取转换后的SVG元素
      //   var svgElement = svgDoc.getElementsByTagName("svg")[0];
      //   将xml的string数据转化为dom结构数据
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(res.svg, "text/xml");
      console.log(xmlDoc, typeof xmlDoc);
      echarts.registerMap("flight-seats", {
        svg: xmlDoc,
      });
    });

    // 创建和配置 ECharts 表格
    myChart.setOption(option);
    // 当操作图形选中时的事件
    myChart.on("geoselectchanged", function (params: any) {
      const selectedNames: string[] = params.allSelected[0].name.slice();
      // Remove taken seats.
      for (var i = selectedNames.length - 1; i >= 0; i--) {
        if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
          selectedNames.splice(i, 1);
        }
      }

      console.log("selected", selectedNames);
    });
  };
  useEffect(() => {
    execEcharts();
  }, []);
  return (
    <div className={styles.airportBox}>
      <div id="a1"></div>
      <p>Index</p>
    </div>
  );
};

export default Index;
