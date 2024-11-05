import React, { useEffect, useState } from 'react'
import './F&RManagement.css'
import TableTpl from '../../../Components/Table/Table';
import { ApiGateway } from '../../../Api/ApiGateway';

const FRManagement: React.FC = () => {
  const [ feedbackList, setFeedbackList ] = useState<any[]>([])

  interface Data {
    feedback: string;
    ratingStar: number;
    userId: string;
    roomId: string;
    createAt: string;
    updateAt: string;
  }
  function createData(
    feedback: string,
    ratingStar: number,
    userId: string,
    roomId: string,
    createAt: string,
    updateAt: string,
  ): Data {
    return { feedback, ratingStar, userId, roomId, createAt, updateAt, };
  }

  interface Column {
    id: 'index' | 'feedback' | 'ratingStar' | 'userId' | 'roomId' | 'createAt'| 'updateAt';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
  }
  const columns: Column[] = [
    { 
      id: 'feedback', 
      label: 'Feedback', 
      minWidth: 100 
    },
    {
      id: 'ratingStar',
      label: 'Rating',
      align: 'center',
    },
    {
      id: 'userId',
      label: 'User Id',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'roomId',
      label: 'Room Id',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'createAt',
      label: 'Create At',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'updateAt',
      label: 'Update At',
      minWidth: 170,
      align: 'right',
    },
  ];

  useEffect(() => {
    fetchFeedback()
  },[]);

  const fetchFeedback = async () : Promise<void> => {
    try {
      let rowData : any[] = [];
      const response = await ApiGateway.GetFeedback();
      response.forEach((row : any, index: number) => {
        rowData.push(createData(row.feedback, row.ratingStar, row.userId, row.roomId, row.createAt, row.updateAt));
      })
      setFeedbackList(rowData)
      console.log(rowData)
    } catch (error) {
      console.error("Fetch Feedback Error", error);
    }
  }

  return (
    <div id='fr-mng'>
      <h1>Feedbacks & Requests Management</h1>
      <div className='content'>
        { feedbackList.length > 0 ?
            <TableTpl rows={feedbackList} columns={columns}/>
            :
            <p style={{textAlign: "center"}}>There are no feedbacks</p>
        }
      </div>
    </div>
  )
}

export default FRManagement