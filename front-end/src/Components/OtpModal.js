import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpModal({ handleOtpShow, ...props }) {
  const Navigate = useNavigate();
  const otp = useRef();
  const [msg, setMsg] = useState("");

  const submitOtp = async () => {
    try {
      const res = await fetch("http://localhost:3001/sendOtp/verify", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp.current.value,
        }),
      });
      if (res.ok) {
        setMsg("OTP Verified!");
        return handleOtpShow(true);
      } else {
        return setMsg("OTP Verification failed!");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Modal
      style={{ width: "20rem", marginLeft: "40%" }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className=" text-info">
          Enter OTP:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className="form-control w-75"
          ref={otp}
          type="tel"
          name="otp"
          id="otp"
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="msg">
          {msg == "OTP Verification failed!" ? (
            <span className="text-danger">{msg}</span>
          ) : (
            <span className="text-success">{msg}</span>
          )}
        </div>

        <button className="btn btn-primary" onClick={submitOtp}>
          Submit OTP
        </button>
      </Modal.Footer>
    </Modal>
  );
}
