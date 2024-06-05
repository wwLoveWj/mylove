import React from "react";
import { Carousel } from "antd";
import styles from "../style.less";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselHistory: React.FC = () => (
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

const Index = () => {
  return (
    <div className={styles.carouselBox}>
      <div style={{ width: "300px", background: "red", opacity: "1" }}>
        <CarouselHistory />
      </div>
    </div>
  );
};
export default Index;
