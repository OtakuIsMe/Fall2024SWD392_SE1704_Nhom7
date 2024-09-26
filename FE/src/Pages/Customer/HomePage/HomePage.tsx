import React,{ useState, useEffect } from 'react'
import dayjs,{ Dayjs } from 'dayjs'
import Header from '../../../Components/Header/Header'
import './HomePage.css'

const HomePage = () => {

  const [date, setdate] = useState<Dayjs>(dayjs())
  const [maxDate, setMaxDate] = useState<Dayjs>(dayjs())
  const [minate, setMinDate] = useState<Dayjs>(dayjs())

  const [user, setUser] = useState([]);

  useEffect(() => {
    setMaxDate(date.add(30, 'day'))
    console.log(maxDate)
  },[])

  return (
    <div id='hp'>
      <Header/>
      <div className='hp_banner_container'>
        <div className='hp_welcome'>
          <p>Welcome to WorkChill!</p>
          <p>User Name</p>
        </div>
      </div>
      <form className="hp_search">
        <div className="hp_input_container">
          <div className='hp_search_input start'>
            <label htmlFor="start_date"><p>From</p></label> 
            <input type="datetime-local" id='start_date'className='hp_date_input'/>
          </div>
          <div className='hp_search_input end'>
            <label htmlFor="end_date"><p>To</p></label> 
            <input type="datetime-local" id='end_date' className='hp_date_input'/>
          </div>
        </div>
        <button className='hp_comfirm'>Confirm</button>
      </form>
    </div>
  )
}

export default HomePage