import React, { useState, useEffect} from 'react'
import './ServiceManagement.css'
import TableTpl from '../../../Components/Table/Table';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import { ApiGateway } from '../../../Api/ApiGateway';
import Modal from './ServiceModal/ServiceModal';

const ServiceManagement: React.FC = () => {
  const data : any[] = [];

  const [ serviceList, setServiceList ] = useState<any>([])
  const [ isModalOpen, setIsModalOpen ] = useState(false);

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
    },
    { 
      id: 'name', 
      label: 'Name',
    },
    { 
      id: 'type', 
      label: 'Type',
    },
    {
      id: 'price',
      label: 'Price',
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  useEffect(() => {
    fetchServices()
  },[])

  const openModal = () => {
    setIsModalOpen(true);
    console.log('open')
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('close')
  };

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
        rowData.push(createData(index+1 , getService(row.amenityService.type), row.amenityService.name, row.amenityService.price))
      })
      setServiceList(rowData)
      console.log(response)
    } catch (err) {
      console.error('Error get servicelist :', err);
    }
  }

  return (
    <div id='service-mng'>
      <h1>Service Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModal}/>
      </div>
      <div className='content'>
        {serviceList ? 
          <TableTpl columns={columns} rows={serviceList} editButton={true} deleteButton={true}/>
          :
          <p style={{textAlign: "center"}}>There are no service in here</p>
        } 
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  )
}

export default ServiceManagement