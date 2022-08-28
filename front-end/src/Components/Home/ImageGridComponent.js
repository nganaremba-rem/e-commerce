import React from "react";

export default function ImageGridComponent() {
  return (
    <section className="fourth">
      <img id="spanImage" src="https://picsum.photos/600/600" alt="" />

      <img src={`https://loremflickr.com/300/300?random=1`} alt="" />
      <img src={`https://loremflickr.com/300/300?random=2`} alt="" />
      <img src={`https://loremflickr.com/300/300?random=3`} alt="" />
      <img src={`https://loremflickr.com/300/300?random=4`} alt="" />
    </section>
  );
}
