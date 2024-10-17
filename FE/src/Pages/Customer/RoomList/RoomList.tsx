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
  { value: 'cba5f6b5-0d57-425a-8d6a-cd1d23b86588', label: '195/3 Hai Ba Trung, District 3' },
  { value: 'Location2', label: 'Location2' },
  { value: 'Location3', label: 'Location3' },
]

const types = [
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
  const [startDate, setStart] = useState('')
  const [endDate, setEnd] = useState('')
  const [roomList, setRoomList] = useState<any>(rooms);
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0]?.value || '');
  const [selectedType, setSelectedType] = useState<string>(types[0]?.value || '');
  // const [filterOps, setFilterOps] = useState({
  //   type: '',
  //   area: '',
  // });

  useEffect(() => {
    const date = new Date();
    const curTime = dayjs(date).set('minute', 0).add(1, 'hour').format('YYYY-MM-DDThh:mm')
    const maxTime = dayjs(date).set('hour', 0).set('minute', 0).add(30, 'day').format('YYYY-MM-DDThh:mm')
    setMax(maxTime)
    setMin(curTime)
    getTimeSpanFromSessions()
  },[]);

  useEffect(() => {
    getFilter();
  }, [roomList]);

  // const handleFilter = () => {
  //   const filteredRooms = rooms.filter((room) => {
  //     return (filterOps.type === '' || room.type === filterOps.type);
  //   });
  //   setRoomList(filteredRooms);
  // };

  // const updateFilter = (key: string, value: string | number) => {
  //   setFilterOps((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  // };

  const getFilter = async (): Promise<void> => {
    try{
      const areaId = selectedLocation;
      const roomType = selectedType;
      const start = startDate;
      const end = endDate;
      const response = await ApiGateway.GetRoomList(areaId, roomType, start, end)
      console.log(response);
      setRoomList(response)
    } catch(err){
      console.error('Error get room list :', err);
    }
  }

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

  // Handle change for location
  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };

  // Handle change for type
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
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
              <input type="datetime-local" id='start_date' min={min} max={max} value={startDate} onChange={handleStartDateChange} className='hp_date_input' />
            </div>
            <div className='search_input end'>
              <label htmlFor="end_date"><p>To</p></label>
              <input type="datetime-local" id='end_date' min={minEnd} max={max} value={endDate} onChange={handleEndDateChange} className='hp_date_input' />
            </div>
          </div>
          <div className="location-container">
            <p>Location</p>
            <select className="select" value={selectedLocation} onChange={handleLocationChange}>
              {locations.map((loc, index) => (
                <option value={`${loc.value}`} key={index}>
                  {loc.label}
                </option>
              ))}
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
          <div className="filter-btn" onClick={() => getFilter()}>Filter</div>
        </div>
        <div className="room-list-container">
          <div className="room-list">
            <div className="list">
              {rooms.map((room: any, index: number) =>
                (<Card 
                  key={room.id || index}  // Prefer room.id for key, fallback to index if room.id is undefined
                  id={room.id} 
                  img={room.images?.[0]?.url || '/default.jpg'}  // Safeguard against missing images
                  type={room.typeRoom} 
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