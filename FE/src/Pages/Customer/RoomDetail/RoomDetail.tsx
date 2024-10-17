import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router'
import { ApiGateway } from '../../../Api/ApiGateway'
import { AuthenContext } from '../../../Components/AuthenContext'
import Header from '../../../Components/Header/Header'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import './RoomDetail.css'
import room1 from '../../../Assets/room1.jpg'
import room2 from '../../../Assets/room2.jpg'
import room3 from '../../../Assets/room3.jpg'
import room4 from '../../../Assets/room4.jpg'
import { FaStar, FaRegLightbulb, FaWifi, FaTools, FaTv, FaChalkboard, FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { PiOfficeChair } from "react-icons/pi";
import { GiTheaterCurtains, GiDesk, GiWaterTank } from "react-icons/gi";
import { SiSocketdotio } from "react-icons/si";
import { MdRoomService, MdOutlineFoodBank, MdHomeRepairService } from "react-icons/md";
import { TbAirConditioning, TbCurrencyDong } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { RiDrinks2Fill } from "react-icons/ri";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

dayjs.extend(duration);

const RoomDetail = () => {

  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }

  const { user } = context;

  const [roomInfo, setRoomInfo] = useState<any>([])

  const [max, setMax] = useState('')
  const [min, setMin] = useState('')
  const [minEnd, setMinEnd] = useState('')
  const [startDate, setStart] = useState('')
  const [endDate, setEnd] = useState('')

  const [infoSelected, setInfoSelected] = useState("info-container")
  const [typeServiceSelected, setTypeServiceSelected] = useState("food");
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupMsg, setOpenPopupMsg] = useState(false);

  const [bookingId, setBookingId] = useState<any>()

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

  const totalTime = (start: string, end: string) : string => {
    const startT = dayjs(start)
    const endT = dayjs(end)

    const diff = endT.diff(startT); // Calculate the difference in milliseconds
    const duration = dayjs.duration(diff);  // Create a duration object from the difference
    // Get the difference in days, hours, and minutes
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    return `${days} day(s) ${hours} hour(s)`
  }

  const totalTimeInHour = (start: string, end: string) : string => {
    const startT = dayjs(start)
    const endT = dayjs(end)

    const diff = endT.diff(startT); // Calculate the difference in milliseconds
    const duration = dayjs.duration(diff);  // Create a duration object from the difference
    // Get the difference in days, hours, and minutes
    const hours = Math.floor(duration.asHours());
    return `${hours}`
  }

  const hoursToTicks = (hour: string): number => {
    const hours = parseFloat(hour)
    const seconds = hours * 3600;
    const ticks = seconds * 10_000_000;
    return ticks;
  };

  const totalPrice = (room: string, service: string, start: string, end: string) : string => {
    const total = Number(room) * Number(totalTimeInHour(start, end)) + Number(service)
    return priceConvert(total)
  }

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startT = event.target.value
    setStart(startT);
    const endT = dayjs(startT).add(1, 'hour').format('YYYY-MM-DDTHH:mm')
    setEnd(endT);
    setMinEnd(endT);
  };

  const priceConvert = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', { style: 'decimal' }).format(amount);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value);
  };

  const handleNavbarClick = (type: string) => {
    setInfoSelected(type);
  }

  const { roomHashing } = useParams();

  interface Data {
    info: string;
  }
  const fetchRoomDetail = async (): Promise<void> => {
    if (roomHashing != null) {
      const data: Data = await ApiGateway.GetRoomDetail(roomHashing);
      setRoomInfo(data.info);
    }
  }

  const postBookingRoom = async (e : React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      const roomId = "a3f26dd6-b769-476a-8acd-6a60d01b8c9e";
      const userId = user.id;
      const bookingItemDTOs : any[] = [];
      const timeBooking = { ticks: parseInt(totalTimeInHour(startDate, endDate)) };
      const dateBooking = startDate;

      const response = await ApiGateway.BookRoom(
        userId,
        roomId,
        bookingItemDTOs,
        timeBooking,
        dateBooking
      );
      console.log('Booking successful:', response);
      setBookingId(response)
      showMessage()
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  const payBill = async () : Promise<void> => {
    if (bookingId) {
      try{
        const bookId = bookingId;
        const response = await ApiGateway.payBill(bookId);
        console.log(response);
        // window.location.href = response.;
      } catch (error) {
        console.error('Error booking room:', error);
      }
      
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const date = new Date();
    const curTime = dayjs(date).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDThh:mm')
    const maxTime = dayjs(date).set('hour', 0).set('minute', 0).add(30, 'day').format('YYYY-MM-DDThh:mm')
    setMax(maxTime)
    setMin(curTime)
    getTimeSpanFromSessions()
    fetchRoomDetail();
  }, [])
  
  useEffect(() => {
  }, [user])

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

  const getTimeSpanFromSessions = () : void => {
    const sesStartDate = sessionStorage.getItem('startDate');
    const sesEndDate = sessionStorage.getItem('endDate');
    if (sesStartDate) {
      setStart(sesStartDate)
      const endT = dayjs(sesStartDate).add(1, 'hour').format('YYYY-MM-DDTHH:mm')
      setEnd(endT);
      setMinEnd(endT);
    }
    if (sesEndDate) {
      setEnd(sesEndDate)
    }
  }

  const showMessage = () : void => {
    setOpenPopupMsg(true);
    setTimeout(() => {
      setOpenPopupMsg(false);
    }, 2000);
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
                    <p className="title">Utilities</p>
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
                    <p className="title">Workspace Description</p>
                    <p className="description">
                      Welcome to the ideal workspace, where creativity and productivity are sparked. Centrally located, this space is designed to bring comfort and inspiration to everyone.
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
          <form className="room-booking" onSubmit={postBookingRoom}>
            <p className="price-booking">{priceConvert(roomInfo.price)}VND/h</p>
            <div className="booking-detail">
              <div className="book-interval">
                <div className="check-in box-time">
                  <p className='title'>CHECK-IN</p>
                  <input className="time-oclock" min={min} max={max} type='datetime-local' value={startDate} onChange={handleStartDateChange}/>
                </div>
                <div className="check-out box-time">
                  <p className='title'>CHECK-OUT</p>
                  <input className="time-oclock" min={minEnd} max={max} type='datetime-local' value={endDate} onChange={handleEndDateChange}/>
                </div>
              </div>
              <div className="hour-booking date">
                <p className='title'>TOTAL TIME STAY IN ROOM </p>
                <span> {totalTime(startDate, endDate)} <FaRegClock /></span>
              </div>
            </div>
            <div className="total">
              <p className="title">Your Price Sumary</p>
              <div className="Room-price line">
                <span className='title-result'>
                  Room:
                </span>
                <span className='results'>
                {priceConvert(roomInfo.price)} X {totalTimeInHour(startDate, endDate)}h
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
                  {totalPrice(roomInfo.price, '0', startDate, endDate)}
                </span>
              </div>
            </div>
            <div className='service-btn but' onClick={() => setOpenPopup(true)}>Additional Services</div>
            <button className='book-btn but' type='submit'>Request To Book</button>
          </form>
        </div>
      </div>
      <div className="service-popup" style={!openPopup ? {display: "none"}:{display: "flex"}}>
        <div className="service-board">
          <div className="title-close" onClick={() => setOpenPopup(false)}>
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
                
              </div>
            </div>
            <div className="booking-service">

            </div>
          </div>
        </div>
      </div>
      <div className="service-popup" style={!openPopupMsg ? {display: "none"}:{display: "flex"}}>
        <div className="noti">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 20 20"><path fill="#4DB051" d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z"/></svg>
          <p>Booking successful!</p>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail