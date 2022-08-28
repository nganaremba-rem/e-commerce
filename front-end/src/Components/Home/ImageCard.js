import React from "react";

export default function ImageCard({ props }) {
  return (
    <div className="imageCard" style={{ width: "20rem", height: "20rem" }}>
      <div
        className="imageWrapper"
        style={{
          height: "14rem",
          width: "100%",
          overflow: "hidden",
        }}>
        <img
          style={{ width: "100%", objectFit: "cover", transform: "scale(.9)" }}
          src={props.imageLink}
          alt=""
        />
      </div>
      <div className="productDetails">
        <marquee
          className="productName fw-bold mt-2"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          {props.name}
        </marquee>
        <div className="price text-danger fw-bold">Rs {props.price}</div>
      </div>
    </div>
  );
}
