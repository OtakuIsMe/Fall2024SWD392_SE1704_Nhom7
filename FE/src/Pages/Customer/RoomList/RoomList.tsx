import React, { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import POD1 from '../../../Assets/1POD.jpg'
import POD2 from '../../../Assets/2POD.jpg'
import POD4 from '../../../Assets/4POD.jpg'
import POD8 from '../../../Assets/work_room_8.jpg'
import './RoomList.css'
import Header from '../../../Components/Header/Header'
import Card from '../../../Components/Card/Card';
import { ApiGateway } from '../../../Api/ApiGateway'

const locations = [
  { value: '', label: '--' },
  { value: 'cba5f6b5-0d57-425a-8d6a-cd1d23b86588', label: '195/3 Hai Ba Trung, District 3' },
  { value: 'cba5f6b5-0d57-425a-8d6a-cd1d23b86588', label: 'Location2' },
  { value: 'cba5f6b5-0d57-425a-8d6a-cd1d23b86588', label: 'Location3' },
]

const types = [
  { value: '', label: '--' },
  { value: '0', label: 'Meeting POD' },
  { value: '1', label: 'Single POD' },
  { value: '2', label: 'Double POD' },
  { value: '3', label: 'Fourth POD' },
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
  const [startDate, setStart] = useState(sessionStorage.getItem('startDate')||'')
  const [endDate, setEnd] = useState(sessionStorage.getItem('endDate') || '')
  const [roomList, setRoomList] = useState<any>(rooms);
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]?.value || '');
  const [selectedType, setSelectedType] = useState<string>(types[0]?.value || '');
  const [areaList, setAreaList] = useState<any>()

  useEffect(() => {
    const date = new Date();
    const curTime = dayjs(date).add(1, 'day').set('minute', 0).set('hour', 7).format('YYYY-MM-DDThh:mm')
    const maxTime = dayjs(date).set('hour', 0).set('minute', 0).add(30, 'day').format('YYYY-MM-DDThh:mm')
    setMax(maxTime)
    setMin(curTime)
    getTimeSpanFromSessions()
    getAreaList()
    getFilter();
  },[]);

  const getAreaList = async (): Promise<void> => {
    try {
      const response = await ApiGateway.GetArea();
      setAreaList(response)
    } catch (error) {
      console.error("Error getting AreaList", error)
      throw error
    }
  }

  const getFilter = async (): Promise<void> => {
    try{
      const areaId = selectedLocation;
      const roomType = selectedType;
      const start = (startDate === 'Invalid Date' ? '' : startDate);
      const end = (endDate === 'Invalid Date' ? '' : endDate);
      const response = await ApiGateway.GetRoomList(areaId, roomType, start, end)
      setRoomList(response)
    } catch(err){
      console.error('Error get room list :', err);
    }
  }

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let startT = event.target.value;
    
    let startDateTime = dayjs(startT);
    const startMinutes = startDateTime.minute();
    startDateTime = startMinutes <= 30 
      ? startDateTime.minute(0) 
      : startDateTime.add(1,'hour').minute(0);
    startT = startDateTime.format('YYYY-MM-DDTHH:mm');

    let endDateTime = startDateTime.add(1, 'hour');
    const endMinutes = endDateTime.minute();
    endDateTime = endMinutes <= 30 
      ? endDateTime.minute(0) 
      : endDateTime.add(1, 'hour').minute(0);
    const endT = endDateTime.format('YYYY-MM-DDTHH:mm');
  
    setStart(startT);
    sessionStorage.setItem('startDate', startT);
  
    if (dayjs(endDate).isBefore(startT) || dayjs(endDate).isSame(startT)) {
      setEnd(endT);
      sessionStorage.setItem('endDate', endT);
    }
  
    setMinEnd(endT);
  };
  
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let endT = event.target.value;
  
    let endDateTime = dayjs(endT);
    const endMinutes = endDateTime.minute();
    endDateTime = endMinutes <= 30 
      ? endDateTime.minute(0) 
      : endDateTime.add(1,'hour').minute(0);
    endT = endDateTime.format('YYYY-MM-DDTHH:mm');
  
    if (dayjs(endT).isBefore(minEnd)) {
      setEnd(minEnd);
    } else {
      setEnd(endT);
      sessionStorage.setItem('endDate', endT);
    }
  };

  const preventKeyboardInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
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

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
    console.log(event.target.value)
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    console.log(event.target.value)
  };

  return (
    <>
      <Header isTransparent={false} />
      <div id="rooms">
        <div className="filter-bar">
          <div className="filter"><FilterAltOutlinedIcon />Filter</div>
          <div className="date-container">
            <p>Timespan</p>
            <div className='search_input start'>
              <label htmlFor="start_date"><p>From</p></label>
              <input
                id='start_date'
                className='hp_date_input'
                type="datetime-local"
                min={min}
                max={max}
                value={startDate}
                onChange={handleStartDateChange}
                onKeyDown={preventKeyboardInput}
              />
            </div>
            <div className='search_input end'>
              <label htmlFor="end_date"><p>To</p></label>
              <input
                id='end_date'
                className='hp_date_input'
                type="datetime-local"
                min={minEnd}
                max={max}
                value={endDate}
                onChange={handleEndDateChange}
                onKeyDown={preventKeyboardInput}
              />
            </div>
          </div>
          <div className="location-container">
            <p>Location</p>
            <select className="select" value={selectedLocation} onChange={handleLocationChange}>
              <option value={''}></option>
              {areaList?.map((area: any, index: number) =>
                <option value={area.id} key={index}> 
                  {area.name}
                </option>
              )}
            </select>
          </div>
          <div className="type-container">
            <p>Type</p>
            <select className="select" value={selectedType} onChange={handleTypeChange}>
              {types.map((ty, index) => (
                <option value={`${ty.value}`} key={index}>
                  {ty.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-btn" onClick={() =>getFilter()}>Filter</div>
        </div>
        <div className="room-list-container">
          <div className="room-list">
            <div className="list">
              {roomList?.map((room: any, index: number) =>
                (<Card 
                  key={index}
                  id={room.id} 
                  img={room.images?.[0]?.url || '/default.jpg'}
                  type={room.name} 
                  price={room.price} 
              />)
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomList