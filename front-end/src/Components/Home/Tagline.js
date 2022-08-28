import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RandomImage from "./RandomImage";
import { gsap } from "gsap";

export default function Tagline() {
  const tagline = useRef();
  const q = gsap.utils.selector(tagline);
  const tl = useRef();
  // useEffect(() => {
  //   tl.current = gsap
  //     .timeline()
  //     .from(q(".tagline"), { x: 200, duration: 1, opacity: 0 });
  // });

  return (
    <section className="front" ref={tagline}>
      <h1 className="tagline text-center">
        Don't Play With <span className="text-danger">Fire</span>, <br /> Play
        With{" "}
        <span
          className="bg-danger text-white rounded-pill"
          style={{ padding: "0rem 2rem" }}>
          Ecommerce
        </span>
      </h1>
      <RandomImage />
      <Link to={"/shop"}>
        <div className="shopNow">
          <button>Shop Now</button>
        </div>
      </Link>
    </section>
  );
}
