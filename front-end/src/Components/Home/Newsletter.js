import React, { useRef } from "react";
import { gsap } from "gsap";

export default function Newsletter() {
  const text = useRef();
  return (
    <section className="third">
      <div>
        <h1 className="newsletter" ref={text}>
          Get updates and special offer. Subscribe Now!
        </h1>
      </div>
      <div className="subscribe">
        <input type="email" name="email" id="email" />
        <button>Subscribe</button>
      </div>
    </section>
  );
}
