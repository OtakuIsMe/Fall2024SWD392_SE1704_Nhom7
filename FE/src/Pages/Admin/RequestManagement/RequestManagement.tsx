import React from 'react'
import './RequestManagement.css'
import TableTpl from '../../../Components/Table/Table';

const RequestManagement: React.FC = () => {
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

  interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
  }
  function createData(
    name: string,
    code: string,
    population: number,
    size: number,
  ): Data {
    const density = population / size;
    return { name, code, population, size, density };
  }

  interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  const columns: Column[] = [
<<<<<<< HEAD
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 170 
    },
    { 
      id: 'code', 
      label: 'ISO\u00a0Code', 
      minWidth: 100 
    },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];

=======
    { id: 'room', label: 'Room', minWidth: 100 },
    { id: 'user', label: 'User', minWidth: 130 },
    { id: 'email', label: 'Email', minWidth: 130 },
    { id: 'total', label: 'Total\u00a0(VND)', minWidth: 30, align: 'right', format: (value: number) => value.toLocaleString('en-US')},
    { id: 'bookedDate', label: 'Booked Date', minWidth: 150 },
    { id: 'start', label: 'Start', minWidth: 150 },
    { id: 'end', label: 'End', minWidth: 130 },
    { id: 'status', label: 'Status', minWidth: 30, align: 'center' },
    { id: 'isPay', label: 'Is Pay', minWidth: 30, align: 'center' },
  ];

  const openApproveModal = (row: any) => {
    setRequest(row)
    setIsApproveModalOpen(true)
  }

  const closeApproveModal = () => {
    setRequest(null)
    fetchRequest()
    setIsApproveModalOpen(false)
  }

  const openDeclineModal = (row: any) => {
    setRequest(row)
    setIsDeclineModalOpen(true)
  }

  const closeDeclineModal = () => {
    setRequest(null)
    fetchRequest()
    setIsDeclineModalOpen(false)
  }

  useEffect(() => {
    fetchRequest();
  }, []);

  function getTime(time: string): { hours: number; minutes: number } {
    const [hours, minutes] = time.split(":").map(Number);
    
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
            (index + 1),
            row.id,
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
                    (item.amenityService.type === 0 ? 'Food' : (item.amenityService.type === 1 ? 'Drink' : 'Device')), 
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

  const approveBooking = async (bookingId: string) : Promise<void> => {
    try {
        console.log(bookingId);
        const response = await ApiGateway.ApproveBooking(bookingId)
        await fetchRequest()
    } catch (error) {
        console.error("Approve booking error",error);
    }
  }

  const declineBooking = async (bookingId: string) : Promise<void> => {
    try {
        console.log(bookingId);
        const response = await ApiGateway.CancelBooking(bookingId)
        await fetchRequest()
    } catch (error) {
        console.error("Approve booking error",error);
    }
  }

>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
  return (
    <div id='request-mng'>
      <h1>Request Management</h1>
      <div className='content'>
        <TableTpl rows={rows} columns={columns}/>
      </div>
    </div>
  )
}

export default RequestManagement