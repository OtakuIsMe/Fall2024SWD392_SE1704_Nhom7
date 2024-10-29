import React, { useEffect, useState } from 'react'
import TableTpl from '../../../Components/Table/Table' 
import { ApiGateway } from '../../../Api/ApiGateway'
import './UserManagement.css'
import AddBtn from '../../../Components/AddBtn/AddBtn'
import Modal from './UserModal/UserModal'

const UserManagement: React.FC = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  interface Data {
    username: string;
    email: string;
    phone: number;
    wallet: number;
  }
  function createData(
    username: string,
    email: string,
    phone: number,
    wallet: number,
  ): Data {
    return { username, email, phone, wallet };
  }

  interface Column {
    id: 'username' | 'email' | 'phone' | 'wallet' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  const columns: Column[] = [
    { 
      id: 'username', 
      label: 'User name',
    },
    { 
      id: 'email', 
      label: 'Email', 
    },
    {
      id: 'phone',
      label: 'Phone',
    },
    {
      id: 'wallet',
      label: 'Wallet',
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  const [ userList, setUserList ] = useState<any>()

  useEffect(() => {
    fetchUsers();
    console.log(userList);
  },[]);
  
  
  const fetchUsers = async (): Promise<any[]> => {
    let rowData : any[] = [] ;
    const response = await ApiGateway.GetUserList()
    response.forEach((row: any) => {
      rowData.push(createData(row.username, row.email, row.phone, row.wallet))
    })
    setUserList(rowData);
    return userList
  }

  
  const openModal = () => {
    setIsModalOpen(true);
    console.log('open')
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('close')
  };

  return (
    <div id='user-mng'>
      <h1>User Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModal}/>
      </div>
      <div className='content'>
        {userList ? 
          <TableTpl columns={columns} rows={userList}/>
          :
          <p style={{textAlign: "center"}}>There are no User</p>
        }
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  )
}

export default UserManagement