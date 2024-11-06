import React,{ useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Data {
    columns: any[];
<<<<<<< HEAD
    rows: any[];
}

const TableTpl:React.FC<Data> = ({columns, rows}) => {
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
=======
    rows: Rows[];
    image?: string;
    haveSubrows?: boolean;
    editButton?: boolean;
    deleteButton?: boolean;
    approveButton?: boolean;
    declineButton?: boolean;
    accessButton?: boolean;
    unAccessButton?: boolean;
    cancelButton?: boolean;
    banButton?: boolean;
    openPopup1?: (row: any) => void;
    openPopup2?: (row: any) => void;
}

interface Rows {
    index: string;
    id: string;
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
    openPopup1?: (row: any) => void;
    openPopup2?: (row: any) => void;
}

interface subRows {
    amenityService: service
    total: string;
    amountItems: string;    
}

interface service {
    name: string;
    type: string;
    price: string;
}

const TableTpl:React.FC<Data> = (
    {
        columns, 
        rows, 
        haveSubrows, 
        editButton, 
        deleteButton, 
        approveButton, 
        declineButton, 
        accessButton, 
        unAccessButton, 
        cancelButton, 
        banButton,
        openPopup1, 
        openPopup2,
    }) => {

    const context = useContext(AuthenContext);
    if (!context) {
        throw new Error("useAuthenContext must be used within an AuthenProvider");
    }
    const { user } = context;
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    
    const actionButtons = [
        { condition: editButton, icon: <Btn name='Edit' />, label: "Edit" },
        { condition: deleteButton, icon: <Btn name='Delete' />, label: "Delete" },
        { condition: approveButton, icon: <Btn name='Approve' />, label: "Approve" },
        { condition: declineButton, icon: <Btn name='Decline' />, label: "Decline" },
        { condition: accessButton, icon: <Btn name='Access' />, label: "Access" },
        { condition: unAccessButton, icon: <Btn name='Unaccess' />, label: "Unaccess" },
        { condition: cancelButton, icon: <Btn name='Cancel' />, label: "Cancel" },
        { condition: banButton, icon: <Btn name='Ban'/>, label: "Ban" },
    ];
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
  
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
  
    return (
        <div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default TableTpl