import React, { useEffect, useState } from 'react'
import './RoomManagement.css'
import TableTpl from '../../../Components/Table/Table';
import { ApiGateway } from '../../../Api/ApiGateway';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import Modal from './RoomModal/RoomModal';

const RoomManagement: React.FC = () => {

  const [ roomList, setRoomList ] = useState<any>([])
  const [ isModalAddOpen, setIsModalAddOpen ] = useState(false);
  const [ isModalEditOpen, setIsModalEditOpen ] = useState(false);
  const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState(false);

  const [ room, setRoom ] = useState<any>();

  interface Data {
    id: string;
    image?: string;
    type: string;
    name: string;
    price: number;
    description: string;
    status: string;
  }
  function createData(
    id: string,
    image: string,
    type: string,
    name: string,
    price: number,
    description: string,
    status: string,
  ): Data {
    return { id, image, type, name, price, description, status };
  }

  interface Column {
    id: 'image' | 'type' | 'name' | 'price' | 'description' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: any) => string | React.ReactNode;
  }
  const columns: Column[] = [
    { 
      id: 'image', 
      label: 'Image',
      align: 'center',
    },
    { 
      id: 'type', 
      label: 'Type', 
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
    },
    {
      id: 'price',
      label: 'Price\u00a0(VND)',
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
    },
  ];

  useEffect(() => {
    getRoomList();
  },[])

  const openModalAdd = () => {
    setIsModalAddOpen(true)
  };

  const closeModalAdd = () => {
    getRoomList()
    setIsModalAddOpen(false)
  };

  const openModalEdit = (row: any) => {
    getRoomInfo(row.id)
    console.log('open')
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false)
  };

  const openModalDelete = (row: any) => {
    setRoom({
      id: row.id, 
      name: row.name
    })
    console.log(row)
    setIsModalDeleteOpen(true)
    console.log('open')
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false)
  };

  const getRoomList = async (): Promise<void> => {
    try{
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetAllRooms()
      response.forEach((row: any) => {
        rowData.push(
          createData(
            row.id,
            row.images?.[0]?.url || '',
            (row.typeRoom === 0 ? "Single": 
              row.typeRoom === 1 ? "Double": 
              row.typeRoom === 2 ? "Fourth": "Meeting"
            ), 
            row.name, 
            row.price, 
            row.description, 
            (row.status === 0 ? "Available" : "Unavailable")))
      })
      setRoomList(rowData)
    } catch(err){
      console.error('Error get room list :', err);
    }
  }
  
  const getRoomInfo = async (id: string) : Promise<void> => {
    try {
      const response = await ApiGateway.GetRoomDetail(id)
      setRoom(response)
      setIsModalEditOpen(true)
      console.log(response)
    } catch (error) {
      console.error("Error getting Room Info: ", error)
      throw error
    }
  }

  const deleteRoom = async () : Promise<void> => {
    try {
      const response = await ApiGateway.DeleteRoom(room.id)
      setRoom({})
      getRoomList()
      console.log(response)
    } catch (error) {
      console.error("Error deleting Room: ", error)
      throw error
    }
  }

  const updateRoom = async (roomId: string, roomType: string, name: string, price: string, description: string, images: (File | null)[] ) : Promise<void>  => {
    try {
      const response = await ApiGateway.UpdateRoom(roomId, parseInt(roomType), name, price, description, images)
      setRoom({})
      getRoomList()
      console.log(response)
    } catch (error) {
      console.error("Error updating Room: ", error)
      throw error
    }
  } 

  return (
    <div id='room-mng'>
      <h1>Room Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModalAdd}/>
      </div>
      <div className='content'>
        {roomList ? 
          <TableTpl columns={columns} rows={roomList} editButton={true} deleteButton={true} openPopup1={openModalEdit} openPopup2={openModalDelete}/>
          :
          <p style={{textAlign: "center"}}>There are no Room</p>
        } 
      </div>
      {isModalAddOpen && <Modal type='add' closeModal={closeModalAdd} />}
      {isModalEditOpen && <Modal type='edit' room={room} closeModal={closeModalEdit} editRoom={updateRoom}/>}
      {isModalDeleteOpen && <Modal type='delete' room={room} closeModal={closeModalDelete} deleteRoom={deleteRoom}/>}
    </div>
  )
}

export default RoomManagement