import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import Header from '../../../Components/Header/Header'
import Banner2 from '../../../Assets/banner2.jpg'
import Office1 from '../../../Assets/office1.jpg'
import Office2 from '../../../Assets/office2.jpg'
import Office3 from '../../../Assets/office3.jpg'
import Worker from '../../../Assets/working.jpg'
import PB from '../../../Assets/p&b.png'
import Membership from '../../../Assets/membership.png'
import WorkPod from '../../../Assets/workpod.png'
import Meeting from '../../../Assets/meeting.png'
import ScrollDownButton from '../../../Components/ScrollDownButton/ScrollDownButton';
import './HomePage.css'
import { AuthenContext } from '../../../Components/AuthenContext'

const HomePage: React.FC = () => {
  
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }

  const { user } = context;

  const navigate = useNavigate()

  const [max, setMax] = useState('')
  const [min, setMin] = useState('')
  const [minEnd, setMinEnd] = useState('')
  const [startDate, setStart] = useState('')
  const [endDate, setEnd] = useState('')

  const firstDivRef = useRef<HTMLDivElement | null>(null);
  const secondDivRef = useRef<HTMLDivElement | null>(null);
  const thirdDivRef = useRef<HTMLDivElement | null>(null);
  const fourthDivRef = useRef<HTMLDivElement | null>(null);

  const navigateToDetails = (locationId: string) => {
    navigate(`/areadetails/${locationId}`);
  };

  const officeList = [
    { img: Office1, location: '195/3 Hai Ba Trung, Ward 6, Distirct 3, HCM City' },
    { img: Office2, location: '195/3 Hai Ba Trung, Ward 6, Distirct 3, HCM City' },
    { img: Office3, location: '195/3 Hai Ba Trung, Ward 6, Distirct 3, HCM City' },
  ]

  const search = () => {
<<<<<<< HEAD
    navigate('/roomslist')
=======
    navigate('/roomlist')
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
    sessionStorage.setItem('startDate', startDate)
    sessionStorage.setItem('endDate', endDate)
  }

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startT = event.target.value
    setStart(startT);
    const endT = dayjs(startT).add(1, 'hour').format('YYYY-MM-DDTHH:mm')
    setEnd(endT);
    setMinEnd(endT);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value);
  };

  useEffect(() => {},[user])

  useEffect(() => {
    const date = new Date();
    const curTime = dayjs(date).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDThh:mm')
    const endTime = dayjs(date).set('minute', 0).add(2, 'hour').format('YYYY-MM-DDThh:mm')
    const maxTime = dayjs(date).set('hour', 0).set('minute', 0).add(30, 'day').format('YYYY-MM-DDThh:mm')
    setStart(curTime)
    setEnd(endTime)
    setMax(maxTime)
    setMin(curTime)
    setMinEnd(curTime)
  }, [])

  return (
    <div id='hp'>
      <Header isTransparent={true} />
      <div ref={firstDivRef} className='hp_banner_container hp_section'>
        <div className="hp_banner"></div>
        <div className='hp_welcome'>
          <p>Welcome to WorkChill!</p>
          {user ? 
            <p>Hello {user.username}!</p>
          :
            <p>User name</p>
          }  
        </div>
        <form className="hp_search">
          <div className="hp_input_container">
            <div className='hp_search_input start'>
              <label htmlFor="start_date"><p>From</p></label>
              <input type="datetime-local" id='start_date' min={min} max={max} value={startDate} onChange={handleStartDateChange} className='hp_date_input' />
            </div>
            <div className='hp_search_input end'>
              <label htmlFor="end_date"><p>To</p></label>
              <input type="datetime-local" id='end_date' min={minEnd} max={max} value={endDate} onChange={handleEndDateChange} className='hp_date_input' />
            </div>
          </div>
          <button className='hp_comfirm' onClick={() => search()}>Check</button>
        </form>
        <ScrollDownButton ref={secondDivRef} title="Scroll Down" />
      </div>
      <div ref={secondDivRef} className="hp_welcome_display hp_section">
        <div className="hp_welcome_left hp_welcome_content">
          <div className="hp_welcome_left_inner hp_welcome_content_inner">
            <h3>Welcome!</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et architecto, explicabo quo quae ducimus obcaecati? Veritatis autem odit nulla in reprehenderit adipisci, at culpa aut quis sapiente, deserunt laudantium nam!</p>
          </div>
        </div>
        <div className="hp_welcome_right hp_welcome_content">
          <div className="hp_welcome_right_inner hp_welcome_content_inner">
            <img className='main' src={Banner2} alt="banner" height={424} width={600} />
            <img className='sub' src={Worker} alt="banner" height={200} width={200} />
          </div>
        </div>
        <div className="hp_welcome_footer">
          <ScrollDownButton ref={thirdDivRef} title="Scroll Down" />
        </div>
      </div>
      <div ref={thirdDivRef} className="hp_area_display hp_section">
        <h1>Location</h1>
        <div className="hp_area_wrapper">
          {officeList.map<React.ReactNode>((office, index) => (
            <div
              key={index}
              className={`area_card card${index + 1}`}
              onClick={() => { navigateToDetails(`${index + 1}`) }}
              style={{ backgroundImage: `url(${office.img})` }}
            >
              <div className="area_info">
                <h3>Location</h3>
                <p>{office.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hp_down_page">
          <ScrollDownButton ref={fourthDivRef} title="Scroll Down" />
        </div>
      </div>
      <div ref={fourthDivRef} className="hp_room_display hp_section">
        <h1>Our Workspace</h1>
        <div className="room_type_wrapper">
          <div className="hp_room" style={{ backgroundColor: '#FEF3CE' }}>
            <div className="room_desc">
              <h2>F&B space</h2>
              <p>An open space with a diverse menu of food and drinks, featuring a modern and airy design, it is an ideal place to meet and chat with partners and colleagues.</p>
            </div>
            <div className="image_container" style={{ backgroundColor: 'white' }}>
              <img src={PB} alt="" />
            </div>
          </div>
          <div className="hp_room" style={{ backgroundColor: '#FDFBFA' }}>
            <div className="room_desc">
              <h2>Membership area</h2>
              <p>A professional workspace for individuals and organizations. Members have access to premium desks, ergonomic chairs, smart check-in systems, and many other amenities to support their work.</p>
            </div>
            <div className="image_container" style={{ backgroundColor: 'white' }}>
              <img src={Membership} alt="" />
            </div>
          </div>
          <div className="hp_room" style={{ backgroundColor: '#FDFBFA' }}>
            <div className="room_desc">
              <h2>WorkPod</h2>
              <p>A quiet and private space with a soundproofing and acoustic treatment system that blocks up to 70% of external noise, suitable for tasks requiring high concentration and confidentiality: interviews, online meetings, consultations, etc.</p>
            </div>
            <div className="image_container" style={{ backgroundColor: 'white' }}>
              <img src={WorkPod} alt="" />
            </div>
          </div>
          <div className="hp_room" style={{ backgroundColor: '#FEF3CE' }}>
            <div className="room_desc">
              <h2>Meeting room</h2>
              <p>The meeting rooms, with various capacities (4-10 people), are equipped with modern facilities and surrounded by lush greenery, making meetings both professional and inspiring.</p>
            </div>
            <div className="image_container" style={{ backgroundColor: 'white' }}>
              <img src={Meeting} alt="" />
            </div>
          </div>
        </div>
        <div className="room_type_list">

        </div>
      </div>
    </div>
  )
}

export default HomePage