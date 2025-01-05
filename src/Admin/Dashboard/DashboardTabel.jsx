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
import ViewIcon from '../../Assets/AdminImages/ViewIcon.png';
import { useAddProject } from '../../AdminContext/AddProjectContext';
import { deleteProject, editProject, getAllProject } from '../../Lib/ProjectApi';
import { extractDate, formatNumber } from '../../Lib/ApiCaller';
import { useProjectList } from '../../Context/ProjectListContext';
import { Alert } from '../../Common/Alert';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { makeStyles } from '@mui/styles';
import { useLanguage } from '../../Context/LanguageContext';
import Swal from 'sweetalert2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Loader from '../../Common/Loader';

const columns = [
    { id: 'sno', label: 'Sr no.', minWidth: 50 },
    { id: 'title', label: 'Project Name', minWidth: 120 },
    { id: 'categoryName', label: 'Category', minWidth: 130, align: 'left' },
    { id: 'verification', label: 'Verification', minWidth: 50, align: 'left' },
    { id: 'goalAmount', label: 'Target', minWidth: 90, align: 'left' },
    { id: 'currentAmount', label: 'Donation Amount', minWidth: 10, align: 'left' },
    { id: 'createdAt', label: 'Create Date', minWidth: 90, align: 'left' },
    { id: 'action', label: 'Action', minWidth: 60, align: 'left' },
    { id: 'project', label: 'Status', minWidth: 80, align: 'left' },
];


const useStyles = makeStyles({
    hiddenPagination: {
        '& .MuiTablePagination-selectLabel': {
            display: 'none ',
        },
        '& .MuiInputBase-root.MuiTablePagination-select': {
            display: 'none ',
        },
        '& .MuiInputBase-root MuiInputBase-colorPrimary MuiTablePagination-input css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
            display: 'none',
        },
    },
    inputPadding: {
        '& .MuiInputBase-root .MuiInputBase-input': {
            padding: '11px 8px 8px 0px ',
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




const DashboardTabel = ({ handleOpenView, handleOpenEdit }) => {

    const classes = useStyles();
    const { selectedLanguage } = useLanguage()

    const { setEditData } = useAddProject();
    const { setProjectViewData } = useProjectList();
    const { projectData, setProjectData } = useAdminSection();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [filter, setFilter] = useState('Project Name');
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
        const value = event.target.value;
        setFilter(value);
        setSearchValue('');
    };

    const handleChangeFilterToday = (event) => {
        const value = event.target.value;
        setFilterDate(value);
        setSearchValue('');
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleEdit = (row) => {
        setEditData(row)
        handleOpenEdit(row)
    };

    const handleView = (row) => {
        setProjectViewData(row)
        handleOpenView()
    };

    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null)

    const handleStatusChange = async (event, row) => {
        setLoader(true)
        const categoryId = row?.en?.categoryId?.map(cat => cat?._id).filter(Boolean);
        let response = await editProject(
            row?.en?.title,
            row?.fa?.title,
            row?.en?.goalAmount,
            categoryId,
            row?.en?.description,
            row?.fa?.description,
            row?.en?.organisationName,
            row?.fa?.organisationName,
            row?.en?.organiserName,
            row?.fa?.organiserName,
            row?.en?.email,
            row?.fa?.email,
            file,
            row?._id,
            row?.en?.verification,
            "active"
        )

        try {
            if (response?.statusCode === 200) {
                fetchProject()
                setTimeout(() => {
                    setLoader(false)
                    Alert('Success', `${response.message}`, 'success')
                }, 2000);
            }
            else {
                Alert('Info', `${response.message}`, 'info')
                setLoader(false)
            }

        } catch (error) {
            Alert('Info', `Unable to process your request, Please try later.`, 'info')
            setLoader(false)
        }
    }

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
                let response = await deleteProject(row?._id)
                if (response?.statusCode === 200) {
                    fetchProject()
                    Alert('Success', 'Your selected project was deleted successfully.', 'success');
                }
            }
        })

    };

    const fetchProject = async () => {
        let response = await getAllProject()
        setProjectData(response?.data)
    };

    useEffect(() => {
        fetchProject()
    }, []);

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return (
        <Paper sx={{ width: '100%' }} className='DashboardTabel'>
            <TableContainer sx={{ borderRadius: '20px' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="end" colSpan={4}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography className='DashboardTabelCellText'>
                                        Project List
                                    </Typography>
                                    <Search className='UpperNavbarSearch'>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search here…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            className={classes.inputPadding}
                                            value={searchValue}
                                            onChange={handleSearchChange}

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
                                                ' & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                                    padding: '10px 22px 10px 12px'
                                                }
                                            }}
                                            className='DashboardFilterDropDown'
                                            IconComponent={FilterAltOutlinedIcon}
                                        >
                                            {/* <MenuItem value="">
                                                Filter
                                            </MenuItem> */}
                                            <MenuItem value='Project Name'>Project Name</MenuItem>
                                            <MenuItem value='Category'>Category</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </TableCell>
                            <TableCell align='right' colSpan={3}>
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
                                                onChange={handleChangeFilterToday}
                                                sx={{
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: 'none',
                                                    },
                                                    ' & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                                        padding: '10px 22px 10px 12px'
                                                    }
                                                }}
                                                className='DashboardFilterDropDown'
                                            >
                                                <MenuItem value="">
                                                    All
                                                </MenuItem>
                                                <MenuItem value="Today">
                                                    Today
                                                </MenuItem>
                                                <MenuItem value='7 Days'>Last 7 Days</MenuItem>
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
                        {projectData?.filter((row) => {
                            if (!filter) return true; // If no filter is selected, show all rows
                            if (filter === 'Project Name') {
                                return row?.en?.title?.toLowerCase()?.includes(searchValue.toLowerCase());
                            } else if (filter === 'Category') {
                                return row?.en?.categoryId?.some(data => data.title.toLowerCase().includes(searchValue.toLowerCase()));
                            }
                            return true;
                        })?.filter((row) => {
                            const createdAt = new Date(row.en.createdAt);
                            if (filterDate === 'Today') {
                                return createdAt.toDateString() === today.toDateString();
                            } else if (filterDate === '7 Days') {
                                return createdAt >= sevenDaysAgo && createdAt <= today;
                            }
                            return true;
                        })?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => {
                            const title = selectedLanguage === 'EN' ? row?.en?.title : row?.fa?.title;
                            const categoryName = selectedLanguage === 'EN'
                                ? row?.en?.categoryId?.map(data => data.title).join(', ')
                                : row?.fa?.categoryId?.map(data => data.title).join(', ');
                            const verification = selectedLanguage === 'EN' ? row?.en?.verification : row?.fa?.verification;
                            const goalAmount = selectedLanguage === 'EN' ? row?.en?.goalAmount : row?.fa?.goalAmount;
                            const currentAmount = selectedLanguage === 'EN' ? row?.en?.currentAmount : row?.fa?.currentAmount;
                            let value = row[row.id];
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                                    <TableCell align="left" className='DashboardTabelCellRow'>{value = (page * rowsPerPage + index + 1).toString().padStart(2, '0')}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>{title}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>{categoryName}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>{verification}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>{formatNumber(goalAmount)}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>{formatNumber(currentAmount)}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>{extractDate(row?.en?.createdAt)}</TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                            <Box className='TabelViewIcon' onClick={() => handleView(row)}>
                                                <img src={ViewIcon} alt='ViewIcon' />
                                            </Box>
                                            <Box className='TabelEditIcon' onClick={() => handleEdit(row)}>
                                                <img src={EditIcon} alt='EditIcon' />
                                            </Box>
                                            {/* <Box className='TabelDelIcon' onClick={() => handleDelete(row)}>
                                                <img src={DeleteIcon} alt='DeleteIcon' />
                                            </Box> */}
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left" className='DashboardTabelCellRow'>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={row.en.status === "active"}
                                                    onChange={(event) => handleStatusChange(event, row)}
                                                    color="success"
                                                />
                                            }
                                            // label={row.en.status ? 'active' : 'inactive'}
                                        />
                                    </TableCell>
                                </TableRow>

                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={projectData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className={classes.hiddenPagination}
            />
            <Loader loader={loader} setLoader={setLoader} />

        </Paper>
    )
}

export default DashboardTabel;
