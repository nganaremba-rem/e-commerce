import React, { useRef } from "react";
import Footer from "../Components/Footer";
import AboutComponent from "../Components/AboutComponent";
import ImageGridComponent from "../Components/Home/ImageGridComponent";
import Newsletter from "../Components/Home/Newsletter";
import FeaturedProducts from "../Components/Home/FeaturedProducts";
import Tagline from "../Components/Home/Tagline";
import Navbar from "../Components/Navbar";
import "../CSS/home.css";

export default function Home() {
  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(
    require.context("../images", false, /\.(png|jpe?g|svg)$/),
  );
  let index = 1;
  const bg = useRef();
  console.log(images);

  // setInterval(() => {
  //   bg.current.style.backgroundImage = `url('${images[index]}')`;
  //   if (index < 9) {
  //     index++;
  //   } else {
  //     index = 0;
  //   }
  // }, 5000);

  return (
    <div className="mainContainer">
      <main>
        <div ref={bg} className="backgroundImage">
          <div className="backdrop">
            <Navbar />
            <Tagline />
          </div>
        </div>
        <FeaturedProducts />
        <Newsletter />
        <ImageGridComponent />
        <AboutComponent />
        <Footer />
      </main>
    </div>
  );
}
