import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../../../Components/Header/Header'
import { ApiGateway } from '../../../Api/ApiGateway'
import './RoomDetail.css'
import room1 from '../../../Assets/room1.jpg'
import room2 from '../../../Assets/room2.jpg'
import room3 from '../../../Assets/room3.jpg'
import room4 from '../../../Assets/room4.jpg'
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaWifi } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import { PiOfficeChair } from "react-icons/pi";
import { GiTheaterCurtains } from "react-icons/gi";
import { SiSocketdotio } from "react-icons/si";
import { GiDesk } from "react-icons/gi";
import { MdRoomService } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { FaTv } from "react-icons/fa";
import { FaChalkboard } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiWaterTank } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineFoodBank } from "react-icons/md";
import { RiDrinks2Fill } from "react-icons/ri";
import { MdHomeRepairService } from "react-icons/md";
import { TbCurrencyDong } from "react-icons/tb";

const RoomDetail = () => {
  const [infoSelected, setInfoSelected] = useState("info-container")
  const [typeServiceSelected, setTypeServiceSelected] = useState("food");

  const utilities = [
    {
      id: '1',
      name: "High-speed Wi-Fi"
    },
    {
      id: '2',
      name: "Adjustable lights"
    },
    {
      id: '3',
      name: "Ergonomic chair"
    },
    {
      id: '4',
      name: "Curtains"
    },
    {
      id: '5',
      name: "Standard sockets"
    },
    {
      id: '6',
      name: "Premium table desk"
    },
    {
      id: '7',
      name: "Service benefits"
    },
    {
      id: '8',
      name: "Shared utilities"
    },
    {
      id: '9',
      name: "TV"
    },
    {
      id: '10',
      name: "Whiteboard"
    },
    {
      id: '11',
      name: "Air conditioning"
    },
    {
      id: '12',
      name: "Hot water dispenser"
    }
  ]

  const handleNavbarClick = (type: string) => {
    setInfoSelected(type);
  }

  const { roomHashing } = useParams();
  useEffect(() => {
    if (roomHashing != null) {
      ApiGateway.GetRoomDetail(roomHashing);
    }
  }, [])

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

  const food = [
    {
      id: "1",
      name: "Trứng cá tầm",
      price: 20,
    },
    {
      id: "2",
      name: "Bò wagyu",
      price: 50,
    },
    {
      id: "3",
      name: "Nấm truffles",
      price: 40,
    },
    {
      id: "4",
      name: "Cua hoàng đế",
      price: 30,
    }
  ]
  const drink = [
    {
      id: "1",
      name: "Isabella’s Islay Whisky",
      price: 2,
    },
    {
      id: "2",
      name: "Billionaire Vodka",
      price: 5,
    },
    {
      id: "3",
      name: "The Macallan Valerio Adami 1926",
      price: 3,
    },
    {
      id: "4",
      name: "Dictador M-City Golden Cities Series",
      price: 4,
    },
    {
      id: "5",
      name: "Water",
      price: 200,
    },
  ]

  useEffect(() => {
    try {
      let process1 = document.querySelector(".active");
      process1?.classList.remove("active")
    } catch (error) {
      console.log(error);
    }
    if (typeServiceSelected === "food") {
      let process2 = document.querySelector(".food");
      process2?.classList.add("active");
    } else if (typeServiceSelected === "drink") {
      let process2 = document.querySelector(".drink");
      process2?.classList.add("active");
    } else if (typeServiceSelected === "amenity") {
      let process2 = document.querySelector(".amenity");
      process2?.classList.add("active");
    }
  }, [typeServiceSelected])

  const handleServiceNavbar = (type: string) => {
    setTypeServiceSelected(type);
  }

  function iconReturn(id: string) {
    switch (id) {
      case '1':
        return (<FaWifi />)
      case '2':
        return (<FaRegLightbulb />)
      case '3':
        return (<PiOfficeChair />)
      case '4':
        return (<GiTheaterCurtains />)
      case '5':
        return (<SiSocketdotio />)
      case '6':
        return (<GiDesk />)
      case '7':
        return (<MdRoomService />)
      case '8':
        return (<FaTools />)
      case '9':
        return (<FaTv />)
      case '10':
        return (<FaChalkboard />)
      case '11':
        return (<TbAirConditioning />)
      case '12':
        return (<GiWaterTank />)
    }
  }

  interface CardPSevice {
    img: string,
    name: string,
    price: number
  }

  const Card: React.FC<CardPSevice> = ({ img, name, price }) => {
    return (
      <div className="card">
        <img src={img} alt="" className="service-image" />
        <p className="name">{name}</p>
        <p className="price">{price}<TbCurrencyDong /></p>
      </div>
    )
  }

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
                      {utilities.map((utility, index) => (
                        <div className="utility" key={index}>
                          {iconReturn(utility.id)}
                          <span className="utility-name">
                            {utility.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="description-container">
                    <p className="title">Mô tả không gian làm việc</p>
                    <p className="description">
                      Chào mừng bạn đến với không gian làm việc lý tưởng, nơi mà sự sáng tạo và năng suất được khơi dậy. Nằm ở vị trí trung tâm, không gian này được thiết kế để mang đến cảm giác thoải mái và đầy cảm hứng cho tất cả mọi người.
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
            <p className="price-booking">50k/h</p>
            <div className="booking-detail">
              <div className="book-interval">
                <div className="check-in box-time">
                  <p className='title'> CHECK-IN</p>
                  <p className="time-oclock">From 16:00</p>
                </div>
                <div className="check-out box-time">
                  <p className='title'> CHECK-OUT</p>
                  <p className="time-oclock">To 16:55</p>
                </div>
              </div>
              <div className="hour-booking date">
                <p className='title'>DATE STAY IN ROOM </p>
                <span>10/04/2024 <CiCalendar /></span>
              </div>
              <div className="hour-booking date">
                <p className='title'>TOTAL TIME STAY IN ROOM </p>
                <span>1 <FaRegClock /></span>
              </div>
            </div>
            <div className="total">
              <p className="title">Your Price Sumary</p>
              <div className="Room-price line">
                <span className='title-result'>
                  Room:
                </span>
                <span className='results'>
                  100K X 1h
                </span>
              </div>
              <div className="services-price line">
                <span className='title-result'>
                  Services:
                </span>
                <span className='results'>
                  60K
                </span>
              </div>
              <div className="membsership-price line">
                <span className='title-result'>
                  Membership:
                </span>
                <span className='results'>
                  5%
                </span>
              </div>
              <div className="total-price line">
                <span className='title-result'>
                  Total Price:
                </span>
                <span className='results'>
                  152K
                </span>
              </div>
            </div>
            <button className='service-btn but'>Additional Services</button>
            <button className='book-btn but'>Request To Book</button>
          </div>
        </div>
      </div>
      <div className="service-popup">
        <div className="service-board">
          <div className="title-close">
            <div>
              <p className="title">
                Additional Services
              </p>
              <p className='short-title'>Enhance your experience with our curated range of premium services tailored to meet your unique needs.</p>
            </div>
            <RxCross2 />
          </div>
          <div className="service-content">
            <div className="services-container">
              <div className="nav-bar">
                <div className="nav food active"
                  onClick={() => {
                    handleServiceNavbar("food");
                  }}>
                  <MdOutlineFoodBank /> Food
                </div>
                <div className="nav drink"
                  onClick={() => {
                    handleServiceNavbar("drink");
                  }}>
                  <RiDrinks2Fill /> Drink
                </div>
                <div className="nav amenity"
                  onClick={() => {
                    handleServiceNavbar("amenity");
                  }}>
                  <MdHomeRepairService /> Amenity
                </div>
              </div>
              <div className="services">
                {/* {typeServiceSelected === "food" && (
                  
                )} */}
              </div>
            </div>
            <div className="booking-service">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail