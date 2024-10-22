import React,{ useState } from 'react'
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
import './Table.css'

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
}

interface Rows {
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

const TableTpl:React.FC<Data> = ({columns, rows, haveSubrows, editButton, deleteButton, approveButton, declineButton, accessButton, unAccessButton, cancelButton}) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    
    const actionButtons = [
        { condition: editButton, icon: <BorderColorIcon />, label: "Edit" },
        { condition: deleteButton, icon: <DeleteIcon />, label: "Delete" },
        { condition: approveButton, icon: <CheckBoxRoundedIcon />, label: "Approve" },
        { condition: declineButton, icon: <DisabledByDefaultRoundedIcon />, label: "Decline" },
        { condition: accessButton, icon: <WhereToVoteRoundedIcon />, label: "Access" },
        { condition: unAccessButton, icon: <DoNotDisturbOnRoundedIcon />, label: "Unaccess" },
        { condition: cancelButton, icon: <CancelPresentationRoundedIcon />, label: "Cancel" },
    ];
  
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const Row:React.FC<Rows> = ({ index, room, user, email, total, bookedDate, start, end, status, isPay, services}) =>{
        const [open, setOpen] = React.useState(false);
        const row = { index, room, user, email, total, bookedDate, start, end, status, isPay };

        return(
            <React.Fragment>
                <TableRow hover role="checkbox" tabIndex={-1} >
                    {services && 
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                    }
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
                                <div className={`tblButton btn${index+1}`}>{button.icon}</div>
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
                                        room={row.room} 
                                        user={row.user} 
                                        email={row.email}
                                        total={row.total}
                                        bookedDate={row.bookedDate}
                                        start={row.start}
                                        end={row.end}
                                        status={row.status}
                                        isPay={row.isPay}
                                        services={row.services} />
                                );
                        })
                        :
                        rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1}>
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
                                    {actionButtons.map((button, index) =>
                                        button.condition ? (
                                            <TableCell align='center'>
                                                <div className={`tblButton btn${index+1}`}>{button.icon}</div>
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