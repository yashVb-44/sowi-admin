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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import EditIcon from '../../Assets/AdminImages/EditIcon.png';
import DeleteIcon from '../../Assets/AdminImages/DeleteIcon.png';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { deleteBlog, getAllBlog } from '../../Lib/BlogApi';
import { extractDate } from '../../Lib/ApiCaller';
import { Alert } from '../../Common/Alert';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';
import { useLanguage } from '../../Context/LanguageContext';

const columns = [
    { id: 'sno', label: 'Sr no.', minWidth: 50 },
    { id: 'title', label: 'Blog Title', minWidth: 470 },
    { id: 'author', label: 'Creator Name', minWidth: 150, align: 'left' },
    { id: 'datePublished', label: 'Create Date', minWidth: 150, align: 'left' },
    { id: 'action', label: 'Action', minWidth: 150, align: 'left' },
];


const useStyles = makeStyles({
    hiddenPagination: {
        '& .MuiTablePagination-selectLabel': {
            display: 'none !important',
        },
        '& .MuiInputBase-root.MuiTablePagination-select': {
            display: 'none !important',
        },
        '& .MuiInputBase-root MuiInputBase-colorPrimary MuiTablePagination-input css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
            display: 'none',
        },
    },
    inputPadding: {
        '& .MuiInputBase-root .MuiInputBase-input': {
            padding: '13px 8px 8px 0px ',
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
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const BlogManagementTable = ({ handleOpenBlogEdit }) => {
    const classes = useStyles();
    const { selectedLanguage } = useLanguage()

    const { setEditData } = useAddProject();
    const { blogData, setBlogData } = useAdminSection();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('Blog Title');
    const [filterDate, setFilterDate] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        setSearchValue('');
    };

    const handleChangeFilterDate = (event) => {
        setFilterDate(event.target.value);
        setSearchValue('');
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleEdit = (row) => {
        setEditData(row);
        handleOpenBlogEdit(row);
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
                let response = await deleteBlog(row?._id);
                if (response?.statusCode === 200) {
                    fetchBlog();
                    Alert('Success', 'Your selected blog was deleted successfully.', 'success');
                }
            }
        })

    };

    const fetchBlog = async () => {
        let response = await getAllBlog();
        setBlogData(response?.blogs?.reverse());
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return (
        <Paper sx={{ width: '100%' }} className='CategoryTabel'>
            <TableContainer sx={{ borderRadius: '20px' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="end" colSpan={3}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography className='DashboardTabelCellText'>
                                        Blog List
                                    </Typography>
                                    <Search className='UpperNavbarSearch'>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search here…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                            className={classes.inputPadding}

                                        />
                                    </Search>
                                    <FormControl>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filter}
                                            displayEmpty
                                            onChange={handleChangeFilter}
                                            sx={{
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                                    padding: '10px 22px 10px 12px',
                                                },
                                            }}
                                            className='DashboardFilterDropDown'
                                            IconComponent={FilterAltOutlinedIcon}
                                        >
                                            <MenuItem value="Blog Title">Blog Title</MenuItem>
                                            <MenuItem value="Creator Name">Creator Name</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </TableCell>
                            <TableCell align='right' colSpan={2}>
                                <Stack className='DashboardTabelCellRight'>
                                    <Typography className='DashboardTabelCellRightText'>
                                        Sort By
                                    </Typography>
                                    <Box>
                                        <FormControl>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={filterDate}
                                                displayEmpty
                                                onChange={handleChangeFilterDate}
                                                sx={{
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: 'none',
                                                    },
                                                    '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        padding: '10px 22px 10px 12px',
                                                    },
                                                }}
                                                className='DashboardFilterDropDown'
                                            >
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value="Today">Today</MenuItem>
                                                <MenuItem value="7 Days">Last 7 Days</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                    className='DashboardTabelHeader'
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogData
                            ?.filter((row) => {
                                if (!filter) return true;
                                if (filter === 'Blog Title') {
                                    return row?.en?.title?.toLowerCase()?.includes(searchValue.toLowerCase());
                                } else if (filter === 'Creator Name') {
                                    return row?.en?.author?.toLowerCase()?.includes(searchValue.toLowerCase());
                                }
                                return true;
                            })
                            ?.filter((row) => {
                                const datePublished = new Date(row?.en?.datePublished);
                                if (filterDate === 'Today') {
                                    return datePublished?.toDateString() === today.toDateString();
                                } else if (filterDate === '7 Days') {
                                    return datePublished >= sevenDaysAgo && datePublished <= today;
                                }
                                return true;
                            })
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            ?.map((row, index) => {
                                const title = selectedLanguage === 'EN' ? row?.en?.title : row?.fa?.title;
                                const author = selectedLanguage === 'EN' ? row?.en?.author : row?.fa?.author;
                                let value = row[row.id];
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.sno}>
                                        <TableCell align="left" className='DashboardTabelCellRow'>{ value = (page * rowsPerPage + index + 1).toString().padStart(2, '0')}</TableCell>
                                        <TableCell align="left" className='DashboardTabelCellRow'>{title}</TableCell>
                                        <TableCell align="left" className='DashboardTabelCellRow'>{author}</TableCell>
                                        <TableCell align="left" className='DashboardTabelCellRow'>{extractDate(row?.en?.datePublished)}</TableCell>
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
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={blogData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                className={classes.hiddenPagination}
                onRowsPerPageChange={handleChangeRowsPerPage}

            />
        </Paper>
    );
};

export default BlogManagementTable;
