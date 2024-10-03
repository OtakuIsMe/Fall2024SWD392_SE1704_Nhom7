import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import './RoomDetail.css'
import room1 from '../../../Assets/room1.jpg'
import room2 from '../../../Assets/room2.jpg'
import room3 from '../../../Assets/room3.jpg'
import room4 from '../../../Assets/room4.jpg'
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const RoomDetail = () => {
  const [infoSelected, setInfoSelected] = useState("info-container")

  const handleNavbarClick = (type: string) => {
    setInfoSelected(type);
  }

  useEffect(() => {
    try {
      let process1 = document.querySelector(".selected");
      process1?.classList.remove("selected")
    } catch (error) {
      console.log(error);
    }
    if (infoSelected === "info-container") {
      let process2 = document.querySelector(".info-container");
      process2?.classList.add("selected");
    } else if (infoSelected === "schedule") {
      let process2 = document.querySelector(".schedule");
      process2?.classList.add("selected");
    } else if (infoSelected === "comments") {
      let process2 = document.querySelector(".comments");
      process2?.classList.add("selected");
    }
  }, [infoSelected])

  return (
    <div id="room-detail-page">
      <Header isTransparent={false} />
      <div className="room-detail">
        <div className="room-images">
          <div className="main-image">
            <img src={room1} alt="" />
          </div>
          <div className="others-image">
            <div className="child-image">
              <img src={room2} alt="" />
            </div>
            <div className="child-image">
              <img src={room3} alt="" />
            </div>
            <div className="child-image">
              <img src={room4} alt="" />
            </div>
          </div>
        </div>
        <div className="room-detail-container">
          <div className="room-info">
            <div className="name-ratings">
              <p className='room-name'>Room 101</p>
              <div className='ratings-area'>
                <FaStar className='star' /> 5
                <GoDotFill className='dot' /> Coworking Space
              </div>
            </div>
            <div className="nav-bar">
              <div className="nav info-container" onClick={() => { handleNavbarClick("info-container") }}>
                Thông tin
              </div>
              <div className="nav schedule" onClick={() => { handleNavbarClick("schedule") }}>
                Lịch Book
              </div>
              <div className="nav comments" onClick={() => { handleNavbarClick("comments") }}>
                Đánh giá
              </div>
            </div>
            {infoSelected === "info-container" && (
              <React.Fragment>
                <div className="info-room">
                  <div className="utilities-container">
                    <p className="title">Các tiện nghi</p>
                    <div className="utilities">

                    </div>
                  </div>
                  <div className="description-container">
                    <p className="title">Mô tả</p>
                    <p className="description">

                    </p>
                  </div>
                </div>
              </React.Fragment>
            )}
            {infoSelected === "schedule" && (
              <React.Fragment>
                <div className="info-schedule">

                </div>
              </React.Fragment>
            )}
            {infoSelected === "comments" && (
              <React.Fragment>
                <div className="info-comments">

                </div>
              </React.Fragment>
            )}
          </div>

          <div className="room-booking">

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail