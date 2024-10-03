import React, { useEffect, useState } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import POD1 from '../../../Assets/work_room_1.jpg'
import POD2 from '../../../Assets/work_room_2.jpg'
import POD4 from '../../../Assets/work_room_4.jpg'
import POD8 from '../../../Assets/work_room_8.jpg'
import './RoomList.css'
import Header from '../../../Components/Header/Header'
import Card from '../../../Components/Card/Card';

const RoomList:React.FC = () => {

  const locations =[
    {value: 'Location1', label: 'Location1'},
    {value: 'Location2', label: 'Location1'},
    {value: 'Location3', label: 'Location1'},
  ]

  const types =[
    {value: 'Type1', label: 'Type1'},
    {value: 'Type2', label: 'Type2'},
    {value: 'Type3', label: 'Type3'},
  ]

  const rooms = [
    {img: POD1, type: 'Single POD 1', price: 50 },
    {img: POD2, type: 'Double POD 1', price: 80 },
    {img: POD4, type: 'Four POD 1', price: 90 },
    {img: POD8, type: 'Meeting POD 1', price: 120 },
  ]

  return (
    <>
      <Header isTransparent={false}/>
      <div id="rooms">
        <div className="filter-bar">
          <div className="location-container">
            <p>Location: </p>
            <select name='locations' id='locations'>
              {locations.map((loc, index) => (
                  <option key={index} value={loc.value}>{loc.label}</option>
              ))}
            </select>
          </div>
          <div className="type-container">
            <p>Type: </p>
            <select name='locations' id='locations'>
              {types.map((ty, index) => (
                  <option key={index} value={ty.value}>{ty.label}</option>
              ))}
            </select>
          </div>
          <div className="date-container">
            <div className='search_input start'>
              <label htmlFor="start_date"><p>From</p></label>
              <input type="datetime-local" id='start_date' className='hp_date_input' />
            </div>
            <div className='search_input end'>
              <label htmlFor="end_date"><p>To</p></label>
              <input type="datetime-local" id='end_date' className='hp_date_input' />
            </div>
          </div>
          <div className="filter-btn"><FilterAltOutlinedIcon/></div>
        </div>
        <div className="room-list-container">
          <div className="room-list">
            <div className="list">
              {rooms.map((room, index) =>
                (<Card key={index} img={room.img} type={room.type} price={room.price}/>)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomList