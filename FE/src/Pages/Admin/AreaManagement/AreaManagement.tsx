import React, { useState, useEffect } from 'react';
import './AreaManagement.css';
import TableTpl from '../../../Components/Table/Table';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import { ApiGateway } from '../../../Api/ApiGateway';
import Modal from './AreaModal/AreaModal';

const AreaManagement: React.FC = () => {
  const [areaList, setAreaList] = useState<any[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [area, setArea] = useState<any>();

  interface Data {
    id: string;
    name: string;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
  }

  function createData(
    id: string,
    name: string,
    description: string,
    address: string,
    longitude: number,
    latitude: number,
  ): Data {
    return { id, name, description, address, longitude, latitude };
  }

  interface Column {
    id: 'name' | 'description' | 'address' | 'longitude' | 'latitude';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'address', label: 'Address' },
    {
      id: 'longitude',
      label: 'Longitude',
      align: 'right',
      format: (value: number) => value.toFixed(6),
    },
    {
      id: 'latitude',
      label: 'Latitude',
      align: 'right',
      format: (value: number) => value.toFixed(6),
    },
  ];

  useEffect(() => {
    fetchAreas();
  }, []);

  const openModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const closeModalAdd = () => {
    fetchAreas();
    setIsModalAddOpen(false);
  };

  const openModalEdit = (row: any) => {
    setArea({
      id: row.id,
      name: row.name,
      description: row.description,
      address: row.address,
      longitude: row.longitude,
      latitude: row.latitude,
    });
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    fetchAreas();
    setIsModalEditOpen(false);
  };

  const openModalDelete = (row: any) => {
    setArea({
      id: row.id,
      name: row.name,
    });
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    fetchAreas();
    setIsModalDeleteOpen(false);
  };

  const fetchAreas = async (): Promise<void> => {
    try {
      let rowData: any[] = [];
      const response = await ApiGateway.GetArea();
      response.forEach((row: any) => {
        rowData.push(
          createData(
            row.id,
            row.name,
            row.description,
            row.address,
            row.longitude,
            row.latitude,
          )
        );
      });
      setAreaList(rowData);
    } catch (err) {
      console.error('Error getting area list:', err);
    }
  };

  // const deleteArea = async (): Promise<void> => {
  //   try {
  //     const response = await ApiGateway.DeleteArea(area.id);
  //     setArea({});
  //     await fetchAreas();
  //     console.log('Area deleted:', response);
  //   } catch (error) {
  //     console.error('Error deleting area:', error);
  //   }
  // };

  const updatedArea = async (
    id: string,
    name: string,
    description: string,
    address: string,
    longitude: number,
    latitude: number,
    image: File[],
  ): Promise<void> => {
    try {
      const response = await ApiGateway.UpdateArea(id, name, description, address, longitude, latitude,image);
      setArea({});
      await fetchAreas();
      console.log('Area updated successfully:', response);
    } catch (error) {
      console.error('Error updating area:', error);
    }
  };

  return (
    <div id='area-mng'>
      <h1>Area Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModalAdd} />
      </div>
      <div className='content'>
        {areaList.length > 0 ? (
          <TableTpl
            columns={columns}
            rows={areaList}
            editButton={true}
            deleteButton={true}
            openPopup1={openModalEdit}
            openPopup2={openModalDelete}
          />
        ) : (
          <p style={{ textAlign: 'center' }}>There are no areas available</p>
        )}
      </div>
      {isModalAddOpen && <Modal type='add' closeModal={closeModalAdd} />}
      {isModalEditOpen && <Modal type='edit' area={area} closeModal={closeModalEdit} editArea={updatedArea} />}
      {/* {isModalDeleteOpen && <Modal type='delete' area={area} closeModal={closeModalDelete} deleteArea={deleteArea} />} */}
    </div>
  );
};

export default AreaManagement;
