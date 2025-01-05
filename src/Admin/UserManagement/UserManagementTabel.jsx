import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '../../Assets/AdminImages/EditIcon.png';
import DeleteIcon from '../../Assets/AdminImages/DeleteIcon.png';
import { getAllUser } from '../../Lib/UsersApi'; // Ensure this function accepts pagination
import { extractDate } from '../../Lib/ApiCaller';
import { makeStyles } from '@mui/styles';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import Swal from 'sweetalert2';

const columns = [
    { id: 'name', label: 'User Name', minWidth: 80 },
    { id: 'mobileNo', label: 'Mobile Number', minWidth: 150, align: 'left' },
    { id: 'createdAt', label: 'Date', minWidth: 115, align: 'left' },
    { id: 'isActive', label: 'Active', minWidth: 50, align: 'center' },
    { id: 'isBlocked', label: 'Blocked', minWidth: 50, align: 'center' },
    { id: 'isVerified', label: 'Verified', minWidth: 50, align: 'center' },
    { id: 'action', label: 'Action', minWidth: 150, align: 'left' },
];

const useStyles = makeStyles({
    inputPadding: {
        '& .MuiInputBase-root .MuiInputBase-input': {
            padding: '11px 8px 8px 0px !important',
        },
    },
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

const UserManagementTabel = ({ handleOpenUserEdit }) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const { setEditData } = useAddProject();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchAllUser();
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setPage(0);
        fetchAllUser('');
    };

    const fetchAllUser = async (query = searchQuery) => {
        const response = await getAllUser({ search: query, page, limit: rowsPerPage });
        setUserData(response?.users || []);
        setTotalData(response?.totalUsers || 0);
    };

    const handleEdit = (row) => {
        setEditData(row);
        handleOpenUserEdit(row);
    };

    const handleDelete = async (row) => {
        Swal.fire({
            title: 'Info',
            text: "Sure want to delete",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed) {
                // let response = await deleteBlog(row?._id);
                // if (response?.statusCode === 200) {
                //     fetchBlog();
                //     Alert('Success', 'Your selected blog was deleted successfully.', 'success');
                // }
            }
        })

    };

    useEffect(() => {
        console.log("this ")
        fetchAllUser();
    }, [page, rowsPerPage]); // Fetch when page or rowsPerPage changes

    return (
        <Paper sx={{ width: '100%' }} className="UserTabel">
            <TableContainer sx={{ borderRadius: '20px' }}>
                <Table stickyHeader aria-label="sticky table">
                    {/* Table Head */}
                    <TableHead>
                        <TableRow>
                            <TableCell align="end" colSpan={4}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography className='DashboardTabelCellText'>
                                        User List
                                    </Typography>
                                    <Search className='UpperNavbarSearch'>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search here…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            className={classes.inputPadding}
                                        />
                                        {searchQuery && (
                                            <IconButton
                                                sx={{ position: 'absolute', right: 0, top: 0 }}
                                                onClick={handleClearSearch}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        )}
                                    </Search>
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} className="UserTabelHeader">
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>
                        {userData.map((row) => {
                            const date = extractDate(row.createdAt);
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    <TableCell className='DashboardTabelCell'>{row.name}</TableCell>
                                    <TableCell className='DashboardTabelCell'>{row.mobileNo}</TableCell>
                                    <TableCell className='DashboardTabelCell'>{date}</TableCell>
                                    <TableCell className='DashboardTabelCell'>{row.isActive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell className='DashboardTabelCell'>{row.isBlocked ? 'Yes' : 'No'}</TableCell>
                                    <TableCell className='DashboardTabelCell'>{row.isVerified ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                            {/* <Box className='TabelViewIcon' onClick={() => handleView(row)}>
                                                    <img src={ViewIcon} alt='ViewIcon' />
                                                </Box> */}
                                            <Box className='TabelEditIcon' onClick={() => handleEdit(row)}>
                                                <img src={EditIcon} alt='EditIcon' />
                                            </Box>
                                            <Box className='TabelDelIcon' onClick={() => handleDelete(row)}>
                                                <img src={DeleteIcon} alt='DeleteIcon' />
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalData}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default UserManagementTabel;
