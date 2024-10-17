import React, { useEffect, useState } from 'react'
import TableTpl from '../../../Components/Table/Table' 
import { ApiGateway } from '../../../Api/ApiGateway'
import './UserManagement.css'

const UserManagement: React.FC = () => {

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

  const data: any[] = [];

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
    </div>
  )
}

export default UserManagement