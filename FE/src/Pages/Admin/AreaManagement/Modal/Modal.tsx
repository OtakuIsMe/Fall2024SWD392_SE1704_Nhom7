import React, { ReactNode, useState } from "react";
import './Modal.css'

interface PopupType {
  popupType: string;
  // open: boolean;
  // onClose: () => void;
  children: ReactNode;
}
const Modal:React.FC<PopupType> = ({popupType, children}) => {
  return (
    <div id="my_modal" style={{display: "static"}}>
      <div className="modal">
        <div className="popup-header">
          <h1>{popupType?  popupType : 'Modal'}</h1>
        </div>
        <div className="modal-content">
          <div className="content">
            {children}
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
