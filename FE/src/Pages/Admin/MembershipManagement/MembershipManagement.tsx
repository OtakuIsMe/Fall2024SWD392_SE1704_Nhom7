import React, { useState, useEffect } from 'react'
import './MembershipManagement.css'
import TableTpl from '../../../Components/Table/Table';
import AddBtn from '../../../Components/AddBtn/AddBtn';
import { ApiGateway } from '../../../Api/ApiGateway';

const MembershipManagement: React.FC = () => {
  const [ membershipList, setMembershipList ] = useState<any[]>([])
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  interface Data {
    name: string;
    rank: number;
    discount: number;
    price: number;
    timeleft: number;
    membershipUsers: number;
  }
  function createData(
    name: string,
    rank: number,
    discount: number,
    price: number,
    timeleft: number,
    membershipUsers: number,
  ): Data {
    return {name, rank, discount, price, timeleft, membershipUsers, };
  }

  interface Column {
    id: 'name' | 'rank' |'discount' |  'price' | 'timeleft' | 'membershipUsers';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
  }
  const columns: Column[] = [
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 100 
    },
    { 
      id: 'discount', 
      label: 'Discount', 
      align: 'center'
    },
    {
      id: 'rank',
      label: 'Rank',
      align: 'right',
    },
    {
      id: 'price',
      label: 'Price\u00a0(VND)',
      align: 'right',
    },
    {
      id: 'timeleft',
      label: 'Time Expired',
      align: 'center',
    },
    {
      id: 'membershipUsers',
      label: 'Membership Users',
      align: 'right',
    },
  ];

  useEffect(() => {
    fetchMembership()
  }, [])

  const fetchMembership = async (): Promise<void> => {
    try {
      let rowData : any[] = [] ;
      const response = await ApiGateway.GetMembership()
      response.forEach((row: any) => {
        rowData.push(createData(row.name, row.rank, row.discount, row.price, row.timeLeft, (row.membershipUser ? row.membershipUser.length : 0)))
      })
      setMembershipList(rowData)
      console.log(rowData)
    } catch (error) {
      console.error('Error get membership list :', error);
    }
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
    <div id='membership-mng'>
      <h1>Membership Management</h1>
      <div className='btn-container'>
        <AddBtn openModal={openModal}/>
      </div>
      <div className='content'>
        {membershipList ?
          <TableTpl rows={membershipList} columns={columns}/>
          :
          <p style={{textAlign: "center"}}>There are no Membership available</p>
        }
      </div>
    </div>
  )
}

export default MembershipManagement