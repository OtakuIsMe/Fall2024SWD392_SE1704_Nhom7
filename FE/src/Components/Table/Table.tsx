import React,{ useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import WhereToVoteRoundedIcon from '@mui/icons-material/WhereToVoteRounded';
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Btn from '../Btn/Btn';
import './Table.css'
import { AuthenContext } from '../AuthenContext';

interface Data {
    columns: any[];
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
  
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleFunction1(row: object) {
        if(openPopup1){
            openPopup1(row)
        }
    }

    function handleFunction2(row: object) {
        if(openPopup2){
            openPopup2(row)
        }
    }

    const Row:React.FC<Rows> = ({ index, id, room, user, email, total, bookedDate, start, end, status, isPay, services, openPopup1, openPopup2}) =>{
        const [open, setOpen] = React.useState(false);
        const row = { index, id, room, user, email, total, bookedDate, start, end, status, isPay };

        function handleFunction1() {
            if(openPopup1){
                openPopup1(row)
            }
        }

        function handleFunction2(row: object) {
            if(openPopup2){
                openPopup2(row)
            }
        }
        
        return(
            <React.Fragment>
                <TableRow hover role="checkbox" tabIndex={-1} >
                    {services && 
                        <TableCell>
                            {services.length > 0 &&
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            }
                        </TableCell>
                    }
                    <TableCell>{index}</TableCell>
                    {columns.map((column) => {
                        const value = row[column.id as keyof typeof row];
                        return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value
                                }
                            </TableCell>
                        );
                    })}
                    {actionButtons.map((button, index) =>
                        button.condition ? (
                            <TableCell align='center'>
                                <div 
                                    className={`tblButton btn${index+1}`} 
                                    onClick={() => { (index + 1) % 2 === 0 ? handleFunction2(row) : handleFunction1()}}>{button.icon}</div>
                            </TableCell>
                        ) : null
                    )}
                </TableRow>
                {services?.length ?
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Services
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align='center'>No</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total Service price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {services?.map((serviceRow: subRows, index: number) => (
                                        <TableRow>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {serviceRow.amenityService.name}
                                            </TableCell>
                                            <TableCell>{serviceRow.amenityService.type}</TableCell>
                                            <TableCell>{serviceRow.amenityService.price}</TableCell>
                                            <TableCell align="right">{serviceRow.amountItems}</TableCell>
                                            <TableCell align="right">{serviceRow.total}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    :<></>
                }
            </React.Fragment>
        )
    }
  
    return (
        <div>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            { haveSubrows &&
                                <TableCell />
                            }
                            <TableCell align='center'>No</TableCell>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            {actionButtons.map((button, index) =>
                                button.condition ? (
                                    <TableCell key={index}
                                    align="center"
                                    style={{ minWidth: 30 }}>
                                        {button.label}
                                    </TableCell>
                                ) : null
                            )}
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {haveSubrows ? 
                        rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <Row 
                                        index={row.index}
                                        id={row.id}
                                        room={row.room} 
                                        user={row.user} 
                                        email={row.email}
                                        total={row.total}
                                        bookedDate={row.bookedDate}
                                        start={row.start}
                                        end={row.end}
                                        status={row.status}
                                        isPay={row.isPay}
                                        services={row.services} 
                                        openPopup1={openPopup1}
                                        openPopup2={openPopup2}
                                        />
                                );
                        })
                        :
                        rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any, index: number) => {
                                let rId = row.id;
                                let rName = row.name;
                                let rUName: string;
                                if (row.username) {
                                    console.log(row.username)
                                    rUName = row.username;
                                }
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                    <TableCell align='center'>
                                        {index+1}
                                    </TableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === "image" ?
                                                    <img src={value} height={100}/>
                                                    :
                                                    column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value
                                                }
                                            </TableCell>
                                        );
                                        })
                                    }
                                    {actionButtons.map((button, index) =>
                                        button.condition ? (
                                            <TableCell align='center'>
                                                {button.label !== "Ban" ? (
                                                        <div className={`tblButton btn${index+1}`} onClick={() => {(index + 1) % 2 === 0 ? handleFunction2(row) : handleFunction1(row)}} >{button.icon}</div>
                                                    ):(
                                                        row?.email !== user?.email ? (
                                                            <div className={`tblButton btn${index+1}`} onClick={() => {(index + 1) % 2 === 0 ? handleFunction2(row) : handleFunction1(row)}} >{row.status === "Banned" ? <Btn name='Unban'/>:<Btn name='Ban'/>}</div>  
                                                        ) : <></>
                                                    )
                                                }
                                            </TableCell>
                                        ) : null
                                    )}
                                </TableRow>
                                );
                        })
                    }
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