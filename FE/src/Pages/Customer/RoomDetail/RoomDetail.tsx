import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams } from 'react-router'
import { ApiGateway } from '../../../Api/ApiGateway'
import { AuthenContext } from '../../../Components/AuthenContext'
import Header from '../../../Components/Header/Header'
import ItemCard from '../../../Components/ItemCard/ItemCard'
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
import { TbAirConditioning } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { RiDrinks2Fill } from "react-icons/ri";
import SelectedItemCard from '../../../Components/SelectedItem/SelectedItemCard';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

dayjs.extend(duration);

const RoomDetail = () => {
  const calendarRef = useRef(null);

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
  const [typeNumberServiceSelected, setTypeNumberServiceSelected] = useState('0');
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupMsg, setOpenPopupMsg] = useState(false);
  const [schedule, setSchedule] = useState<any>([]);


  const [payment, setPayment] = useState<string>('COD')

  const [serviceListType1, setServiceListType1] = useState<ServiceData[]>([])
  const [serviceListType2, setServiceListType2] = useState<ServiceData[]>([])
  const [serviceListType3, setServiceListType3] = useState<ServiceData[]>([])

  interface SelectedItem {
    service: ServiceData;
    amount: number;
  }
  const [selectedItemList, setSelectedItemList] = useState<SelectedItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [totalService, setTotalService] = useState(0)

  const handleDateChange = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const view = calendarApi.view;
      const start = view.currentStart;
      const end = view.currentEnd;
      fetchRoomSchedule(formatDateToYYYYMMDD(start), formatDateToYYYYMMDD(end));
    } else {
      console.error("calendarRef is not set.");
    }
  };

  function formatPeriod(startDate: string, timeBooking: string): string {
    const start = new Date(startDate);
    const [hours, minutes, seconds] = timeBooking.split(':').map(Number);

    const end = new Date(start);
    end.setHours(start.getHours() + hours, start.getMinutes() + minutes, start.getSeconds() + seconds);

    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedStart = start.toLocaleTimeString([], options);
    const formattedEnd = end.toLocaleTimeString([], options);

    return `${formattedStart} - ${formattedEnd}`;
  }

  const fetchRoomSchedule = async (startDate: string, endDate: string) => {
    const data = await ApiGateway.ScheduleRoom(startDate, endDate, roomHashing);
    setSchedule(data);
  }

  function formatDateToYYYYMMDD(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function CalcEndDate(startDate: string, timeBooking: string): string {
    const start = new Date(startDate);
    const [hours, minutes, seconds] = timeBooking.split(':').map(Number);

    // Add hours, minutes, and seconds from timeBooking to start date
    start.setHours(start.getHours() + hours);
    start.setMinutes(start.getMinutes() + minutes);
    start.setSeconds(start.getSeconds() + seconds);

    // Format the result as YYYY-MM-DDTHH:MM:SS
    const year = start.getFullYear();
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const day = String(start.getDate()).padStart(2, '0');
    const hoursStr = String(start.getHours()).padStart(2, '0');
    const minutesStr = String(start.getMinutes()).padStart(2, '0');
    const secondsStr = String(start.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  const events = schedule.map((booking: any) => ({
    title: `${formatPeriod(booking.dateBooking, booking.timeBooking)}`,
    start: `${booking.dateBooking}`,
    end: `${CalcEndDate(booking.dateBooking, booking.timeBooking)}`,
    color: '#d9d2ff',
  }));


  function renderEventContent(eventInfo: any) {
    return (
      <div className='event'>
        <p className='title'>{eventInfo.event.title}</p>
      </div>
    );
  }

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


  const totalTime = (start: string, end: string): string => {
    const startT = dayjs(start)
    const endT = dayjs(end)

    const diff = endT.diff(startT); // Calculate the difference in milliseconds
    const duration = dayjs.duration(diff);  // Create a duration object from the difference
    // Get the difference in days, hours, and minutes
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    return `${days} day(s) ${hours} hour(s)`
  }

  const totalTimeInHour = (start: string, end: string): string => {
    const startT = dayjs(start)
    const endT = dayjs(end)

    const diff = endT.diff(startT); // Calculate the difference in milliseconds
    const duration = dayjs.duration(diff);  // Create a duration object from the difference
    // Get the difference in days, hours, and minutes
    const hours = Math.floor(duration.asHours());
    return `${hours}`
  }

  const totalPrice = (room: string, service: string, start: string, end: string, services: number): string => {
    const total = Number(room) * Number(totalTimeInHour(start, end)) + Number(service) + services
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

  interface ServiceData {
    index: number;
    id: string;
    image: string;
    type: number;
    name: string;
    price: number;
  }
  function createData(
    index: number,
    id: string,
    image: string,
    type: number,
    name: string,
    price: number,
  ): ServiceData {
    return { index, id, image, type, name, price };
  }

  const { roomHashing } = useParams();

  interface Data {
    info: string;
  }
  const fetchRoomDetail = async (): Promise<void> => {
    if (roomHashing != null) {
      const data: Data = await ApiGateway.GetRoomDetail(roomHashing);
      setRoomInfo(data);
    }
  }

  const postBookingRoom = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (roomHashing != null) {
      try {
        const roomId = roomHashing;
        const userId = user.id;
        const bookingItemDTOs: any[] = selectedItemList.map(item => ({
          itemsId: item.service.id,
          amount: item.amount
        }))
        const timeHourBooking = parseInt(totalTimeInHour(startDate, endDate));
        const dateBooking = startDate;

        const response = await ApiGateway.BookRoom(
          userId,
          roomId,
          bookingItemDTOs,
          timeHourBooking,
          dateBooking
        );
        console.log('Booking successful:', response);
        payBill(response);
        console.log(bookingItemDTOs);
      } catch (error) {
        console.error('Error booking room:', error);
      }
    }
  };

  const payBill = async (bookingId: any): Promise<void> => {
    try {
      const bookId = bookingId;
      if (payment === 'COD') {
        const response = await ApiGateway.payCOD(bookId);
        console.log(response);
        setOpenPopupMsg(false);
      } else if (payment === 'Paypal') {
        const response = await ApiGateway.payBill(bookId);
        window.location.href = response.message;
      }
    } catch (error) {
      console.error('Error booking room:', error);
    }
  }

  const fetchServices = async (): Promise<void> => {
    try {
      const response = await ApiGateway.GetServices();
      const rowData1: ServiceData[] = [];
      const rowData2: ServiceData[] = [];
      const rowData3: ServiceData[] = [];

      response.forEach((row: any, index: number) => {
        const serviceData = createData(index, row.amenityService.id, row.amenityService.image.url, row.amenityService.type, row.amenityService.name, row.amenityService.price);
        if (row.amenityService.type === 0) {
          rowData1.push(serviceData);
        } else if (row.amenityService.type === 1) {
          rowData2.push(serviceData);
        } else if (row.amenityService.type === 2) {
          rowData3.push(serviceData);
        }
      });
      setServiceListType1(rowData1);
      setServiceListType2(rowData2);
      setServiceListType3(rowData3);
      console.log(rowData1)
    } catch (err) {
      console.error('Error getting service list:', err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedItemList([])
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
    const total = selectedItemList.reduce((total, item) => total + (item.service.price * item.amount), 0);
    setTotalService(total);
  }, [selectedItemList]);

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
    } else if (typeServiceSelected === "device") {
      let process2 = document.querySelector(".device");
      process2?.classList.add("active");
    }
  }, [typeServiceSelected])

  const handleServiceNavbar = (type: string) => {
    setTypeServiceSelected(type);
    if (type === 'food') {
      setTypeNumberServiceSelected('0')
    } else if (type === 'drink') {
      setTypeNumberServiceSelected('1')
    } else if (type === 'device') {
      setTypeNumberServiceSelected('2')
    }
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

  const getTimeSpanFromSessions = (): void => {
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

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPayment(e.target.value)
  }

  const handleAddItem = (service: ServiceData) => {
    const index = service.index.toString();

    setQuantities((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 1,
    }));

    setSelectedItemList((prev) => {
      const existingItem = prev.find(item => item.service.index === service.index);
      if (existingItem) {
        return prev.map(item =>
          item.service.id === service.id ? { ...item, amount: item.amount + 1 } : item
        );
      } else {
        return [...prev, { service, amount: 1 }];
      }
    });
    console.log(selectedItemList);
  };

  const handleRemoveItem = (service: ServiceData) => {
    const index = service.index.toString();

    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max((prev[index] || 0) - 1, 0),
    }));

    setSelectedItemList((prev) => {
      return prev
        .map(item => (item.service.id === service.id ? { ...item, amount: Math.max(item.amount - 1, 0) } : item))
        .filter(item => item.amount > 0);
    });
    console.log(selectedItemList);
  };

  return (
    <div id="room-detail-page">
      <Header isTransparent={false} />
      <div className="room-detail">
        <div className="room-images">
          <div className="main-image">
            <img src={roomInfo?.images?.[3]?.url || room1} alt="" />
          </div>
          <div className="others-image">
            <div className="child-image">
              <img src={roomInfo?.images?.[2]?.url || room2} alt="" />
            </div>
            <div className="child-image">
              <img src={roomInfo?.images?.[1]?.url || room3} alt="" />
            </div>
            <div className="child-image">
              <img src={roomInfo?.images?.[0]?.url || room4} alt="" />
            </div>
          </div>
        </div>
        <div className="room-detail-container">
          <div className="room-info">
            <div className="name-ratings">
              <p className='room-name'>{roomInfo.name}</p>
              <div className='ratings-area'>
                <FaStar className='star' /> 5
                <GoDotFill className='dot' /> Coworking Space
              </div>
            </div>
            <div className="nav-bar">
              <div className="nav info-container" onClick={() => { handleNavbarClick("info-container") }}>
                Infomation
              </div>
              <div className="nav schedule" onClick={() => { handleNavbarClick("schedule") }}>
                Book Arrangement
              </div>
              <div className="nav comments" onClick={() => { handleNavbarClick("comments") }}>
                Feedback
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
                  <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                    initialView="timeGridWeek"
                    slotMinTime="07:00:00"
                    slotMaxTime="18:00:00"
                    events={events}
                    headerToolbar={{
                      start: 'prev,next today',
                      center: 'title',
                      end: 'timeGridWeek'
                    }}
                    eventDisplay="block"
                    eventContent={renderEventContent}
                    allDaySlot={false}
                    datesSet={handleDateChange}
                  />
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
            <p className="price-booking">{priceConvert(roomInfo?.price)}VND/h</p>
            <div className="booking-detail">
              <div className="book-interval">
                <div className="check-in box-time">
                  <p className='title'>CHECK-IN</p>
                  <input className="time-oclock" min={min} max={max} type='datetime-local' value={startDate} onChange={handleStartDateChange} />
                </div>
                <div className="check-out box-time">
                  <p className='title'>CHECK-OUT</p>
                  <input className="time-oclock" min={minEnd} max={max} type='datetime-local' value={endDate} onChange={handleEndDateChange} />
                </div>
              </div>
              <div className="hour-booking date">
                <p className='title'>TOTAL TIME STAY IN ROOM </p>
                <span> {totalTime(startDate, endDate)} <FaRegClock /></span>
              </div>
              <div className="payment-method">
                <p className="title">PAYMENT METHOD</p>
                <div className="method">
                  <label>
                    <input type="radio" name='method' value="COD" checked={payment === 'COD'} onChange={handlePaymentChange} />
                    <span>COD</span>
                  </label>
                  <label>
                    <input type="radio" name='method' value="Paypal" checked={payment === 'Paypal'} onChange={handlePaymentChange} />
                    <span>Paypal</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="total">
              <p className="title">Your Price Sumary</p>
              <div className="Room-price line">
                <span className='title-result'>
                  Room:
                </span>
                <span className='results'>
                  {priceConvert(roomInfo?.price)} X {totalTimeInHour(startDate, endDate)}h
                </span>
              </div>
              <div className="services-price line">
                <span className='title-result'>
                  Services:
                </span>
                <span className='results'>
                  {priceConvert(totalService)}
                </span>
              </div>
              <div className="membsership-price line">
                <span className='title-result'>
                  Membership:
                </span>
                <span className='results'>
                  0%
                </span>
              </div>
              <div className="total-price line">
                <span className='title-result'>
                  Total Price:
                </span>
                <span className='results'>
                  {totalPrice(roomInfo?.price, '0', startDate, endDate, totalService)}
                </span>
              </div>
            </div>
            <div className='service-btn but' onClick={async () => { await fetchServices(), setOpenPopup(true) }}>Additional Services</div>
            <div className='but' onClick={() => setOpenPopupMsg(true)} >Request To Book</div>
            <div className="service-popup" style={!openPopupMsg ? { display: "none" } : { display: "flex" }}>
              <div className="noti">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 20 20"><path fill="#4DB051" d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20m-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10z" /></svg>
                <p>Confirm booking</p>
                <div className="total" style={{ margin: "0", width: "100%" }}>
                  <div className="Room-price line">
                    <span className='title-result'>
                      Room:
                    </span>
                    <span className='results'>
                      {priceConvert(roomInfo?.price)} X {totalTimeInHour(startDate, endDate)}h
                    </span>
                  </div>
                  <div className="services-price line">
                    <span className='title-result'>
                      Services:
                    </span>
                    <span className='results'>
                      {priceConvert(totalService)}
                    </span>
                  </div>
                  <div className="membsership-price line">
                    <span className='title-result'>
                      Membership:
                    </span>
                    <span className='results'>
                      0%
                    </span>
                  </div>
                  <div className="total-price line">
                    <span className='title-result'>
                      Total Price:
                    </span>
                    <span className='results'>
                      {totalPrice(roomInfo?.price, '0', startDate, endDate, totalService)}
                    </span>
                  </div>
                </div>
                <div className='form-btns'>
                  <div onClick={() => setOpenPopupMsg(false)}>Cancel</div>
                  <button type='submit'>Confirm</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="service-popup" style={!openPopup ? { display: "none" } : { display: "flex" }}>
        <div className="service-board">
          <div className="title-close">
            <div>
              <p className="title">
                Additional Services
              </p>
              <p className='short-title'>Enhance your experience with our curated range of premium services tailored to meet your unique needs.</p>
            </div>
            <RxCross2 onClick={() => setOpenPopup(false)} />
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
                <div className="nav device"
                  onClick={() => {
                    handleServiceNavbar("device");
                  }}>
                  <MdHomeRepairService /> Device
                </div>
              </div>
              <div className="services">
                {typeNumberServiceSelected === '0' ?
                  serviceListType1.map((service) =>
                    <ItemCard id={service.index.toString()} img={service.image} name={service.name} price={service.price} type={service.type}>
                      <div className='quatity'>
                        <div className="minus" onClick={() => handleRemoveItem(service)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M19 12.998H5v-2h14z" /></svg>
                        </div>
                        <p>{quantities[service.index.toString()] || 0}</p>
                        <div className='plus' onClick={() => handleAddItem(service)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="black" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                        </div>
                      </div>
                    </ItemCard>
                  )
                  :
                  typeNumberServiceSelected === '1' ?
                    serviceListType2.map((service) =>
                      <ItemCard id={service.index.toString()} img={service.image} name={service.name} price={service.price} type={service.type}>
                        <div className='quatity'>
                          <div className="minus" onClick={() => handleRemoveItem(service)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M19 12.998H5v-2h14z" /></svg>
                          </div>
                          <p>{quantities[service.index.toString()] || 0}</p>
                          <div className='plus' onClick={() => handleAddItem(service)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="black" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                          </div>
                        </div>
                      </ItemCard>
                    )
                    :
                    serviceListType3.map((service) =>
                      <ItemCard id={service.index.toString()} img={service.image} name={service.name} price={service.price} type={service.type}>
                        <div className='quatity'>
                          <div className="minus" onClick={() => handleRemoveItem(service)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M19 12.998H5v-2h14z" /></svg>
                          </div>
                          <p>{quantities[service.index.toString()] || 0}</p>
                          <div className='plus' onClick={() => handleAddItem(service)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="black" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" /></svg>
                          </div>
                        </div>
                      </ItemCard>
                    )
                }
              </div>
            </div>
            <div className="booking-service">
              <div className="services">
                <div className="item-container">
                  {selectedItemList.map(service =>
                    <SelectedItemCard service={service.service} amount={service.amount} />
                  )}
                </div>
              </div>
              <div className="service-total">
                <div>
                  <div>Total:</div>
                  <div>
                    {priceConvert(totalService)}
                    VND
                  </div>
                </div>
                <div className="confirm">
                  <div className='confirm-btn' onClick={() => { setOpenPopup(false) }}>Confirm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail