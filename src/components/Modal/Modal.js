import React, { useState } from "react";
import "./Modal.css";

function Modal({modal,desc,toggleModal}) {


 
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
console.log("inside MOdal fumction component")
  return (
    <>
      {/* <button onClick={toggleModal} className="btn-modal">
        Open
  </button>*/}

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
                {desc}
              {console.log("inside return of Modal")}
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}
export default Modal;