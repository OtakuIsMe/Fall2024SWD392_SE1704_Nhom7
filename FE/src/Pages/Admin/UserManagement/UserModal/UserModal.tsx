import React, { ReactNode, useState } from "react";
import './UserModal.css'

interface PopupType {
  closeModal: () => void;
}
const Modal:React.FC<PopupType> = ({closeModal}) => {
  return (
    <div id="my_modal" style={{display: "static"}}>
      <div className="modal">
        <div className="popup-header">
          <h1>Add User</h1>
        </div>
        <div className="modal-content">
          <div className="content">
            
          </div>
        </div>
        <div className="modal-btns">
          <div className="modal-cancel btn">Cancel</div>
          <div className="modal-confirm btn">Confirm</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
