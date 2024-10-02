import React, { useState, useEffect, useRef } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Header from '../../../Components/Header/Header'
import Banner2 from '../../../Assets/banner2.jpg'
import Worker from '../../../Assets/working.jpg'
import PB from '../../../Assets/p&b.png'
import Membership from '../../../Assets/membership.png'
import WorkPod from '../../../Assets/workpod.png'
import Meeting from '../../../Assets/meeting.png'
import ScrollDownButton from '../../../Components/ScrollDownButton/ScrollDownButton';
import './HomePage.css'

const HomePage: React.FC = () => {

  const [date, setdate] = useState<Dayjs>(dayjs())
  const [maxDate, setMaxDate] = useState<Dayjs>(dayjs())
  const [minate, setMinDate] = useState<Dayjs>(dayjs())
  const [mouseInCard1, setMouseInCard1] = useState(false)
  const [mouseInCard2, setMouseInCard2] = useState(false)
  const [mouseInCard3, setMouseInCard3] = useState(false)

  const [user, setUser] = useState([]);

  const firstDivRef   = useRef<HTMLDivElement | null>(null);
  const secondDivRef  = useRef<HTMLDivElement | null>(null);
  const thirdDivRef   = useRef<HTMLDivElement | null>(null);
  const fourthDivRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMaxDate(date.add(30, 'day'))
  }, [])

  return (
    <div id='hp'>
      <Header />
      <div ref={firstDivRef} className='hp_banner_container hp_section'>
        <div className="hp_banner"></div>
        <div className='hp_welcome'>
          <p>Welcome to WorkChill!</p>
          <p>User Name</p>
        </div>
        <form className="hp_search">
          <div className="hp_input_container">
            <div className='hp_search_input start'>
              <label htmlFor="start_date"><p>From</p></label>
              <input type="datetime-local" id='start_date' className='hp_date_input' />
            </div>
            <div className='hp_search_input end'>
              <label htmlFor="end_date"><p>To</p></label>
              <input type="datetime-local" id='end_date' className='hp_date_input' />
            </div>
          </div>
          <button className='hp_comfirm'>Confirm</button>
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
            <img className='main' src={Banner2} alt="banner" height={424} width={600}/>
            <img className='sub' src={Worker} alt="banner" height={200} width={200}/>
          </div>
        </div>
        <div className="hp_welcome_footer">
          <ScrollDownButton ref={thirdDivRef} title="Scroll Down"/>
        </div>
      </div>
      <div ref={thirdDivRef} className="hp_area_display hp_section">
        <h1>Location</h1>
        <div className="hp_area_wrapper">
          <div className="area_card card1">
            <div className="area_info">
              <h3>Location</h3>
              <p>Hẻm 195/3 Hai Bà Trưng, p.6, Quận 3, TP.HCM</p>
            </div>
          </div>
          <div className="area_card card2">
            <div className="area_info">
              <h3>Location</h3>
              <p>Hẻm 195/3 Hai Bà Trưng, p.6, Quận 3, TP.HCM</p>
            </div>
          </div>
          <div className="area_card card3">
            <div className="area_info">
              <h3>Location</h3>
              <p>Hẻm 195/3 Hai Bà Trưng, p.6, Quận 3, TP.HCM</p>
            </div>
          </div>
        </div>
        <div className="hp_down_page">
          <ScrollDownButton ref={fourthDivRef} title="Scroll Down"/>
        </div>
      </div>
      <div ref={fourthDivRef} className="hp_room_display hp_section">
        <h1>Our Workspace</h1>
        <div className="room_type_wrapper">
          <div className="hp_room" style={{backgroundColor: '#FEF3CE'}}>
            <div className="room_desc">
              <h2>F&B space</h2>
              <p>An open space with a diverse menu of food and drinks, featuring a modern and airy design, it is an ideal place to meet and chat with partners and colleagues.</p>
            </div>
            <div className="image_container" style={{backgroundColor: 'white'}}>
              <img src={PB} alt="" />
            </div>
          </div>
          <div className="hp_room" style={{backgroundColor: '#FDFBFA'}}>
            <div className="room_desc">
              <h2>Membership area</h2>
              <p>A professional workspace for individuals and organizations. Members have access to premium desks, ergonomic chairs, smart check-in systems, and many other amenities to support their work.</p>
            </div>
            <div className="image_container" style={{backgroundColor: 'white'}}>
              <img src={Membership} alt="" />
            </div>
          </div>
          <div className="hp_room" style={{backgroundColor: '#FDFBFA'}}>
            <div className="room_desc">
              <h2>WorkPod</h2>
              <p>A quiet and private space with a soundproofing and acoustic treatment system that blocks up to 70% of external noise, suitable for tasks requiring high concentration and confidentiality: interviews, online meetings, consultations, etc.</p>
            </div>
            <div className="image_container" style={{backgroundColor: 'white'}}>
              <img src={WorkPod} alt="" />
            </div>
          </div>
          <div className="hp_room" style={{backgroundColor: '#FEF3CE'}}>
            <div className="room_desc">
              <h2>Meeting room</h2>
              <p>The meeting rooms, with various capacities (4-10 people), are equipped with modern facilities and surrounded by lush greenery, making meetings both professional and inspiring.</p>
            </div>
            <div className="image_container" style={{backgroundColor: 'white'}}>
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