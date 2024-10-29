import React,{ useState, useEffect } from 'react'
import './AreaManagement.css'
import TableTpl from '../../../Components/Table/Table'
import { ApiGateway } from '../../../Api/ApiGateway'
import AddBtn from '../../../Components/AddBtn/AddBtn'

const AreaManagement: React.FC = () => {

  const [ areaList, setAreaList ] = useState<any>([])
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const data : any[] = [];  


  interface Data {
    index: number;
    name: string;
    description: string;
    locationId: string;
  }
  function createData(
    index: number,
    name: string,
    description: string,
    locationId: string,
  ): Data {
    return { index, name, description, locationId };
  }

  interface Column {
    id: 'index' | 'name' | 'description' | 'locationId' ;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
  }
  const columns: Column[] = [
    { 
      id: 'index', 
      label: 'No', 
      align: 'center',
    },
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 170 
    },
    {
      id: 'locationId',
      label: 'Address',
      minWidth: 240,
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
  ];

  useEffect(()=>{
    fetchAreas()
  },[])

  const openModal = () => {
    setIsModalOpen(true);
    console.log('open')
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('close')
  };

  const fetchAreas = async (): Promise<void> => {
    try{
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetArea()
      response.forEach((row: any, index: number) => {
        rowData.push(createData(index + 1, row.name, row.description, row.location.address))
      })
      setAreaList(rowData)
      console.log(rowData)
    } catch(err){
      console.error('Error get room list :', err);
    }
  }

  return (
    <div id='area-mng'>
      <h1>Area Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModal}/>
      </div>
      
      <div className='content'>
        {areaList ? 
          <TableTpl columns={columns} rows={areaList} editButton={true} deleteButton={true}/>
          :
          <p style={{textAlign: "center"}}>There are no Room</p>
        }
      </div>
    </div>
  )
}

export default AreaManagement