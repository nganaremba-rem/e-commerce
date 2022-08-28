import React from "react";
import Navbar from "../Components/Navbar";
import AboutComponent from "../Components/AboutComponent";

export default function About() {
  const sty = {
    minHeight: "100vh",
    marginTop: ".8rem",
    background: "white",
  };
  return (
    <>
      <Navbar />
      <AboutComponent sty={sty} />
    </>
  );
}
