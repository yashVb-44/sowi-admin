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
import SowiImage from '../../Assets/AdminImages/sowi-img.png';
import NoImage from '../../Assets/AdminImages/no-image-available.png';
import { deleteBanner, getAllBanner } from '../../Lib/BannerApi'; // Ensure this function accepts pagination
import { extractDate } from '../../Lib/ApiCaller';
import { makeStyles } from '@mui/styles';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { Alert } from '../../Common/Alert';
import Swal from 'sweetalert2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BlockIcon from '@mui/icons-material/Block';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useBannerSection } from '../../Context/BannerDetails';

const columns = [
    { id: 'image', label: 'Banner Image', minWidth: 180, align: 'right' },
    { id: 'name', label: 'Name', minWidth: 180, align: 'right' },
    { id: 'toShow', label: 'Created For', minWidth: 150, align: 'center' },
    { id: 'isActive', label: 'Active', minWidth: 120, align: 'center' },
    { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
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

const BannerManagementTabel = ({ handleOpenBannerEdit }) => {

    const classes = useStyles();
    const { bannerData, setBannerData, page, setPage, rowsPerPage, setRowsPerPage, searchQuery, setSearchQuery } = useBannerSection()
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
            setPage(0)
            fetchAllBanner();
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setPage(0);
        fetchAllBanner('');
    };

    const fetchAllBanner = async (query = searchQuery) => {
        const response = await getAllBanner({ search: query, page, limit: rowsPerPage });
        setBannerData(response?.banners || []);
        setTotalData(response?.totalBanners || 0);
    };

    const handleEdit = (row) => {
        setEditData(row);
        handleOpenBannerEdit(row);
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
                let response = await deleteBanner(row?._id);
                if (response?.type === "success") {
                    fetchAllBanner()
                    Alert('Success', 'Your selected banner was deleted successfully.', 'success');
                }
            }
        })

    };

    useEffect(() => {
        fetchAllBanner();
    }, [page, rowsPerPage]); // Fetch when page or rowsPerPage changes

    return (
        <Paper sx={{ width: '100%' }} className="CommonTabel">
            <TableContainer sx={{ borderRadius: '20px' }}>
                <Table stickyHeader aria-label="sticky table">
                    {/* Table Head */}
                    <TableHead>
                        <TableRow>
                            <TableCell align="end" colSpan={4}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography className='DashboardTabelCellText'>
                                        Banner List
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
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} className="CommonTabelHeader">
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {/* Table Body */}
                    <TableBody>
                        {bannerData.map((row) => {
                            const date = extractDate(row.createdAt);
                            const isDeleted = row.isDeleted;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row._id}
                                    style={{
                                        backgroundColor: isDeleted ? '#f8d7da' : 'inherit', // Light red for deleted banners
                                    }}
                                >
                                    <TableCell className="DashboardTabelCell" align="center">
                                        {row.image ? (
                                            <img src={row.image} alt="Profile" onError={(e) => e.target.src = SowiImage} className="profile-image" />
                                        ) : (
                                            <img src={NoImage} alt="Profile" className="profile-image" />
                                        )}
                                    </TableCell>
                                    <TableCell className="DashboardTabelCell">{row.name}</TableCell>
                                    <TableCell className="DashboardTabelCell">{row.toShow}</TableCell>
                                    <TableCell
                                        className={`DashboardTabelCell ${row.isActive ? 'status-verified' : 'status-unverified'}`}  
                                    >
                                        {row.isActive ? (
                                            <VerifiedUserIcon className="status-icon-verified" />
                                        ) : (
                                            <HighlightOffIcon className="status-icon-unverified" />
                                        )}
                                    </TableCell>
                                    <TableCell align="left" className="DashboardTabelCellRow">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Box className="TabelEditIcon" onClick={() => handleEdit(row)}>
                                                <img src={EditIcon} alt="EditIcon" />
                                            </Box>
                                            <Box
                                                className="TabelDelIcon"
                                                onClick={() => !isDeleted && handleDelete(row)} // Only call handleDelete if not deleted
                                                style={{
                                                    opacity: isDeleted ? 0.5 : 1,
                                                    pointerEvents: isDeleted ? 'none' : 'auto',
                                                }}
                                            >
                                                <img src={DeleteIcon} alt="DeleteIcon" />
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

export default BannerManagementTabel;
