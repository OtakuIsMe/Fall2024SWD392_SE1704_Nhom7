import React from 'react'
import './RoomManagement.css'
import TableTpl from '../../../Components/Table/Table';

const RoomManagement: React.FC = () => {
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

  interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
  }
  function createData(
    name: string,
    code: string,
    population: number,
    size: number,
  ): Data {
    const density = population / size;
    return { name, code, population, size, density };
  }

  interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  const columns: Column[] = [
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 170 
    },
    { 
      id: 'code', 
      label: 'ISO\u00a0Code', 
      minWidth: 100 
    },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];

<<<<<<< HEAD
=======
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
    getRoomList()
    setIsModalEditOpen(false)
  };

  const openModalDelete = (row: any) => {
    setRoom({
      id: row.id, 
      name: row.name
    })
    setIsModalDeleteOpen(true)
    console.log('open')
  };

  const closeModalDelete = () => {
    getRoomList()
    setIsModalDeleteOpen(false)
  };

  const getRoomList = async (): Promise<void> => {
    try{
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetRoomList('', '', '', '')
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
      console.log(response)
    } catch (error) {
      console.error("Error deleting Room: ", error)
      throw error
    }
  }

  const updateRoom = async (areaId: string, roomType: string, name: string, price: string, description: string, utilitiesId: string[], images: File[]) : Promise<void>  => {
    try {
      const response = await ApiGateway.UpdateRoom(areaId, parseInt(roomType), name, price, description, utilitiesId, images)
      console.log(response)
    } catch (error) {
      console.error("Error updating Room: ", error)
      throw error
    }
  } 

>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
  return (
    <div id='room-mng'>
      <h1>Room Management</h1>
      <div className='content'>
        <TableTpl rows={rows} columns={columns}/> 
      </div>
<<<<<<< HEAD
=======
      {isModalAddOpen && <Modal type='add' closeModal={closeModalAdd} />}
      {isModalEditOpen && <Modal type='edit' room={room} closeModal={closeModalEdit} />}
      {isModalDeleteOpen && <Modal type='delete' room={room} closeModal={closeModalDelete} deleteRoom={deleteRoom}/>}
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
    </div>
  )
}

export default RoomManagement