import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

export default function FeaturedProducts() {
  //
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function getImage() {
      const prodsPromise = await fetch("http://localhost:3001/getProducts");
      const prodsJson = await prodsPromise.json();
      const randomNumbers = [];
      for (let i = 0; i < 20; i++) {
        let random = Math.floor(Math.random() * Object.keys(prodsJson).length);
        while (randomNumbers.find((num) => num == random))
          random = Math.floor(Math.random() * Object.keys(prodsJson).length);
        randomNumbers.push(random);
      }
      const prodArrObj = randomNumbers.map((rand) => prodsJson[rand]);
      const myImg = prodArrObj.map((obj) => {
        return (
          <Link key={uuid()} className="linkCompo" to={`/shop/${obj.id}`}>
            {" "}
            <ImageCard key={obj.id} props={obj} />
          </Link>
        );
      });
      setImages(myImg);
    }
    getImage();
  }, []);
  //
  // const featuredProducts = () => {
  //   let featureProdsID = [];
  //   for (let i = 1; i <= 20; i++) {
  //     featureProdsID.push(i);
  //   }
  //   return featureProdsID.map((prod) => {
  //     return (
  //       <Link className="linkCompo" to={`/shop/${prod}`}>
  //         {" "}
  //         <ImageCard key={prod} prod={prod} />{" "}
  //       </Link>
  //     );
  //   });
  // };
  // next btn function
  function next() {
    const imageCardClientWidth =
      document.querySelector(".imageCard").clientWidth;
    let imageScrollerOffsetWidth =
      document.querySelector(".imageScroller").offsetWidth;
    document.querySelector(".imageScroller").scrollLeft +=
      imageScrollerOffsetWidth - imageCardClientWidth;
  }
  // previous btn function
  function prev() {
    const imageCardClientWidth =
      document.querySelector(".imageCard").clientWidth;
    let imageScrollerOffsetWidth =
      document.querySelector(".imageScroller").offsetWidth;
    document.querySelector(".imageScroller").scrollLeft -=
      imageScrollerOffsetWidth - imageCardClientWidth;
  }

  // MAIN RETURN
  return (
    <section className="second">
      <h1 className="featuredProducts">Featured Products</h1>
      <div className="carouselImages">
        <button
          style={{ zIndex: 100 }}
          className="carouselBtn"
          id="prevBtn"
          onClick={prev}>
          <i
            className="fa-solid fa-angle-left"
            style={{ fontSize: "2rem" }}></i>
        </button>
        <div className="imageScroller">{images.map((img) => img)}</div>
        <button className="carouselBtn" id="nextBtn" onClick={next}>
          <i
            className="fa-solid fa-angle-right"
            style={{ fontSize: "2rem" }}></i>
        </button>
      </div>
    </section>
  );
}
