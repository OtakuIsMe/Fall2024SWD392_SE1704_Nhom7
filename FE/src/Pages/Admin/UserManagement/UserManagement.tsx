import React, { useEffect, useState } from 'react'
import TableTpl from '../../../Components/Table/Table' 
import { ApiGateway } from '../../../Api/ApiGateway'
import './UserManagement.css'
import AddBtn from '../../../Components/AddBtn/AddBtn'
import Modal from './UserModal/UserModal'

const UserManagement: React.FC = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isBanModalOpen, setIsBanModalOpen ] = useState(false);
  const [ isChangeRoleModalOpen, setIsChangeRoleModalOpen ] = useState(false);
  const [ thisUser, setThisUser ] = useState<any>();

  interface Data {
    id: string;
    username: string;
    email: string;
    phone: number;
    roleId: string;
    status: string;
    wallet: number;
  }
  function createData(
    id: string,
    username: string,
    email: string,
    phone: number,
    roleId: string,
    status: string,
    wallet: number,
  ): Data {
    return { id, username, email, phone, roleId, status, wallet };
  }

  interface Column {
    id: 'id' | 'username' | 'email' | 'phone' | 'roleId' | 'status' | 'wallet' ;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
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
      id: 'roleId',
      label: 'Role',
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
    },
    {
      id: 'wallet',
      label: 'Wallet\u00a0(VND)',
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
      rowData.push(
        createData(
          row.id, 
          row.username, 
          row.email, 
          row.phone, 
          (row.roleId === "8f02a88d-24d3-43ee-8020-40b9dc94e4cb" ? 
            "Customer" : 
            row.roleId === "5a4226d9-e58a-42c4-a786-dba8369b234b" ?
              "Staff" : 
              row.roleId === "42feaeb5-fc53-4163-98b5-d28cfceafa7c" ?
                "Manager" : "Admin"
          ), 
          (row.status === 0 ? "Active" : "Banned"),
          row.wallet))
    })
    setUserList(rowData);
    return userList
  }
  
  const openModal = () => {
    setIsModalOpen(true);
    console.log('open')
  };

  const closeModal = () => {
    fetchUsers()
    setIsModalOpen(false);
    console.log('close')
  };

  const openBanModal = (row: any) => {
    console.log(row.id)
    console.log(row.name)
    setThisUser({
      ...thisUser,
      id: row.id,
      userName: row.userName
    })
    setIsBanModalOpen(true);
    console.log('open')
  };

  const closeBanModal = () => {
    fetchUsers()
    setIsBanModalOpen(false);
    console.log('close')
  };

  const openChangeRoleModal = (row: any) => {
    console.log(row.id)
    console.log(row.name)
    setThisUser({
      ...thisUser,
      id: row.id,
      userName: row.userName
    })
    setIsChangeRoleModalOpen(true);
    console.log('open')
  };

  const closeChangeRoleModal = () => {
    fetchUsers()
    setIsChangeRoleModalOpen(false);
    console.log('close')
  };

  const banUser = async (userId: string): Promise<void> => {
    try {
      console.log(userId)
      const response = await ApiGateway.BanUser(userId);
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <div id='user-mng'>
      <h1>User Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModal}/>
      </div>
      <div className='content'>
        {userList ? 
          <TableTpl columns={columns} rows={userList} banButton={true} openPopup2={openBanModal}/>
          :
          <p style={{textAlign: "center"}}>There are no User</p>
        }
      </div>
      {isModalOpen && <Modal type='add' closeModal={closeModal} />}
      {isBanModalOpen && <Modal type='ban' user={thisUser} closeModal={closeBanModal} banUser={banUser}/>}
      {isChangeRoleModalOpen && <Modal type='changerole' user={thisUser} closeModal={closeChangeRoleModal} banUser={banUser}/>}
    </div>
  )
}

export default UserManagement