import React from "react";

export default function AboutComponent(props) {
  return (
    <section className="fifth" style={props.sty}>
      <h1 className="about">About Us</h1>
      <div className="aboutDescription">
        Welcome to codeBreak, your number one source for all things like shoes,
        bags, dog treats etc. We're dedicated to giving you the very best of
        product, with a focus on three characteristics, ie: dependability,
        customer service and uniqueness. Founded in 2022 by Nganaremba,
        Jenitkumar & Pramesh, codeBreak has come a long way from its beginnings
        . We now serve customers all over place in Manipur and are thrilled to
        be a part of the quirky, eco-friendly, fair trade wing of the fashion,
        baked goods, watches industry. We hope you enjoy our products as much as
        we enjoy offering them to you. If you have any questions or comments,
        please don't hesitate to contact us.
      </div>
    </section>
  );
}
