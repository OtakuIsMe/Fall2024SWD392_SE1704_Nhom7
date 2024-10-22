import React, { useState, useEffect} from 'react'
import './ServiceManagement.css'
import TableTpl from '../../../Components/Table/Table';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import { ApiGateway } from '../../../Api/ApiGateway';
import Modal from '../../../Components/Modal/Modal';

const ServiceManagement: React.FC = () => {
  const data : any[] = [];

  const [ serviceList, setServiceList ] = useState<any>([])

  interface Data {
    index: number;
    type: string;
    name: string;
    price: number;
  }
  function createData(
    index: number,
    type: string,
    name: string,
    price: number,
  ): Data {
    return { index, type, name, price };
  }

  interface Column {
    id: 'index' | 'type' | 'name' | 'price' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { 
      id: 'index', 
      label: 'No', 
      minWidth: 10
    },
    { 
      id: 'type', 
      label: 'Type', 
      minWidth: 50 
    },
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 170 
    },
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  useEffect(() => {
    fetchServices()
  },[])

  const getService = (type: number): string => {
    switch (type) {
      case 0: return 'Food'
      case 1: return 'Drink'
      case 2: return 'Device'
      default: return 'None'
    }
  }

  const fetchServices = async (): Promise<void> => {
    try {
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetServices()
      response.forEach((row: any, index: number) => {
        rowData.push(createData(index+1 , getService(row.type), row.name, row.price))
      })
      setServiceList(rowData)
    } catch (err) {
      console.error('Error get servicelist :', err);
    }
  }

  return (
    <div id='service-mng'>
      <h1>Service Management</h1>
      <div className='btn-container'>
        <AddBtn/>
      </div>
      <div className='content'>
        {serviceList ? 
          <TableTpl columns={columns} rows={serviceList} editButton={true} deleteButton={true}/>
          :
          <TableTpl columns={columns} rows={data}/>
        } 
      </div>
      <Modal popupType='Something' open={true} />
    </div>
  )
}

export default ServiceManagement