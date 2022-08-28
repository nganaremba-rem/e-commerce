const AddToCartFront = (id, quantity) => {
  return async () => {
    const myMail = localStorage.getItem("User");
    const data = await fetch("http://localhost:3001/addToCart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id.id,
        email: myMail,
        quantity: quantity,
      }),
    });
    if (data.ok) {
      alert("Added");
    }
  };
};

export default AddToCartFront;
