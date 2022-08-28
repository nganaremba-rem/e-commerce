import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/addScroll.css";
import logo from "../images/logo.png";
// import { NavHashLink } from "react-router-hash-link";

export default function Navbar() {
  const Navigate = useNavigate();

  const [myDetail, setMyDetail] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [showSearchArea, setShowSearchArea] = useState(false);
  const mail = {
    user: localStorage.getItem("User"),
  };

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".searchDisplay") && showSearchArea) {
      setShowSearchArea(false);
    }
    return;
  });

  async function getUser() {
    if (mail.user) {
      const data = await fetch("http://localhost:3001/user", {
        method: "post",
        body: JSON.stringify(mail),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await data.json();
      setMyDetail(userData);
    }
  }
  getUser();

  const [dropdown, setDropdown] = useState(false);
  const DropDown = (e) => {
    if (dropdown && !e.target.closest("[data-drops]")) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-dropdown]")) {
      setDropdown(false);
    }
  });
  const LinkStyle = {
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: ".4rem",
    color: "white",
    mixBlendMode: "difference",
  };
  const btn = {
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: ".4rem",
  };

  const [user, setUser] = useState("");

  const logoutHandle = () => {
    localStorage.removeItem("User");
    setUser("");
    Navigate("/login");
  };

  //  Search
  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.trim() == "") {
      setShowSearchArea(false);
      return setSearchProducts([]);
    }
    console.log("ok");
    const res = await fetch("http://localhost:3001/fetchSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm,
      }),
    });
    const resJson = await res.json();
    setSearchProducts(resJson);
    setShowSearchArea(true);
  };

  return (
    <nav style={{ zIndex: "100" }}>
      <div className="brandWrapper">
        <Link
          to={"/"}
          style={
            (btn,
            { display: "flex", alignItems: "center", textDecoration: "none" })
          }>
          <div className="brandLogo">
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div
          className="searchWrapper position-relative"
          style={{
            transition: "all 0.7s ease",
          }}>
          <div className="searchIcon">
            <FontAwesomeIcon
              icon="search"
              style={{ transform: "translateY(1.3px)" }}
            />
          </div>
          <input
            onKeyUp={handleSearch}
            type="search"
            className="search"
            placeholder="Search"
            id="search-input"
          />
          {showSearchArea && (
            <div
              className="searchDisplay position-absolute"
              style={{
                top: "calc(100% + .3rem)",
                left: "0",
                zIndex: 1000,
                minWidth: "30rem",
                maxWidth: "40rem",
                overflowX: "hidden",
                maxHeight: "30rem",
                overflowY: "auto",
                borderRadius: "2rem",
                transition: "all 0.7s ease",
              }}>
              {searchProducts.length == 0 ? (
                <h3 className="text-white p-4 align-self-center">Not Found</h3>
              ) : (
                searchProducts.map((product) => {
                  return (
                    <Link
                      to={"/shop/" + product.id}
                      style={{ textDecoration: "none" }}
                      key={product.id}>
                      <div
                        className="search-item d-grid align-items-center"
                        style={{
                          gridTemplateColumns: "1fr 5fr",
                        }}>
                        <div
                          className="product-img"
                          style={{
                            width: "7rem",
                            height: "7rem",
                            overflow: "hidden",
                          }}>
                          <img
                            src={product.imageLink}
                            alt="image"
                            style={{
                              width: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              display: "block",
                              marginTop: "1.3rem",
                            }}
                          />
                        </div>
                        <div className="product-name fw-bold text-white">
                          {product.name}
                        </div>
                      </div>
                      <hr className="text-white" />
                    </Link>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      <div className="navList">
        <Link to={"/"} style={LinkStyle} className="navItem">
          <i className="fa-solid fa-house-user"></i>
          <div>Home</div>
        </Link>
        <Link to={"/shop"} style={LinkStyle} className="navItem">
          <i className="fa-solid fa-store"></i>
          <div>Shop</div>
        </Link>
        <Link to="/about" style={LinkStyle} className="navItem">
          <i className="fa-solid fa-address-card"></i>
          <div>About</div>
        </Link>
        <Link to="/cart" style={LinkStyle} className="navItem">
          <i className="fa-solid fa-cart-shopping"></i>
          <div>Cart</div>
        </Link>

        {localStorage.getItem("User") || user !== "" ? (
          <div
            data-dropdown
            className=" navItem  btn user d-flex flex-column align-items-center position-relative"
            onClick={DropDown}>
            <div className="profileWrapper text-white" style={LinkStyle}>
              <i className="fa-solid fa-user mb-2"></i>
              <div
                className="username text-white"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "5rem",
                  whiteSpace: "nowrap",
                  color: "white",
                }}>
                Profile
              </div>
            </div>
            {dropdown && (
              <div
                data-drops
                className=" position-absolute d-flex flex-column align-items-md-start gap-2"
                style={{
                  right: "0",
                  top: "110%",
                  background: "#dbdbdb",
                  padding: "1rem 2rem",
                  zIndex: "101",
                  borderRadius: ".5rem",
                }}>
                <div
                  className="name"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "10rem",
                  }}>
                  {myDetail.name}
                </div>
                <div
                  className="email text-muted"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "10rem",
                  }}>
                  {myDetail.email}
                </div>
                <button className="btn btn-danger" onClick={logoutHandle}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/login"} style={btn}>
            <div className="cart">
              <div className="cartIcon">
                <i className="fa-solid fa-right-to-bracket"></i>
                {/* <FontAwesomeIcon icon="cart-shopping" /> */}
                <div className="cartText">Login</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
