import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function MyVerticallyCenteredModal(props) {
  const Navigate = useNavigate();
  const navigateToLogin = () => {
    Navigate("/login");
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className=" text-success">
          Sign Up Successful
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You have successfully signup.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={navigateToLogin}>
          Login Now
        </button>
      </Modal.Footer>
    </Modal>
  );
}
