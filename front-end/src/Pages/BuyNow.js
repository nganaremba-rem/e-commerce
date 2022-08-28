import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import AddressModal from "../Components/AddresssModal";

export default function BuyNow() {
  const params = useParams();
  const refPayment = useRef();
  const [myProducts, setMyProducts] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [myDetail, setMyDetail] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [paymentLink, setPaymentLink] = useState("#");
  const [paymentMethod, setPaymentMethod] = useState("");
  const total = [];
  const Navigate = useNavigate();

  if (!localStorage.getItem("User")) {
    Navigate("/login?msg=Please login first");
  }

  const getProducts = async () => {
    // When it gets many id i.e the cart
    if (params.id === "cart") {
      const products = await fetch("http://localhost:3001/getUserData/carts", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("User"),
        }),
      });
      const productsJson = await products.json();
      return setAllProduct(productsJson);
    }

    // When It gets only one id
    const products = await fetch("http://localhost:3001/buyNow/" + params.id);
    const productsJson = await products.json();
    return setAllProduct(productsJson);
  };

  const getUserData = async () => {
    const userData = await fetch("http://localhost:3001/getUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("User"),
      }),
    });
    const userDataJson = await userData.json();
    setMyDetail(userDataJson);
  };

  useEffect(() => {
    getProducts();
    getUserData();
  }, []);

  useEffect(() => {
    setMyProducts(
      allProduct.map((product) => {
        const totalPrice =
          product.price * (product?.quantity || params?.quantity);
        total.push(totalPrice);
        return (
          <tr key={product.id}>
            <td className="w-50">{product.name}</td>
            <td>Rs. {product.price}</td>
            <td>{product.quantity || params.quantity}</td>
            <td>{product.id}</td>
            <td className="text-success fw-bold">
              Rs. {product.price * (product?.quantity || params?.quantity)}
            </td>
          </tr>
        );
      }),
    );
    setSubtotal(() => total.reduce((prev, current) => prev + current, 0));
  }, [allProduct]);

  const modalProp = (data) => {
    setModalShow(data);
  };
  const detailProp = (data) => {
    setMyDetail(data);
  };

  const handleSelect = (e) => {
    const parent = e.target.closest(".address-component");
    const allAddress = document.querySelectorAll(".address-component");
    allAddress.forEach((add) => {
      if (add != parent) {
        add.classList.remove("bg-success");
        add.removeAttribute("id");
      }
    });
    parent.classList.add("bg-success");
    parent.setAttribute("id", "active");
  };

  const handleDelete = async (index) => {
    const response = await fetch("http://localhost:3001/deleteAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("User"),
        index,
      }),
    });
    if (response.ok) {
      return getUserData();
    }
  };

  const location = useLocation();
  const handlePayment = async () => {
    if (subtotal == 0) {
      return alert("Please choose atlease one product");
    }
    // Validate Address
    const allAddress = document.querySelector(".addresses").children;
    const isSelected = Object.values(allAddress).find((add) => {
      return add.getAttribute("id") == "active";
    });
    if (!isSelected) {
      alert("Please select your address");
      return;
    }
    if (paymentMethod == "") {
      return alert("Please select payment method");
    }

    setSpinner(true);
    if (location.pathname == "/shop/cart/products/buyNow") {
      console.log(paymentMethod);
      if (paymentMethod == "cod") {
        return Navigate("/cart/products/confirmationPage?method=cod");
      }
      try {
        const response = await fetch(
          "http://localhost:3001/checkout-sessions",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("User"),
            }),
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        setPaymentLink(responseJson.url);

        window.location.href = responseJson.url.url;
      } catch (e) {
        console.log(e.message);
      }
      setSpinner(false);
    } else {
      const [, , id, quantity, ...rest] = JSON.stringify(
        location.pathname,
      ).split("/");
      if (paymentMethod == "cod") {
        return Navigate(`/${id}/${quantity}/confirmationPage?method=cod`);
      }
      try {
        const response = await fetch(
          "http://localhost:3001/checkout-sessions",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("User"),
              id,
              quantity,
            }),
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        window.location.href = responseJson.url.url;
      } catch (e) {
        console.log(e.message);
      }
      setSpinner(false);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      {/* Address MODAL */}
      <AddressModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleResponse={modalProp}
        handleDetail={detailProp}
      />

      <div
        className="main-wrapper mt-3  d-flex flex-column justify-content-center"
        s>
        <div className="orders shadow rounded-3 w-100">
          <h4
            className="bg-info p-4 text-white"
            style={{ borderRadius: "0 0 1rem 1rem" }}>
            Summary
          </h4>
          <div className=" p-4">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Product ID</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myProducts}
                <tr>
                  <td colSpan={100} className="p-4">
                    <h4>
                      <span className="text-muted">Subtotal:</span>
                      <span
                        className="bg-danger text-white p-1"
                        style={{ borderRadius: "2rem 1rem" }}>
                        {" "}
                        Rs. {subtotal}
                      </span>
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="shadow mt-5 rounded-3 mb-lg-5 w-100">
          <div className="delivery-address">
            <h4
              className="bg-warning p-4 text-dark"
              style={{ borderRadius: "0 0 1rem 1rem" }}>
              Delivery Address
            </h4>
            <div
              className="delivery-body-wrapper p-4"
              style={{ marginLeft: "3rem" }}>
              <div
                className="addresses d-flex gap-2"
                style={{ width: "100%", overflow: "auto" }}>
                {Object.keys(myDetail).length == 0
                  ? ""
                  : myDetail.Address.map((add, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            " address-component position-relative bg-secondary text-white p-4 rounded-3"
                          }
                          style={{ cursor: "pointer" }}
                          onClick={handleSelect}>
                          {index != 0 && (
                            <button
                              onClick={() => handleDelete(index)}
                              className="btn-close btn-close-white position-absolute"
                              style={{
                                top: ".2rem",
                                right: ".1rem",
                                fontSize: ".6rem",
                              }}></button>
                          )}

                          <div className="name fw-bold">
                            {add.name || myDetail.Name}
                          </div>
                          <div className="phone-no">
                            {add.phone || myDetail.PhoneNo}
                          </div>
                          <div className="address">
                            <div className="street">{add.address}</div>
                            <div className="pin-code">{add.pin}</div>
                            <div className="state">{add.state}</div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <button
                className="btn mt-3"
                style={{ backgroundColor: "#333", color: "white" }}
                onClick={() => setModalShow(true)}>
                Add New Delivery Address
              </button>
            </div>
          </div>
          <div className="shadow p-2">
            <div className="Myinput-group d-flex gap-1 align-items-center p-3">
              <input
                type="radio"
                name="payment"
                id="cod"
                onChange={() => setPaymentMethod("cod")}
              />
              <label htmlFor="cod">Cash on delivery</label>
            </div>
            <div className="Myinput-group d-flex gap-1 align-items-center p-3">
              <input
                type="radio"
                name="payment"
                id="online"
                onChange={() => setPaymentMethod("online")}
              />
              <label htmlFor="online">Add Debit Card/Credit Card</label>
            </div>
          </div>
          <div className="d-flex align-items-center p-4 mb-5">
            <button
              onClick={handlePayment}
              className="btn btn-danger w-25 p-3 mt-4 d-flex justify-content-between"
              style={{ marginInline: "3rem" }}
              id="payNow">
              <span>Pay Now </span>
              <span className="fw-bold" style={{ fontSize: "1.2rem" }}>
                {" "}
                Rs. {subtotal}
              </span>
            </button>
            {spinner && (
              <span className="spinner spinner-border text-primary mt-4  p-2"></span>
            )}
          </div>
          <a
            ref={refPayment}
            href={paymentLink}
            style={{ display: "none" }}></a>
        </div>
      </div>
    </>
  );
}
