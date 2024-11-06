import React, { useEffect, useState } from 'react'
import TableTpl from '../../../Components/Table/Table' 
import { ApiGateway } from '../../../Api/ApiGateway'
import './UserManagement.css'

const UserManagement: React.FC = () => {
<<<<<<< HEAD
=======
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isBanModalOpen, setIsBanModalOpen ] = useState(false);
  const [ thisUser, setThisUser ] = useState<any>();
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)

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
      // minWidth: 170 
    },
    { 
      id: 'email', 
      label: 'Email', 
      // minWidth: 100 
    },
    {
      id: 'phone',
      label: 'Phone',
      // minWidth: 170,
    },
    {
      id: 'wallet',
      label: 'Wallet',
      // minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  const data: any[] = [
    // createData('India', 'IN', 1324171354, 3287263),
    // createData('China', 'CN', 1403500365, 9596961),
    // createData('Italy', 'IT', 60483973, 301340),
    // createData('United States', 'US', 327167434, 9833520),
    // createData('Canada', 'CA', 37602103, 9984670),
    // createData('Australia', 'AU', 25475400, 7692024),
    // createData('Germany', 'DE', 83019200, 357578),
    // createData('Ireland', 'IE', 4857000, 70273),
    // createData('Mexico', 'MX', 126577691, 1972550),
    // createData('Japan', 'JP', 126317000, 377973),
    // createData('France', 'FR', 67022000, 640679),
    // createData('United Kingdom', 'GB', 67545757, 242495),
    // createData('Russia', 'RU', 146793744, 17098246),
    // createData('Nigeria', 'NG', 200962417, 923768),
    // createData('Brazil', 'BR', 210147125, 8515767),
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
<<<<<<< HEAD
=======
  
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

  const banUser = async (): Promise<void> => {
    try {
      const response = await ApiGateway.DeleteUser(thisUser.id);
      console.log(response)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)

  return (
    <div id='user-mng'>
      <h1>User Management</h1>
      <div className='content'>
        {userList ? 
          <TableTpl columns={columns} rows={userList}/>
          :
          <TableTpl columns={columns} rows={data}/>
        }
      </div>
<<<<<<< HEAD
=======
      {isModalOpen && <Modal closeModal={closeModal} type='add'/>}
      {isBanModalOpen && <Modal type='ban' user={thisUser} closeModal={closeBanModal} banUser={banUser}/>}
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
    </div>
  )
}

export default UserManagement