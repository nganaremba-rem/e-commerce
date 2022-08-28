import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import BillingAddress from "../Components/BillingAddress";
import "../CSS/confirmation.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function ConfirmationPage() {
  window.scrollTo(0, 0);
  const [productDetails, setProductDetails] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const toPrint = useRef();
  const [method, setMethod] = useState("");
  useEffect(() => {
    const search = new URLSearchParams(location.search);
    setMethod(search.get("method"));
    const pathname = location.pathname;
    const id = pathname.split("/")[1];
    const quantity = pathname.split("/")[2];
    if (id == "cart") {
      async function getCarts() {
        const carts = await fetch("http://localhost:3001/getUserData/carts", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("User"),
          }),
        });
        const cartsJson = await carts.json();
        setData(cartsJson);
      }
      getCarts();
    } else {
      async function getProduct() {
        const cart = await fetch("http://localhost:3001/getProducts/" + id);
        const cartJson = await cart.json();
        cartJson.quantity = quantity;
        setData([cartJson]);
      }
      getProduct();
    }
  }, []);

  function downloadReceipt() {
    html2canvas(toPrint.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("Receipt.pdf");
    });
  }

  useEffect(() => {
    setProductDetails(
      data.map((prod) => {
        setTotal((prev) => {
          return prev + prod.price * prod.quantity;
        });
        return (
          <div key={prod.id}>
            <h6 className="product-name">{prod.name}</h6>
            <div className="orderSubtotal row" style={{ marginLeft: "2rem" }}>
              <div className="subtotal col-2 text-muted">Subtotal</div>
              <div className="col-10 fw-bold">
                Rs {prod.price * prod.quantity}
              </div>
            </div>
            <hr />
          </div>
        );
      }),
    );
  }, [data]);

  return (
    <>
      <Navbar></Navbar>
      <div className="mainWrapper mt-4 d-flex justify-content-center">
        <div
          ref={toPrint}
          className=" w-50 shadow mb-5"
          style={{ borderRadius: "5rem", overflow: "hidden" }}>
          <h1
            id="orderConfirm"
            className="text-center text-white p-3 bg-success font-italic">
            Order Confirmed
          </h1>
          <div
            className="order-summary p-4 m-4"
            style={{
              borderRadius: "3rem",
              background: "#F3F6FA",
              maxHeight: "30rem",
              overflow: "auto",
            }}>
            {productDetails}
            <div className="ml-5 row" style={{ marginLeft: "2rem" }}>
              <div className="text-muted col-2">Total</div>
              <div className="h5 fw-bold col-10">Rs. {total}</div>
            </div>
          </div>
          <div className="address-payment d-flex justify-content-between p-5 m-4">
            <BillingAddress />
            <div className="payment">
              <div className="payment-method fw-bold">Payment Method</div>
              <div className="method text-muted">
                {method === "cod" ? "Cash on delivery" : "Online Payment"}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={downloadReceipt}
          className="btn btn-danger position-absolute"
          style={{
            marginLeft: "50%",
            transform: "translateX(-50%)",
            borderRadius: "1000vmax",
            right: "22%",
            top: "21%",
          }}>
          Download Receipt
        </button>
      </div>
    </>
  );
}
