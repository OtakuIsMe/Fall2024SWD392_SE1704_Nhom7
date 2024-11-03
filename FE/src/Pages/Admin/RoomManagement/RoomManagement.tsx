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

  interface Data {
    image?: string;
    type: string;
    name: string;
    price: number;
    description: string;
    status: string;
  }
  function createData(
    image: string,
    type: string,
    name: string,
    price: number,
    description: string,
    status: string,
  ): Data {
    return { image, type, name, price, description, status };
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
    console.log('open')
  };

  const closeModalAdd = () => {
    getRoomList()
    setIsModalAddOpen(false)
    console.log('close')
  };

  const getRoomList = async (): Promise<void> => {
    try{
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetRoomList('', '', '', '')
      response.forEach((row: any) => {
        rowData.push(
          createData(
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
      // rowData.sort((a, b) => {
      //   if (a.type < b.type) return -1;
      //   if (a.type > b.type) return 1;
      //   return 0;
      // });
      setRoomList(rowData)
    } catch(err){
      console.error('Error get room list :', err);
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
          <TableTpl columns={columns} rows={roomList} editButton={true} deleteButton={true}/>
          :
          <p style={{textAlign: "center"}}>There are no Room</p>
        } 
      </div>
      {isModalAddOpen && <Modal type='add' closeModal={closeModalAdd} />}
      {/* {isModalEditOpen && <Modal type='edit' service={service} closeModal={closeModalEdit} editService={updatedService} />}
      {isModalDeleteOpen && <Modal type='delete' service={service} closeModal={closeModalDelete} deleteService={deleteSevice}/>} */}
    </div>
  )
}

export default RoomManagement