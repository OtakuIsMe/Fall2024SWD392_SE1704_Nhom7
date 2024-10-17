import React,{ useState, useEffect } from 'react'
import './AreaManagement.css'
import TableTpl from '../../../Components/Table/Table'
import { ApiGateway } from '../../../Api/ApiGateway'

const AreaManagement: React.FC = () => {

  const [ areaList, setAreaList ] = useState<any>([])
  const data : any[] = [];

  interface Data {
    id: string;
    name: string;
    description: string;
    locationId: string;
  }
  function createData(
    id: string,
    name: string,
    description: string,
    locationId: string,
  ): Data {
    return { id, name, description, locationId };
  }

  interface Column {
    id: 'id' | 'name' | 'description' | 'locationId' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  const columns: Column[] = [
    { 
      id: 'id', 
      label: 'Id', 
      minWidth: 170 
    },
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 100 
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'locationId',
      label: 'LocationId',
      minWidth: 170,
    }
  ];

  useEffect(()=>{
    fetchAreas()
  },[])

  const fetchAreas = async (): Promise<void> => {
    try{
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetArea()
      response.forEach((row: any) => {
        // rowData.push(createData(row.images?.[0]?.url || '', row.typeRoom, row.name, row.price, row.description, row.status))
        rowData.push(createData(row.id, row.name, row.description, row.locationId))
      })
      setAreaList(rowData)
    } catch(err){
      console.error('Error get room list :', err);
    }
  }

  return (
    <div id='area-mng'>
      <h1>Area Management</h1>
      <div className='content'>
        {areaList ? 
          <TableTpl columns={columns} rows={areaList}/>
          :
          <TableTpl columns={columns} rows={data}/>
        }
      </div>
    </div>
  )
}

export default AreaManagement