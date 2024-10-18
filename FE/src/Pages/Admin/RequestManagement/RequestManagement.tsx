import React, { useState, useEffect } from 'react';
import './RequestManagement.css';
import TableTpl from '../../../Components/Table/Table';
import { ApiGateway } from '../../../Api/ApiGateway';

const RequestManagement: React.FC = () => {
  const data: any[] = [];
  const [requestList, setRequestList] = useState<any>([]);

  interface Data {
    index: string;
    room: string;
    user: string;
    total: string;
    status: string;
    isPay: string;
  }

  function createData(
    index: string,
    room: string,
    user: string,
    total: string,
    status: string,
    isPay: string
  ): Data {
    return { index, room, user, total, status, isPay };
  }

  interface Column {
    id: 'index' | 'room' | 'user' | 'total' | 'status' | 'isPay';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: string) => string;
  }

  const columns: Column[] = [
    { id: 'index', label: 'Index', minWidth: 170 },
    { id: 'room', label: 'Room', minWidth: 100 },
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'total', label: 'Total', minWidth: 170, align: 'right' },
    { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
    { id: 'isPay', label: 'Is Pay', minWidth: 170, align: 'center' },
  ];

  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async (): Promise<void> => {
    try {
      let rowData: any[] = [];
      const response = await ApiGateway.GetRequest();

      response.forEach((row: any, index: number) => {
        console.log('Row Data:', row); // Log each row
        rowData.push(createData((index+1).toString(), row.room.name, row.user.name, row.total, row.status, (row.isPay ? "Paid" : "Unpaid")));
      });

      setRequestList(rowData);
      console.log('Updated Request List:', rowData); // Log the updated list
    } catch (err) {
      console.log("Get Request Error:", err);
    }
  };

  return (
    <div id='request-mng'>
      <h1>Request Management</h1>
      <div className='content'>
        {requestList.length > 0 ? (
          <TableTpl columns={columns} rows={requestList} />
        ) : (
          <TableTpl columns={columns} rows={data} />
        )}
      </div>
    </div>
  );
};

export default RequestManagement;
