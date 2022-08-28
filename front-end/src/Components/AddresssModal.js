import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function MyVerticallyCenteredModal({
  handleResponse,
  handleDetail,
  ...props
}) {
  const getUserData = async () => {
    handleResponse(false);
    const userData = await fetch("http://localhost:3001/getUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("User"),
      }),
    });
    const userDataJson = await userData.json();
    handleDetail(userDataJson);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("email", localStorage.getItem("User"));

    const res = await fetch("http://localhost:3001/addAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) {
      return await getUserData();
    } else {
      return alert("Can't add address");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="p-2 d-grid gap-3">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" id="phone" required />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" required />
          </div>
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" required />
          </div>
          <div className="input-group">
            <label htmlFor="pin">Pin</label>
            <input type="tel" name="pin" id="pin" required />
          </div>
          <div className="input-group">
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" required />
          </div>
          <button
            type="submit"
            className="btn btn-danger"
            style={{ marginTop: "2rem" }}>
            Add New Address
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
