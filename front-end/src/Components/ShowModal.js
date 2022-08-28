import React, { useEffect } from "react";
import "../CSS/modal.css";

export default function ShowModal() {
  useEffect(() => {
    const modalWrapper = document.querySelector(".modal-wrapper");
    const close = document.querySelector(".rem-close-btn");
    close.addEventListener("click", () => {
      modalWrapper.style.display = "none";
    });
  }, []);

  return (
    <>
      <div className="modal-wrapper">
        <div classNameName="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close rem-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rem-close-btn"
                data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
