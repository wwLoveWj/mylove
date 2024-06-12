import React, { useState, useEffect } from "react";
//引入xlsx工具
import { read, writeFile, utils } from "xlsx";

const Index = () => {
  const change = (e) => {
    //获取文件
    let fileData = e.target.files[0];
    //转化为arrayBufferr
    // file.arrayBuffer().then((res) => {
    //   //读取book对象
    //   let wb = read(res);
    //   let sheet = wb.Sheets["2024年4月"];
    //   console.log(sheet, "sheet-----------");
    //   console.log(wb);
    // });
    // 读取 Excel 文件
    let file = new Blob([fileData]);
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      // 将文件转换为二进制数据
      debugger;
      const data = new Uint8Array(fileReader.result); // 使用 SheetJS 解析 Excel 文件
      const workbook = read(data, { type: "array" }); // 获取第一个工作表
      const worksheet = workbook.Sheets[workbook.SheetNames[4]]; // 将工作表数据转换为 JSON 格式 // 分析对应关系
      const jsonData: any = utils.sheet_to_json(worksheet, { header: 1 }); // 表头序号 0 1 2 3
      let columnNames = [];
      let columnValues = [];
      let tableArr = [];
      for (let i = 0; i <= 36; i++) {
        if (i >= 6) {
          tableArr.push({ label: jsonData[i][1], prop: jsonData[i][2] });
          columnNames.push(jsonData[i][1]);
          columnValues.push(jsonData[i][2]);
        }
      }
      if (
        columnNames.indexOf("姓名") >= 0 &&
        columnNames.indexOf("出生年月") >= 0
      ) {
        //     for (let i = 1; i < jsonData.length; i++) {
        //       let person = {};
        //       for (let str in this.tableArr) {
        //         let col = this.tableArr[str].label;
        //         let index = columnKeyName.indexOf(col);
        //         if (index >= 0) {
        //           let val = jsonData[i][index];
        //           person[this.tableArr[str].prop] = val;
        //         }
        //       }
        //       this.tabelDataExcel.push(person);
        //     }
        //     console.log(this.tabelDataExcel);
      }
      // 清空上传列表
      //   v.target.value = "";
      console.log("jsonData:", jsonData);
      console.log("columnNames:", columnNames);
    };
  };
  return (
    <div>
      <input type="file" name="file" onChange={change} />
    </div>
  );
};

export default Index;
