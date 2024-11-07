import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import './RequestModal.css'

dayjs.extend(duration);

interface PopupType {
  type: string;
  booking: any;
  closePopup: () => void;
  approveBooking?: (id: string) => Promise<void>;
  declineBooking?: (id: string) => Promise<void>;
}

const Modal:React.FC<PopupType> = ({type, booking, closePopup, approveBooking, declineBooking}) => {

  const handleApprove = () => {
    if(approveBooking){
      approveBooking(booking?.id)
    }
  }

  const handleDecline = () => {
    if(declineBooking){
      declineBooking(booking?.id)
    }
  }

  const totalTimeInHour = (start: string, end: string): number => {
    const startT = dayjs(start)
    const endT = dayjs(end)

    const diff = endT.diff(startT);
    const duration = dayjs.duration(diff); 
    
    const hours = Math.floor(duration.asMinutes());
    return hours
  }

  const convertToHoursAndMins = (min: number) : string => {
    const hours = Math.floor(min/60)
    const mins = min % 60;
    
    return `${hours}h ${mins}m`
  }

  useEffect(() => {
    console.log(booking)
  },[]);

  switch (type) {
    case "approve":
      return (
        <div id="booking_modal" style={{display: "static"}}>
          <div className="modal">
            <div className="popup-header">
              <p>Approve User <b>{booking?.user}</b>'s Request</p>
            </div>
            <div className="modal-content">
              <div className="content">
                <p><b>User</b>: {booking.user}</p>
                <p><b>Email</b>: {booking.email}</p>
                <p><b>Room</b>: {booking.room}</p>
                <p><b>Pay Method</b>: {booking.isPay === "Unpaid" ? "COD" : "Paypal"}</p>
                <div className="timeline">
                  <p>Timeline</p>
                  <div className="period">
                    <span><b>Start</b>: {booking.start}</span>
                    -
                    <span><b>End</b>: {booking.end}</span>
                  </div>
                  <p><b>Timespan:</b> {convertToHoursAndMins(totalTimeInHour(booking.start, booking.end))}</p>
                </div>
                <div className="total"><b>Total:</b> <p>{booking.total.toLocaleString('en-US')} VND</p></div>
              </div>
            </div>
            <div className="modal-btns">
              <div className="modal-cancel btn" onClick={closePopup}>Cancel</div>
              <div className="modal-confirm btn" onClick={handleApprove}>Confirm</div>
            </div>
          </div>
        </div>
      );

    case 'decline':
      return (
        <div id="booking_modal" style={{display: "static"}}>
          <div className="modal">
            <div className="popup-header">
              <p>Decline User <b>{booking?.user}</b>'s Request</p>
            </div>
            <div className="modal-content">
            <div className="content">
                <p><b>User</b>: {booking.user}</p>
                <p><b>Email</b>: {booking.email}</p>
                <p><b>Room</b>: {booking.room}</p>
                <p><b>Pay Method</b>: {booking.isPay === "Unpaid" ? "COD" : "Paypal"}</p>
                <div className="timeline">
                  <p>Timeline</p>
                  <div className="period">
                    <span><b>Start</b>: {booking.start}</span>
                    -
                    <span><b>End</b>: {booking.end}</span>
                  </div>
                  <p><b>Timespan:</b> {convertToHoursAndMins(totalTimeInHour(booking.start, booking.end))}</p>
                </div>
                <div className="total"><b>Total:</b> <p>{booking.total.toLocaleString('en-US')} VND</p></div>
              </div>
            </div>
            <div className="modal-btns">
              <div className="modal-cancel btn" onClick={closePopup}>Cancel</div>
              <div className="modal-confirm btn" onClick={handleDecline}>Confirm</div>
            </div>
          </div>
        </div>
      );
  }
  
};

export default Modal;
