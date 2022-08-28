import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductItem({ handleToast, item }) {
  const Navigate = useNavigate();

  const addToCart = async (e) => {
    e.preventDefault();
    const myMail = localStorage.getItem("User");
    if (!myMail) Navigate("/login?msg=Please login first");
    try {
      const data = await fetch("http://localhost:3001/addToCart", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          email: myMail,
          quantity: 1,
        }),
      });
      if (data.ok) {
        handleToast(true);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Link
      to={`/shop/${item.id}`}
      style={{ textDecoration: "none", color: "black" }}>
      <div className="product-card" style={{ width: "21rem", height: "20rem" }}>
        <div className="product-img">
          <img src={item.imageLink} alt="Image" loading="lazy" />
          <div className="add-to-cart" onClick={addToCart}>
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
        <div className="product-body">
          <h6 className="product-title">{item.name}</h6>
          <p className="product-price text-danger fw-bold">Rs. {item.price}</p>
        </div>
      </div>
    </Link>
  );
}
