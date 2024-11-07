import React, { useState, useEffect } from 'react';
import './MembershipManagement.css';
import TableTpl from '../../../Components/Table/Table';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import { ApiGateway } from '../../../Api/ApiGateway';
import MembershipModal from './MembershipModal/MembershipModal';

const MembershipManagement: React.FC = () => {

  const [membershipList, setMembershipList] = useState<any[]>([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [membership, setMembership] = useState<any>();

  interface Data {
    id: string;
    name: string;
    discount: number;
    project: string;
    rank: number;
  }

  function createData(
    id: string,
    name: string,
    discount: number,
    project: string,
    rank: number,
  ): Data {
    return { id, name, discount, project, rank };
  }

  interface Column {
    id: 'name' | 'discount' | 'project' | 'rank';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: 'name', label: 'Name' },
    { id: 'discount', label: 'Discount (%)', align: 'right' },
    { id: 'project', label: 'Project' },
    { id: 'rank', label: 'Rank', align: 'right' },
  ];

  useEffect(() => {
    fetchMemberships();
  }, []);

  const openModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const closeModalAdd = () => {
    fetchMemberships();
    setIsModalAddOpen(false);
  };

  const openModalEdit = (row: any) => {
    setMembership({
      ...membership,
      id: row.id,
      name: row.name,
      discount: row.discount,
      project: row.project,
      rank: row.rank,
    });
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    fetchMemberships();
    setIsModalEditOpen(false);
  };

  const openModalDelete = (row: any) => {
    setMembership({
      ...membership,
      id: row.id,
      name: row.name,
    });
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    fetchMemberships();
    setIsModalDeleteOpen(false);
  };

  const fetchMemberships = async (): Promise<void> => {
    try {
      let rowData: any[] = [];
      const response = await ApiGateway.GetAllMemberships();
      response.forEach((row: any) => {
        rowData.push(
          createData(
            row.id,
            row.name,
            row.discount,
            row.project,
            row.rank,
          )
        );
      });
      setMembershipList(rowData);
    } catch (err) {
      console.error('Error getting membership list:', err);
    }
  };

  const deleteMembership = async (): Promise<void> => {
    try {
      const response = await ApiGateway.DeleteMembership(membership.id);
      setMembership({});
      await fetchMemberships();
      console.log('Membership deleted:', response);
    } catch (error) {
      console.error('Error deleting membership:', error);
    }
  };

  const updatedMembership = async (id: string, name: string, discount: number, project: string, rank: number): Promise<void> => {
    try {
      const response = await ApiGateway.UpdateMembership(id, name, discount, project, rank);
      setMembership({});
      await fetchMemberships();
      console.log('Membership updated successfully:', response);
    } catch (error) {
      console.error('Error updating membership:', error);
    }
  };

  return (
    <div id='membership-mng'>
      <h1>Membership Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModalAdd} />
      </div>
      <div className='content'>
        {membershipList.length > 0 ? (
          <TableTpl
            columns={columns}
            rows={membershipList}
            editButton={true}
            deleteButton={true}
            openPopup1={openModalEdit}
            openPopup2={openModalDelete}
          />
        ) : (
          <p style={{ textAlign: 'center' }}>There are no memberships available</p>
        )}
      </div>
      {isModalAddOpen && <MembershipModal type='add' closeModal={closeModalAdd} />}
      {isModalEditOpen && <MembershipModal type='edit' membership={membership} closeModal={closeModalEdit} editMembership={updatedMembership} />}
      {isModalDeleteOpen && <MembershipModal type='delete' membership={membership} closeModal={closeModalDelete} deleteMembership={deleteMembership} />}
    </div>
  );
};

export default MembershipManagement;
