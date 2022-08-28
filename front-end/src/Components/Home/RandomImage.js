import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
export default function RandomImage() {
  const [images, setImages] = useState([]);

  const img = useRef();
  const q = gsap.utils.selector(img);
  const tl = useRef();

  useEffect(() => {
    async function getImage() {
      const prodsPromise = await fetch("http://localhost:3001/getProducts");
      const prodsJson = await prodsPromise.json();
      const randomNumbers = [];
      for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * Object.keys(prodsJson).length);
        while (randomNumbers.find((num) => num == random))
          random = Math.floor(Math.random() * Object.keys(prodsJson).length);
        randomNumbers.push(random);
      }
      const prodArrObj = randomNumbers.map((rand) => prodsJson[rand]);
      const myImg = prodArrObj.map((obj) => {
        return (
          <Link key={obj.id} to={`/shop/${obj.id}`}>
            <div
              className="image-wrapper mb-5"
              style={{
                width: "10rem",
                height: "10rem",
                overflow: "hidden",
                borderRadius: "3rem",
                border: "10px solid grey",
                boxShadow: "0 4px 10px 10px rgba(0,0,0,.3)",
              }}>
              <img
                src={obj.imageLink}
                alt={obj.name}
                key={obj.id}
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  borderRadius: "2.4rem",
                }}
              />
            </div>
          </Link>
        );
      });
      setImages(myImg);
    }
    getImage();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      q(".image-wrapper"),
      {
        y: 10,
        stagger: 0.1,
        opacity: 0,
        duration: 1,
      },
      {
        y: 0,
        opacity: 1,
      },
    );
  });

  return (
    <div ref={img} className="randomImages">
      {images.map((image) => image)}
    </div>
  );
}
