import React, { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "antd";

const Index = () => {
  const [upLoadProgress, setupLoadProgress] = useState(0);
  const handleUpload = (event) => {
    let file = event.target.files[0]; //获取选中的文件
    const formData = new FormData(); //声明一个formdata对象，用于存储file文件以及其他需要传递给服务器的参数
    formData.append("userName", "admin");
    formData.append("projectId", "735136fcf95a41248cc94127f7963ea8");
    formData.append("file", file);

    console.log("formData", formData);
    let loginInfo = JSON.parse(localStorage.getItem("login-info") || `{}`);
    let token = loginInfo?.token;
    axios({
      url: "http://localhost:3007/file/upload",
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: function (progressEvent) {
        // debugger;
        //原生获取上传进度的事件
        if (progressEvent?.event?.lengthComputable) {
          //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
          //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
          //   setupLoadProgress((progressEvent.loaded / progressEvent.total) * 100); //实时获取上传进度
          setupLoadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent?.total)
          );
        }
      },
    }).then((res) => {
      //   debugger;
      console.log(res);
    });
  };
  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <p>上传进度:{upLoadProgress}</p>
      <Progress percent={upLoadProgress} status="active" />
    </div>
  );
};

export default Index;
