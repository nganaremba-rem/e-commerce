import React, { useState, useRef } from "react";

export default function CartItem({ handleChange, ...props }) {
  const spinner = useRef();
  const email = localStorage.getItem("User");
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:3001/getUserData/carts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const arrData = await data.json();
      handleChange(arrData);
    } catch (e) {
      console.log(e);
    }
  };

  const updateToDatabase = async (id, quantity) => {
    const response = await fetch("http://localhost:3001/addToCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        email,
        quantity,
      }),
    });
  };

  const handleTotal = (index, id) => {
    let quanti = document.querySelectorAll("[data-quan]")[index];
    quanti = parseInt(quanti.value);
    let price = document.querySelectorAll("[data-price")[index];
    price = parseInt(price.textContent);
    const total = document.querySelectorAll("[data-total]")[index];
    total.textContent = price * quanti;
    updateToDatabase(id, quanti);
  };

  const deleteItem = async (itemId) => {
    spinner.current.classList.remove("d-none");
    return fetch("http://localhost:3001/deleteCartItem", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemId,
        email: localStorage.getItem("User"),
      }),
    }).then((res) => {
      getData();
      spinner.current.classList.add("d-none");
    });
  };

  return (
    <tr id={props.id} key={props.id}>
      <td
        style={{
          maxWidth: "10rem",
          overflow: "hidden",
        }}>
        <div
          className="img"
          style={{
            width: "7rem",
            height: "7rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
          <img
            src={props.imageLink}
            alt=""
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
        <marquee
          className="product-name"
          style={{
            maxWidth: "10rem",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}>
          {props.name}
        </marquee>
      </td>
      <td>
        Rs. <span data-price>{props.price}</span>
      </td>
      <td>
        <select
          data-quan
          onChange={() => handleTotal(props.index, props.id)}
          className="form-control"
          style={{ width: "5rem" }}
          name="quantity"
          id="quantity"
          defaultValue={props.quantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </td>
      <td>
        Rs.{" "}
        <span data-total name="total" id="total">
          {props.price * props.quantity}
        </span>
      </td>
      <td className="position-relative">
        <button onClick={() => deleteItem(props.id)} className="btn btn-danger">
          Delete
        </button>
        <span
          ref={spinner}
          className="mt-4 spinner-border text-danger  position-absolute d-none"
          style={{ top: "25%", left: "70%" }}
          role={"status"}></span>
      </td>
    </tr>
  );
}
