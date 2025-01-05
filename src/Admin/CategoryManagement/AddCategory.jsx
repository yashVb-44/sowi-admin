import React, { useCallback, useState } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useDropzone } from 'react-dropzone';
import CloudImage from '../../Assets/AdminImages/CloudImgae.png';
import EditIcon from '../../Assets/AdminImages/EditIcon.png';
import { createCategory, getCategory } from '../../Lib/CategoryApi';
import Loader from '../../Common/Loader';
import { Alert } from '../../Common/Alert';
import './AddCategory.css';
import { useAdminSection } from '../../Context/AdminSectionContext';
import { useAddCategory } from '../../AdminContext/AddCategoryContext';
import AddCategoryFarsi from './AddCategoryFarsi';

const AddCategory = ({ openCategory, handleCloseCategory }) => {

    const { catName, setCatName, catTitle, catDesc, setCatTitle, setCatDesc} = useAddCategory()

    const [loader, setLoader] = useState(false);
    const { setCategory } = useAdminSection()

    const [errors, setErrors] = useState({
        catName: '',
        fileData: '',
        catTitle: '',
        catDesc: '',
    });
    
    const handleAddCategory = async () => {
        let valid = true;
        let newErrors = {
            catName: '',
            catTitle: '',
            catDesc: '',
        };
    
        if (!catName) {
            newErrors.catName = 'Category Name is required';
            valid = false;
        }
        if (!catTitle) {
            newErrors.catTitle = 'Category Title is required';
            valid = false;
        }
        if (!catDesc) {
            newErrors.catDesc = 'Category Description is required';
            valid = false;
        }
        
        setErrors(newErrors);
    
        if (!valid) return;
    
        handleOpenCategoryFarsi();
    };
    

    const [openCategoryFarsi, setOpenCategoryFarsi] = useState(false);
    const handleOpenCategoryFarsi = () => setOpenCategoryFarsi(true);
    const handleCloseCategoryFarsi = () => setOpenCategoryFarsi(false);

    return (
        <div>
            <Modal
                open={openCategory}
                onClose={handleCloseCategory}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AddCategoryModal'>
                    <Stack className='AddCategoryDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AddCategoryHeading'>
                            Add Category
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={handleCloseCategory} className='AddCategoryCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Category Name
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your category name'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => setCatName(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catName}
                                helperText={errors.catName}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Category Title
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your category title'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => setCatTitle(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catTitle}
                                helperText={errors.catTitle}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12} className='AddCategoryFields'>
                            <Typography variant="body2" color="text.secondary" className='AddCategoryInputLabel'>
                                Category Description
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder='Enter your category description'
                                variant="standard"
                                className='AddCategoryInputFiled'
                                InputProps={{ disableUnderline: true }}
                                onChange={(e) => setCatDesc(e.target.value)}
                                autoComplete='off'
                                error={!!errors.catDesc}
                                helperText={errors.catDesc}
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Grid>
                    </Grid>
                    
                    <Stack className='FormSubmitFieldAddProject'>
                        <Stack className='AddProjectButtonFormSubmit'>
                            {/* <Button
                                variant="contained"
                                className='FormCancelButtonAddProject'
                                onClick={handleCloseCategory}
                            >
                                Cancel
                            </Button> */}
                            <Button
                                variant="contained"
                                className='FormSubmitButtonAddProject'
                                onClick={handleAddCategory}
                            >
                                Continue
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Loader loader={loader} setLoader={setLoader} />
            <AddCategoryFarsi  openCategoryFarsi={openCategoryFarsi}  handleCloseCategoryFarsi={handleCloseCategoryFarsi} handleCloseCategory={handleCloseCategory} />
        </div>
    );
};

export default AddCategory;
