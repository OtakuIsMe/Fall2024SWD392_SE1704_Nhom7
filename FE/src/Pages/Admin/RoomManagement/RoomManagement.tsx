import React, { useEffect, useState } from 'react'
import './RoomManagement.css'
import TableTpl from '../../../Components/Table/Table';
import { ApiGateway } from '../../../Api/ApiGateway';
import AddBtn from '../../../Components/AddBtn/AddBtn';

const RoomManagement: React.FC = () => {

  const [ roomList, setRoomList ] = useState<any>([])
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const data : any[] = [];

  interface Data {
    // image?: string;
    type: string;
    name: string;
    price: number;
    description: string;
    status: number;
  }
  function createData(
    // image: string,
    type: string,
    name: string,
    price: number,
    description: string,
    status: number,
  ): Data {
    // return { image, type, name, price, description,status };
    return { type, name, price, description,status };
  }

  interface Column {
    // id: 'image' | 'type' | 'name' | 'price' | 'description' | 'status';
    id: 'type' | 'name' | 'price' | 'description' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: any) => string | React.ReactNode;
  }
  const columns: Column[] = [
    // { 
    //   id: 'image', 
    //   label: 'Image', 
    //   minWidth: 170,
    //   format: (value: any) =>(
    //   <div>
    //     <img src={value} alt="Room" style={{ width: '100px', height: 'auto' }}/>
    //   </div>
    //   ),
    // },
    { 
      id: 'type', 
      label: 'Type', 
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 170,
    },
    {
      id: 'price',
      label: 'Price\u00a0(VND\u00b2)',
      minWidth: 170,
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
      minWidth: 100,
      align: 'center',
    },
  ];

  useEffect(() => {
    getRoomList();
  },[])

  const openModal = () => {
    setIsModalOpen(true);
    console.log('open')
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('close')
  };

  const getRoomList = async (): Promise<void> => {
    try{
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetRoomList('', '', '', '')
      response.forEach((row: any) => {
        // rowData.push(createData(row.images?.[0]?.url || '', row.typeRoom, row.name, row.price, row.description, row.status))
        rowData.push(createData(row.typeRoom + 1, row.name, row.price, row.description, row.status))
      })
      rowData.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      });
      setRoomList(rowData)
    } catch(err){
      console.error('Error get room list :', err);
    }
  }

  return (
    <div id='room-mng'>
      <h1>Room Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModal}/>
      </div>
      <div className='content'>
        {roomList ? 
          <TableTpl columns={columns} rows={roomList}/>
          :
          <p style={{textAlign: "center"}}>There are no Room</p>
        } 
      </div>
    </div>
  )
}

export default RoomManagement