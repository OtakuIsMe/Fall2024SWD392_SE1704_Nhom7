import React, { useState, useEffect} from 'react'
import './ServiceManagement.css'
import TableTpl from '../../../Components/Table/Table';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import { ApiGateway } from '../../../Api/ApiGateway';
import Modal from './ServiceModal/ServiceModal';
import { SettingsEthernetOutlined } from '@mui/icons-material';

const ServiceManagement: React.FC = () => {

  const [ serviceList, setServiceList ] = useState<any>([])
  const [ isModalAddOpen, setIsModalAddOpen ] = useState(false);
  const [ isModalEditOpen, setIsModalEditOpen ] = useState(false);
  const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState(false);

  const [ service, setService ] = useState<any>();

  interface Data {
    id: string;
    image: string;
    type: string;
    name: string;
    status: string;
    price: number;
  }

  function createData(
    id: string,
    image: string,
    type: string,
    name: string,
    status: string,
    price: number,
  ): Data {
    return { id, image, type, name, status, price };
  }

  interface Column {
    id: 'image' | 'type' | 'name' | 'status' | 'price' ;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    {
      id: 'image',
      label: 'Image',
      align: 'center',
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
      id: 'status', 
      label: 'Status',
      align: 'center',
    },
    {
      id: 'price',
      label: 'Price\u00a0(VND)',
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  useEffect(() => {
    fetchServices()
  },[])

  const openModalAdd = () => {
    setIsModalAddOpen(true);
    console.log('open')
  };

  const closeModalAdd = () => {
    fetchServices();
    setIsModalAddOpen(false);
    console.log('close')
  };

  const openModalEdit = (row: any) => {
    setService({
      ...service,
      id: row.id,
      name: row.name,
      price: row.price,
      type: row.type,
      image: row.image
    })
    setIsModalEditOpen(true);
    console.log('open')
  };

  const closeModalEdit = () => {
    fetchServices();
    setIsModalEditOpen(false);
    console.log('close')
  };

  const openModalDelete = (id: string, name: string) => {
    setService({
      ...service,
      id: id,
      name: name,
    })
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    fetchServices();
    setIsModalDeleteOpen(false);
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
      response.forEach((row: any) => {
        rowData.push(createData(row.amenityService.id, row.amenityService.image.url , getService(row.amenityService.type), row.amenityService.name, (row.amenityService.status === 0 ? "Available" : "Unavailable"), row.amenityService.price))
      })
      setServiceList(rowData)
      console.log("list updated")
      console.log(response)
    } catch (err) {
      console.error('Error get servicelist :', err);
    }
  }

  const deleteSevice = async (): Promise<void> => {
    try {
      const response = await ApiGateway.DeleteService(service.id);
      setService({})
      await fetchServices()
      console.log("Service is deleted: ", response) 
    } catch (error) {
      console.error('Error delete service :', error);
    }
  }

  const updatedService = async (id: string, name: string, price: number, image: File): Promise<void> => {
    try {
      const response = await ApiGateway.UpdateService(id, name, price, image)
      setService({})
      await fetchServices()
      console.log('Service updated successfully:', response)
    } catch (error) {
      console.error("Error updating service: ", error);
    }
  }
  
  return (
    <div id='service-mng'>
      <h1>Service Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModalAdd}/>
      </div>
      <div className='content'>
        {serviceList ? 
          <TableTpl columns={columns} rows={serviceList} editButton={true} deleteButton={true} openPopup2={openModalDelete} openPopup1={openModalEdit}/>
          :
          <p style={{textAlign: "center"}}>There are no service in here</p>
        } 
      </div>
      {isModalAddOpen && <Modal type='add' closeModal={closeModalAdd} />}
      {isModalEditOpen && <Modal type='edit' service={service} closeModal={closeModalEdit} editService={updatedService} />}
      {isModalDeleteOpen && <Modal type='delete' service={service} closeModal={closeModalDelete} deleteService={deleteSevice}/>}
    </div>
  )
}

export default ServiceManagement