import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import POD1 from '../../../Assets/1POD.jpg'
import POD2 from '../../../Assets/2POD.jpg'
import POD4 from '../../../Assets/4POD.jpg'
import POD8 from '../../../Assets/work_room_8.jpg'
import './RoomList.css'
import Header from '../../../Components/Header/Header'
import Card from '../../../Components/Card/Card';

const locations = [
  { value: 'Location1', label: 'Location1' },
  { value: 'Location2', label: 'Location2' },
  { value: 'Location3', label: 'Location3' },
]

const types = [
  { value: 'Type1', label: 'Type1' },
  { value: 'Type2', label: 'Type2' },
  { value: 'Type3', label: 'Type3' },
]

const rooms = [
  { id: '1', img: POD1, type: 'Single POD 1', price: 50 },
  { id: '2', img: POD2, type: 'Double POD 1', price: 80 },
  { id: '3', img: POD4, type: 'Four POD 1', price: 90 },
  { id: '4', img: POD8, type: 'Meeting POD 1', price: 120 },
  { id: '5', img: POD1, type: 'Single POD 1', price: 50 },
  { id: '6', img: POD2, type: 'Double POD 1', price: 80 },
  { id: '7', img: POD4, type: 'Four POD 1', price: 90 },
]

const RoomList: React.FC = () => {

  const [max, setMax] = useState('')
  const [min, setMin] = useState('')
  const [minEnd, setMinEnd] = useState('')
  const [startDate, setStart] = useState('')
  const [endDate, setEnd] = useState('')
  const [roomList, setRoomList] = useState(rooms);
  const [filterOps, setFilterOps] = useState({
    type: '',
    area: '',
  });

  useEffect(() => {
    getTimeSpanFromSessions()
  },[]);

  useEffect(() => {
    handleFilter(); 
  }, [filterOps]);

  const handleFilter = () => {
    const filteredRooms = rooms.filter((room) => {
      return (filterOps.type === '' || room.type === filterOps.type);
    });
    setRoomList(filteredRooms);
  };

  const updateFilter = (key: string, value: string | number) => {
    setFilterOps((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    const startT = event.target.value
    setStart(startT);
    const endT = dayjs(startT).add(1, 'hour').format('YYYY-MM-DDTHH:mm')
    setEnd(endT);
    setMinEnd(endT);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    setEnd(event.target.value);
  };

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

  return (
    <>
      <Header isTransparent={false} />
      <div id="rooms">
        <div className="filter-bar">
          <div className="filter-btn"><FilterAltOutlinedIcon />Filter</div>
          <div className="location-container">
            <p>Location</p>
            <div className="select">
              {locations.map((loc, index) => (
                <label htmlFor={loc.label}>
                  <div className='choose' key={index}>
                    {loc.label}
                    <input id={loc.label} type='checkbox' />
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="type-container">
            <p>Type</p>
            <div className="select">
              {types.map((ty, index) => (
                <label htmlFor={ty.label}>
                  <div className='choose' key={index}>
                    {ty.label}
                    <input id={ty.label} type='checkbox' />
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="date-container">
            <p>Timespan</p>
            <div className='search_input start'>
              <label htmlFor="start_date"><p>From</p></label>
              <input type="datetime-local" id='start_date' min={min} max={max} value={startDate} onChange={handleStartDateChange} className='hp_date_input' />
            </div>
            <div className='search_input end'>
              <label htmlFor="end_date"><p>To</p></label>
              <input type="datetime-local" id='end_date' min={minEnd} max={max} value={endDate} onChange={handleEndDateChange} className='hp_date_input' />
            </div>
          </div>
        </div>
        <div className="room-list-container">
          <div className="room-list">
            <div className="list">
              {rooms.map((room, index) =>
                (<Card key={index} id={room.id} img={room.img} type={room.type} price={room.price} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomList