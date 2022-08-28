import React, { useState, useEffect } from "react";

export default function BillingAddress() {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState();

  async function getUserData() {
    const response = await fetch("http://localhost:3001/getUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("User"),
      }),
    });

    const userObject = await response.json();
    setUser(userObject);
  }
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setUserData(
      <div className="billing-address">
        <div className="title fw-bold">Billing Address</div>
        <div className="name text-muted">{user.Name}</div>
        <div className="address text-muted">
          <div className="street">
            {Object.keys(user).length == 0 ? "" : user.Address[0].address}
          </div>
          <div className="phone-no">{user.PhoneNo}</div>
          <div className="pin-code">
            {Object.keys(user).length == 0 ? "" : user.Address[0].address}
          </div>
        </div>
      </div>,
    );
  }, [user]);

  return <>{userData}</>;
}
