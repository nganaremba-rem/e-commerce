import React from "react";
import roundedLogo from "../images/roundedLogo.png";

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="firstFooterItem">
          <div
            className="footer-img-wrapper"
            style={{
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              overflow: "hidden",
            }}>
            <img
              src={roundedLogo}
              alt=""
              style={{
                height: "100%",
                aspectRatio: 16 / 9,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <div className="copyright">
            Copyright &copy; 2022 Lei B-U. All Rights Reserved
          </div>
        </div>
        <div className="footerCategories">
          <ul className="footerCategoryItem">
            <li>Home</li>
            <li>About</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="footerCategories">
          <ul className="footerCategoryItem">
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        <div className="footerCategories d-flex flex-column justify-content-center">
          <ul className="footerCategoryItem d-flex gap-3 align-items-center">
            <li>
              <i className="fa-brands fa-facebook h4"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter h4"></i>
            </li>
            <li>
              <i className="fa-brands fa-instagram h4"></i>
            </li>
            <li>
              <i className="fa-brands fa-whatsapp h4"></i>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
