import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../CSS/shop.css";
import Footer from "../Components/Footer";
import ProductLinkItem from "../Components/shop/ProductLinkItem";
import { Toast } from "react-bootstrap";

export default function Shop() {
  const [myData, setMyData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // GET PRODUCTS

  const getData = async () => {
    setSpinner(true);
    try {
      console.log("Getting Data");
      const products = await fetch("http://localhost:3001/getProducts");
      const productsJson = await products.json();
      setCurrentData(productsJson);
      setMainData(productsJson);
      setSpinner(false);
    } catch (e) {
      console.log(e);
    }
  };

  // SORTING

  const sortHandler = (e) => {
    const value = e.target.value;
    const sortH2L = () => {
      const sorted = currentData.sort((a, b) => b.price - a.price);
      setCurrentData(() => sorted);
      renderMe();
    };

    const sortL2H = () => {
      const sorted = currentData.sort((a, b) => a.price - b.price);
      setCurrentData(() => sorted);
      renderMe();
    };

    if (value === "priceH2L") {
      sortH2L();
    } else if (value === "priceL2H") {
      sortL2H();
    } else if (value === "") {
      normalSort();
    }
  };

  // FILTER
  const filter = (id) => {
    const filterNow = (id) => {
      const filteredItems = mainData.filter((item) => item.category == id);
      setCurrentData(() => filteredItems);
      renderMe();
    };
    id == "all" ? getData() : filterNow(id);
  };

  const filterHandle = (e) => {
    const toggle = () => {
      const items = document.querySelectorAll(".categories-item");
      items.forEach((item) => {
        item.classList.remove("active-category");
      });
      e.target.classList.add("active-category");
    };
    toggle();
    document.querySelector("#sort").value = "";

    const id = e.target.id;
    filter(id);
  };

  // NORMAL SORT
  const normalSort = () => {
    renderMe();
  };

  const toastInfo = (data) => {
    setShowToast(data);
  };

  const renderMe = () => {
    window.scrollTo(0, 0);
    setMyData(() =>
      currentData.map((item) => (
        <ProductLinkItem handleToast={toastInfo} item={item} key={item.id} />
      )),
    );
  };

  // when component mounts
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    renderMe();
  }, [currentData]);

  return (
    <>
      <Navbar />
      <div className="shop mb-lg-5">
        {/* TOAST */}
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          style={{
            position: "fixed",
            top: "0%",
            right: "0",
            zIndex: 1000,
          }}>
          <Toast.Header
            style={{ padding: "1rem 2rem" }}
            className="bg-info text-white">
            <h4 className="me-auto">Added to cart</h4>
          </Toast.Header>
        </Toast>
        {/*  */}
        <section className="sidebar">
          <h3>Categories</h3>
          <ul onClick={(e) => filterHandle(e)}>
            <li className="categories-item active-category" id="all">
              All
            </li>
            <li className="categories-item" id="Shoes">
              Shoes
            </li>
            <li className="categories-item" id="Books">
              Books
            </li>
            <li className="categories-item" id="Beauty">
              Beauty
            </li>
            <li className="categories-item" id="Baby">
              Baby
            </li>
            <li className="categories-item" id="Clothing&Accessories">
              Clothing & Accessories
            </li>
          </ul>
        </section>
        <section className="main-section">
          <div className="operations">
            <div className="sort">
              <select
                onChange={sortHandler}
                className="form-select mb-3"
                aria-label="form-select-lg example"
                defaultValue={""}
                id="sort">
                <option value="" disabled>
                  Sort By
                </option>
                <option value="priceH2L">Price: High to Low</option>
                <option value="priceL2H">Price: Low to High</option>
              </select>
            </div>
          </div>
          <main className="products">
            {spinner ? (
              <span
                className=" spinner-border text-danger"
                role={"status"}
                style={{ fontSize: "20rem" }}>
                <span className="sr-only">Loading...</span>
              </span>
            ) : (
              myData
            )}
          </main>
        </section>
      </div>
      <Footer />
    </>
  );
}
