import React from "react";
import "./style.less";

const Index = () => {
  return (
    <main className="table">
      <section className="header">
        <h1>个性化表格</h1>
        <div className="input-group">
          <input type="search" placeholder="Search..." />
          <img src={require("./images/search.png")} />
        </div>
      </section>
      <section className="shell">
        <table>
          <thead>
            <tr>
              <th> Id🌙 </th>
              <th> username💗</th>
              <th> location💞</th>
              <th> Last contact date💌</th>
              <th> message✉</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "001",
                location: "Korea",
                name: "lisa",
                img: require("./images/lisa.jpg"),
                time: "2023-5-14",
                action: "发消息",
              },
              {
                id: "002",
                name: "金珍妮",
                img: require("./images/金珍妮.jpg"),
                location: "Korea3",
                time: "2023-5-14",
                action: "发消息1",
              },
              {
                id: "003",
                name: "金智秀",
                img: require("./images/金智秀.jpg"),
                location: "Korea2",
                time: "2023-5-14",
                action: "发消息3",
              },
              {
                id: "004",
                name: "朴彩英",
                img: require("./images/朴彩英.jpg"),
                location: "Korea2",
                time: "2023-5-14",
                action: "发消息3",
              },

              {
                id: "005",
                name: "池秀媛",
                img: require("./images/池秀媛.jpg"),
                location: "Korea2",
                time: "2023-5-14",
                action: "发消息3",
              },
              {
                id: "006",
                name: "张娜英",
                img: require("./images/张娜英.jpg"),
                location: "Korea2",
                time: "2023-5-14",
                action: "发消息3",
              },
              {
                id: "007",
                name: "桥本环奈",
                img: require("./images/桥本环奈.jpg"),
                location: "Japan",
                time: "2023-5-14",
                action: "发消息3",
              },
              {
                id: "008",
                name: "美依礼芽",
                img: require("./images/美依礼芽.jpg"),
                location: "Japan",
                time: "2023-5-14",
                action: "发消息3",
              },
            ].map((item) => {
              return (
                <tr key={item.id}>
                  <td> {item.id} </td>
                  <td>
                    <img src={item.img} />
                    {item.name}
                  </td>
                  <td>{item.location} </td>
                  <td>{item.time} </td>
                  <td>
                    <p className="button">{item.action}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Index;
