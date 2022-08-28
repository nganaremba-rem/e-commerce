import React from "react";

export default function drops() {
  const [user, setUser] = useState("");
  const Navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("User");
    setUser("");
    Navigate("/login");
  };
  return (
    <div
      data-drops
      className=" position-absolute d-flex flex-column align-items-md-start gap-2"
      style={{
        right: "0",
        top: "110%",
        background: "#dbdbdb",
        padding: "1rem 2rem",
        zIndex: "101",
        borderRadius: ".5rem",
      }}>
      <div
        className="name"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "10rem",
        }}>
        Account Nameadskfkajsdfkjas
      </div>
      <div
        className="email text-muted"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "10rem",
        }}>
        Account email adsfhashfjadslfj
      </div>
      <button className="btn btn-danger" onClick={logoutHandle}>
        Logout
      </button>
    </div>
  );
}
