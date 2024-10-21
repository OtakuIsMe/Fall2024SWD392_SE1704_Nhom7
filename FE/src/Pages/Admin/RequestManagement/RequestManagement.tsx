import React, { useState, useEffect } from 'react';
import './RequestManagement.css';
import TableTpl from '../../../Components/Table/Table';
import { ApiGateway } from '../../../Api/ApiGateway';
import dayjs, { duration } from 'dayjs';

dayjs.extend(duration);

const RequestManagement: React.FC = () => {
  const data: any[] = [];
  const [requestList, setRequestList] = useState<any>([]);

  interface Data {
    index: string;
    room: string;
    user: string;
    email: string;
    total: string;
    bookedDate: string;
    start: string;
    end: string;
    status: string;
    isPay: string;
    services?: subRows[];
  }

  function createData(
    index: string,
    room: string,
    user: string,
    email: string,  
    total: string,
    bookedDate: string,
    start: string,
    end: string,
    status: string,
    isPay: string,
    services?: subRows[],
  ): Data {
    return { index, room, user, email, total, bookedDate, start, end, status, isPay, services };
  }

  interface subRows {
    amenityService: service
    total: string;
    amountItems: string;    
  }

  function createSubrows (
    amenityService: service,
    total: string,
    amountItems: string,
  ): subRows {
    return { amenityService, total, amountItems }
  }

  interface service {
    name: string;
    type: string;
    price: string;
  }

  function createService(name: string, type: string, price: string): service {
    return { name, type, price }
  }

  interface Column {
    id: 'index' | 'room' | 'user' | 'email' | 'total' | 'bookedDate' | 'start' | 'end' | 'status' | 'isPay' | 'approve' | 'decline';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: string) => string;
  }

  const columns: Column[] = [
    { id: 'index', label: 'No', minWidth: 30, align: 'center' },
    { id: 'room', label: 'Room', minWidth: 100 },
    { id: 'user', label: 'User', minWidth: 130 },
    { id: 'email', label: 'Email', minWidth: 130 },
    { id: 'total', label: 'Total', minWidth: 30, align: 'right' },
    { id: 'bookedDate', label: 'Booked Date', minWidth: 150 },
    { id: 'start', label: 'Start', minWidth: 150 },
    { id: 'end', label: 'End', minWidth: 130 },
    { id: 'status', label: 'Status', minWidth: 30, align: 'center' },
    { id: 'isPay', label: 'Is Pay', minWidth: 30, align: 'center' },
  ];

  useEffect(() => {
    fetchRequest();
  }, []);

  function getTime(time: string): { hours: number; minutes: number } {
    const [hours, minutes] = time.split(":").map(Number); // Convert to numbers
    
    return { hours, minutes };
  }

  function getStatus(status: number): string {
    switch (status) {
      case 0: return "Waiting"
      case 1: return "In Progress"
      case 2: return "Completed"
      case 3: return "Cancelled"
      default: return "none"
    }
  }

  const fetchRequest = async (): Promise<void> => {
    try {
      let rowData: any[] = [];
      const response = await ApiGateway.GetRequest();

      response.forEach((row: any, index: number) => {
        console.log('Row Data:', row); // Log each row
        rowData.push(
          createData(
            (index+1).toString(), 
            row.room.name, 
            row.user.name, 
            row.user.email, 
            row.total, 
            dayjs(row.createAt).format('YYYY-MM-DD, hh:mm'),
            dayjs(row.dateBooking).format('YYYY-MM-DD, hh:mm'), 
            dayjs(row.dateBooking).add(dayjs.duration({hours:getTime(row.timeBooking).hours, minutes:getTime(row.timeBooking).minutes})).format('YYYY-MM-DD, hh:mm'), 
            getStatus(row.status), 
            (row.isPay ? "Paid" : "Unpaid"),
            (row.bookingItems && 
              row.bookingItems.map((item : any) =>
                createSubrows(
                  createService(
                    item.amenityService.name, 
                    (item.amenityService.type === '0' ? 'Food' : (item.amenityService.type === '1' ? 'Drink' : 'Device')), 
                    item.amenityService.price,
                  ), 
                  item.total,
                  item.amountItems,
                )
              )
            )
          ));
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
          <TableTpl columns={columns} rows={requestList} haveSubrows={true} approveButton={true} declineButton={true}/>
        ) : (
          <TableTpl columns={columns} rows={data} />
        )}
      </div>
    </div>
  );
};

export default RequestManagement;
