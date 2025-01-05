import React, { useCallback, useEffect, useState } from 'react'
import { Stack, Grid, Box, TextField, Typography, Select, MenuItem, InputAdornment, Button, Autocomplete } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import CloudImage from '../../../Assets/AdminImages/CloudImgae.png'
import './HomeContent.css'
import { updateBlog } from '../../../Lib/BlogApi';
import { getHomeContent, getSupportContent, updateHomeContent, updateMissionContent, updateSupportContent } from '../../../Lib/HomeContent';
import { useContent } from '../../../Context/ContentContext';
import Loader from '../../../Common/Loader';
import { Alert } from '../../../Common/Alert';
import { useDropzone } from 'react-dropzone';

const HomeContentEdit = ({ openHomeEdit, handleCloseHomeEdit }) => {

    const { editHomeContent, setEditHomeContent, editSupportContent, fetchSupportContent, fetchHomeContent, editMissionContent, fetchMissionContent } = useContent();

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');
    const handleResetUpload = () => {
        setFile(null)
        setFilePreview(null)
    }

    const [supportFile, setSupportFile] = useState(null)
    const [supportFilePreview, setSupportFilePreview] = useState(null)
    const [supportError, setSupportError] = useState('')
    const [supportFile2, setSupportFile2] = useState(null)
    const [supportFilePreview2, setSupportFilePreview2] = useState(null)
    const [supportError2, setSupportError2] = useState('')
    const [supportFile3, setSupportFile3] = useState(null)
    const [supportFilePreview3, setSupportFilePreview3] = useState(null)
    const [supportError3, setSupportError3] = useState('')
    const [supportFile4, setSupportFile4] = useState(null)
    const [supportFilePreview4, setSupportFilePreview4] = useState(null)
    const [supportError4, setSupportError4] = useState('')

    const [supportHeading, setSupportHeading] = useState('')
    const [supportPara, setSupportPara] = useState('')
    const [supportTitle, setSupportTitle] = useState('')
    const [supportDescription, setSupportDescription] = useState('')
    const [supportTitle2, setSupportTitle2] = useState('')
    const [supportDescription2, setSupportDescription2] = useState('')
    const [supportTitle3, setSupportTitle3] = useState('')
    const [supportDescription3, setSupportDescription3] = useState('')
    const [supportTitle4, setSupportTitle4] = useState('')
    const [supportDescription4, setSupportDescription4] = useState('')
    // farsi
    const [supportHeadingFarsi, setSupportHeadingFarsi] = useState('')
    const [supportParaFarsi, setSupportParaFarsi] = useState('')
    const [supportTitleFarsi, setSupportTitleFarsi] = useState('')
    const [supportDescriptionFarsi, setSupportDescriptionFarsi] = useState('')
    const [supportTitle2Farsi, setSupportTitle2Farsi] = useState('')
    const [supportDescription2Farsi, setSupportDescription2Farsi] = useState('')
    const [supportTitle3Farsi, setSupportTitle3Farsi] = useState('')
    const [supportDescription3Farsi, setSupportDescription3Farsi] = useState('')
    const [supportTitle4Farsi, setSupportTitle4Farsi] = useState('')
    const [supportDescription4Farsi, setSupportDescription4Farsi] = useState('')

    // mission
    const [missionFile, setMissionFile] = useState(null)
    const [missionFilePreview, setMissionFilePreview] = useState(null)
    const [missionError, setMissionError] = useState('')
    const [missionFile2, setMissionFile2] = useState(null)
    const [missionFilePreview2, setMissionFilePreview2] = useState(null)
    const [missionError2, setMissionError2] = useState('')
    const [missionFile3, setMissionFile3] = useState(null)
    const [missionFilePreview3, setMissionFilePreview3] = useState(null)
    const [missionError3, setMissionError3] = useState('')
    const [missionFile4, setMissionFile4] = useState(null)
    const [missionFilePreview4, setMissionFilePreview4] = useState(null)
    const [missionError4, setMissionError4] = useState('')

    const [missionHeading, setMissionHeading] = useState('')
    const [missionPara, setMissionPara] = useState('')
    const [missionNumber, setMissionNumber] = useState('')
    const [missionDescription, setMissionDescription] = useState('')
    const [missionNumber2, setMissionNumber2] = useState('')
    const [missionDescription2, setMissionDescription2] = useState('')
    const [missionNumber3, setMissionNumber3] = useState('')
    const [missionDescription3, setMissionDescription3] = useState('')
    const [missionNumber4, setMissionNumber4] = useState('')
    const [missionDescription4, setMissionDescription4] = useState('')
    // farsi
    const [missionHeadingFarsi, setMissionHeadingFarsi] = useState('')
    const [missionParaFarsi, setMissionParaFarsi] = useState('')
    const [missionNumberFarsi, setMissionNumberFarsi] = useState('')
    const [missionDescriptionFarsi, setMissionDescriptionFarsi] = useState('')
    const [missionNumber2Farsi, setMissionNumber2Farsi] = useState('')
    const [missionDescription2Farsi, setMissionDescription2Farsi] = useState('')
    const [missionNumber3Farsi, setMissionNumber3Farsi] = useState('')
    const [missionDescription3Farsi, setMissionDescription3Farsi] = useState('')
    const [missionNumber4Farsi, setMissionNumber4Farsi] = useState('')
    const [missionDescription4Farsi, setMissionDescription4Farsi] = useState('')


    const handleSupportImage = (setterFile, setterPreview) => {
        setterFile(null)
        setterPreview(null)
    }

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            Alert('Error', 'Only JPG and PNG files are allowed.', 'error');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        maxSize: 10485760, // 10MB
        noClick: true, // Disable the default click behavior
    });

    const handleChange = (section, field, value, lang) => {
        setEditHomeContent(prevContent => ({
            ...prevContent,
            [lang]: {
                ...prevContent[lang],
                [section]: {
                    ...prevContent[lang][section],
                    [field]: value
                }
            }
        }));
    };

    const handleChangeSupport = (e, setter) => {
        setter(e.target.value)
    };

    const [loader, setLoader] = useState(false)

    const editContent = async () => {
        setLoader(true)
        try {
            let response = await updateHomeContent(file, editHomeContent?.en?.heroBanner, editHomeContent?.en?.part1, editHomeContent?.en?.part2, editHomeContent?.en?.part3, editHomeContent?.fa?.heroBanner, editHomeContent?.fa?.part1, editHomeContent?.fa?.part2, editHomeContent?.fa?.part3, editHomeContent?._id, editHomeContent?.en?.part0, editHomeContent?.fa?.part0,)
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseHomeEdit()
                    fetchHomeContent()
                    Alert('Success', response?.message, 'success')
                }, 2000);
            }
            else {
                handleCloseHomeEdit()
                Alert('Info', response?.message, 'info')
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            handleCloseHomeEdit()
        }
    }

    const editContentSupport = async () => {
        setLoader(true)
        try {
            let response = await updateSupportContent(supportTitle, supportDescription, supportFile, supportTitle2, supportDescription2, supportFile2, supportTitle3, supportDescription3, supportFile3, supportTitle4, supportDescription4, supportFile4, supportTitleFarsi, supportDescriptionFarsi, supportTitle2Farsi, supportDescription2Farsi, supportTitle3Farsi, supportDescription3Farsi, supportTitle4Farsi, supportDescription4Farsi, editSupportContent?._id, supportHeading, supportPara, supportHeadingFarsi, supportParaFarsi)
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseHomeEdit()
                    fetchSupportContent()
                    Alert('Success', response?.message, 'success')
                }, 2000);
            }
            else {
                handleCloseHomeEdit()
                Alert('Info', response?.message, 'info')
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            handleCloseHomeEdit()
        }
    }
    const editContentMission = async () => {
        setLoader(true)
        try {
            let response = await updateMissionContent(missionHeading, missionPara, missionHeadingFarsi, missionParaFarsi, missionNumber, missionDescription, missionFile, missionNumber2, missionDescription2, missionFile2, missionNumber3, missionDescription3, missionFile3, missionNumber4, missionDescription4, missionFile4, missionNumberFarsi, missionDescriptionFarsi, missionNumber2Farsi, missionDescription2Farsi, missionNumber3Farsi, missionDescription3Farsi, missionNumber4Farsi, missionDescription4Farsi, editMissionContent?._id)
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseHomeEdit()
                    fetchMissionContent()
                    Alert('Success', response?.message, 'success')
                }, 2000);
            }
            else {
                handleCloseHomeEdit()
                Alert('Info', response?.message, 'info')
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            handleCloseHomeEdit()
        }
    }

    useEffect(() => {
        setFilePreview(editHomeContent?.heroBannerImg)

        setSupportHeading(editSupportContent?.en?.heading)
        setSupportPara(editSupportContent?.en?.para)
        setSupportTitle(editSupportContent?.en?.support1?.title)
        setSupportTitle2(editSupportContent?.en?.support2?.title)
        setSupportTitle3(editSupportContent?.en?.support3?.title)
        setSupportTitle4(editSupportContent?.en?.support4?.title)
        setSupportDescription(editSupportContent?.en?.support1?.description)
        setSupportDescription2(editSupportContent?.en?.support2?.description)
        setSupportDescription3(editSupportContent?.en?.support3?.description)
        setSupportDescription4(editSupportContent?.en?.support4?.description)
        // farsi
        setSupportHeadingFarsi(editSupportContent?.fa?.heading)
        setSupportParaFarsi(editSupportContent?.fa?.para)
        setSupportTitleFarsi(editSupportContent?.fa?.support1?.title)
        setSupportTitle2Farsi(editSupportContent?.fa?.support2?.title)
        setSupportTitle3Farsi(editSupportContent?.fa?.support3?.title)
        setSupportTitle4Farsi(editSupportContent?.fa?.support4?.title)
        setSupportDescriptionFarsi(editSupportContent?.fa?.support1?.description)
        setSupportDescription2Farsi(editSupportContent?.fa?.support2?.description)
        setSupportDescription3Farsi(editSupportContent?.fa?.support3?.description)
        setSupportDescription4Farsi(editSupportContent?.fa?.support4?.description)

        setSupportFilePreview(editSupportContent?.en?.support1?.icon1)
        setSupportFilePreview2(editSupportContent?.en?.support2?.icon2)
        setSupportFilePreview3(editSupportContent?.en?.support3?.icon3)
        setSupportFilePreview4(editSupportContent?.en?.support4?.icon4)

        // mission
        setMissionHeading(editMissionContent?.en?.heading)
        setMissionPara(editMissionContent?.en?.para)
        setMissionNumber(editMissionContent?.en?.mission1?.number)
        setMissionNumber2(editMissionContent?.en?.mission2?.number)
        setMissionNumber3(editMissionContent?.en?.mission3?.number)
        setMissionNumber4(editMissionContent?.en?.mission4?.number)
        setMissionDescription(editMissionContent?.en?.mission1?.description)
        setMissionDescription2(editMissionContent?.en?.mission2?.description)
        setMissionDescription3(editMissionContent?.en?.mission3?.description)
        setMissionDescription4(editMissionContent?.en?.mission4?.description)
        // farsi
        setMissionHeadingFarsi(editMissionContent?.fa?.heading)
        setMissionParaFarsi(editMissionContent?.fa?.para)
        setMissionNumberFarsi(editMissionContent?.fa?.mission1?.number)
        setMissionNumber2Farsi(editMissionContent?.fa?.mission2?.number)
        setMissionNumber3Farsi(editMissionContent?.fa?.mission3?.number)
        setMissionNumber4Farsi(editMissionContent?.fa?.mission4?.number)
        setMissionDescriptionFarsi(editMissionContent?.fa?.mission1?.description)
        setMissionDescription2Farsi(editMissionContent?.fa?.mission2?.description)
        setMissionDescription3Farsi(editMissionContent?.fa?.mission3?.description)
        setMissionDescription4Farsi(editMissionContent?.fa?.mission4?.description)

        setMissionFilePreview(editMissionContent?.en?.mission1?.icon1)
        setMissionFilePreview2(editMissionContent?.en?.mission2?.icon2)
        setMissionFilePreview3(editMissionContent?.en?.mission3?.icon3)
        setMissionFilePreview4(editMissionContent?.en?.mission4?.icon4)

    }, [editHomeContent, editSupportContent])

    return (
        <div>
            <Modal
                open={openHomeEdit}
                onClose={handleCloseHomeEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='HomeContentModal'>
                    <Stack className='HomeContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='HomeContentHeading'>
                            Edit (ویرایش کنید)
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseHomeEdit()} className='HomeContentCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>
                    <Stack className='HomeContentSite'>
                        <Stack>
                            <Stack>
                                <Stack>
                                    <Stack className='HomeContentEditBtn' sx={{ marginBottom: '1.5%' }}>
                                        <Typography className='HomeContentHeadingTwo'>Hero Banner</Typography>
                                    </Stack>
                                    <Typography className='HomeContentHeadingThree'>Sub Title 1</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.heroBanner?.subTitle1}
                                        onChange={(e) => handleChange('heroBanner', 'subTitle1', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Title</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.heroBanner?.title}
                                        onChange={(e) => handleChange('heroBanner', 'title', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Sub Title 2</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.heroBanner?.subTitle2}
                                        onChange={(e) => handleChange('heroBanner', 'subTitle2', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='BorderBottom'></Stack>
                            <Stack>
                                <Stack>
                                    <Stack className='HomeContentEditBtn' sx={{ marginTop: '1.5%' }}>
                                        <Typography className='HomeContentHeadingTwo'>بنر قهرمان</Typography>
                                    </Stack>
                                    <Typography className='HomeContentHeadingThree'>عنوان فرعی 1</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.heroBanner?.subTitle1}
                                        onChange={(e) => handleChange('heroBanner', 'subTitle1', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.heroBanner?.title}
                                        onChange={(e) => handleChange('heroBanner', 'title', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>عنوان فرعی 2</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.heroBanner?.subTitle2}
                                        onChange={(e) => handleChange('heroBanner', 'subTitle2', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>


                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Top Image</Typography>
                                {/* <img src={bgImage} alt='Home Banner Image' style={{ marginTop: '15px' }} /> */}
                                {!filePreview &&
                                    <Stack {...getRootProps()} className='FileUpload'>
                                        <input {...getInputProps()} />
                                        < Stack className='FileUploadField'>
                                            <img src={CloudImage} alt='Cloud Image'

                                            />
                                            {isDragActive ? (
                                                <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                                    Drop the files here ...
                                                </Typography>
                                            ) : (
                                                <>
                                                    <Typography variant="body2" color="text.secondary" className='FileUploadHeading'>
                                                        Select a file or drag and drop here
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" className='FileUploadPara'>
                                                        JPG or PNG file size no more than 10MB
                                                    </Typography>
                                                    <Stack className='FileUploadDottedLine'>
                                                        <Stack className='FileUploadDotted'></Stack>
                                                        <Typography>or</Typography>
                                                        <Stack className='FileUploadDotted'></Stack>
                                                    </Stack>
                                                    <Button
                                                        variant="contained"
                                                        className='FileUploadButton'
                                                        onClick={open} // Use the open method from useDropzone
                                                    >
                                                        Browse file
                                                    </Button>

                                                </>
                                            )}

                                        </Stack>


                                        {error && (
                                            <Box mt={2}>
                                                <Typography variant="body2" color="error">{error}</Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                }
                                {filePreview && (
                                    <Stack className='PreviewUpload'>
                                        <Box className='PreviewUploadImageContainer'>
                                            <img src={filePreview} className='PreviewUploadImage' alt="Preview" />
                                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleResetUpload()} className='EditIconAddProject' />
                                        </Box>
                                    </Stack>

                                )}
                            </Stack>

                            <Stack className='HomeContentFieldCreateBlog'>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContent}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* mission */}
                        <Stack className='HomeContentTopMar'>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>We’re On A Mission Of Big Changes</Typography>
                                {/* <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' /> */}
                            </Stack>
                            <Stack className='HomeContentTopMar'>

                                <Grid item container>
                                    <Grid item xs={12} sx={12} md={12} lg={12}>
                                        <Stack>
                                            <Typography className='HomeContentHeadingThree'>Heading</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionHeading}
                                                onChange={(e) => handleChangeSupport(e, setMissionHeading)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true, readOnly: false }}

                                            />
                                        </Stack>
                                        <Stack>
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionPara}
                                                onChange={(e) => handleChangeSupport(e, setMissionPara)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true, readOnly: false }}

                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sx={12} md={12} lg={12}>
                                        <Stack>
                                            <Typography className='HomeContentHeadingThree'>سرفصل</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionHeadingFarsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionHeadingFarsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true, readOnly: false }}

                                            />
                                        </Stack>
                                        <Stack>
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionParaFarsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionParaFarsi)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true, readOnly: false }}

                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>

                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!missionFilePreview &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setMissionFile(selectedFile);
                                                                setMissionFilePreview(URL.createObjectURL(selectedFile));
                                                                setMissionError('');
                                                            } else {
                                                                setMissionError('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {missionFilePreview && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={missionFilePreview} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setMissionFile, setMissionFilePreview)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>
                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Number</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عدد</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumberFarsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumberFarsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescriptionFarsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescriptionFarsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!missionFilePreview2 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setMissionFile2(selectedFile);
                                                                setMissionFilePreview2(URL.createObjectURL(selectedFile));
                                                                setMissionError2('');
                                                            } else {
                                                                setMissionError2('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {missionFilePreview2 && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={missionFilePreview2} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setMissionFile2, setMissionFilePreview2)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Number</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber2}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber2)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription2}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription2)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عدد</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber2Farsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber2Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription2Farsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription2Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!missionFilePreview3 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setMissionFile3(selectedFile);
                                                                setMissionFilePreview3(URL.createObjectURL(selectedFile));
                                                                setMissionError3('');
                                                            } else {
                                                                setMissionError3('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {missionFilePreview3 && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={missionFilePreview3} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setMissionFile3, setMissionFilePreview3)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Number</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber3}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber3)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription3}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription3)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عدد</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber3Farsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber3Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription3Farsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription3Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!missionFilePreview4 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setMissionFile4(selectedFile);
                                                                setMissionFilePreview4(URL.createObjectURL(selectedFile));
                                                                setMissionError4('');
                                                            } else {
                                                                setMissionError4('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {missionFilePreview4 && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={missionFilePreview4} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setMissionFile4, setMissionFilePreview4)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Number</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber4}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber4)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription4}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription4)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عدد</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionNumber4Farsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionNumber4Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={missionDescription4Farsi}
                                                onChange={(e) => handleChangeSupport(e, setMissionDescription4Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack className='HomeContentFieldCreateBlog' style={{ marginBottom: '3%' }}>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContentMission}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* part 0  */}
                        <Stack className='HomeContentTopMar'>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>Part 0 (Support Our Mission, Change Lives Today) </Typography>
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Heading</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part0?.title}
                                        onChange={(e) => handleChange('part0', 'title', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                    <Typography className='HomeContentHeadingThree'>Sub Heading</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part0?.description}
                                        onChange={(e) => handleChange('part0', 'description', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>قسمت 0 (از ماموریت ما حمایت کنید، امروز زندگی را تغییر دهید) </Typography>
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>سرفصل</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part0?.title}
                                        onChange={(e) => handleChange('part0', 'title', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                    <Typography className='HomeContentHeadingThree'>عنوان فرعی</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part0?.description}
                                        onChange={(e) => handleChange('part0', 'description', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='HomeContentFieldCreateBlog'>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContent}

                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Part 1 */}
                        <Stack className='HomeContentTopMar'>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>Part 1</Typography>
                                    {/* <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' /> */}
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Title</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part1?.title}
                                        onChange={(e) => handleChange('part1', 'title', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Description</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part1?.description}
                                        onChange={(e) => handleChange('part1', 'description', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>قسمت 1</Typography>
                                    {/* <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' /> */}
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part1?.title}
                                        onChange={(e) => handleChange('part1', 'title', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part1?.description}
                                        onChange={(e) => handleChange('part1', 'description', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='HomeContentFieldCreateBlog'>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}

                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContent}

                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Part 2 */}
                        {/* <Stack className='HomeContentTopMar'>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>Part 2</Typography>
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Title</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part2?.title}
                                        onChange={(e) => handleChange('part2', 'title', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Description</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part2?.description}
                                        onChange={(e) => handleChange('part2', 'description', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>قسمت 2</Typography>
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part2?.title}
                                        onChange={(e) => handleChange('part2', 'title', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part2?.description}
                                        onChange={(e) => handleChange('part2', 'description', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='HomeContentFieldCreateBlog'>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContent}

                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack> */}

                        {/* Part 3 */}
                        {/* <Stack className='HomeContentTopMar'>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>Part 3</Typography>
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Title</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part3?.title}
                                        onChange={(e) => handleChange('part3', 'title', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>Description</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.en?.part3?.description}
                                        onChange={(e) => handleChange('part3', 'description', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>
                            <Stack>
                                <Stack className='HomeContentEditBtn'>
                                    <Typography className='HomeContentHeadingTwo'>قسمت 3</Typography>
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part3?.title}
                                        onChange={(e) => handleChange('part3', 'title', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                    <TextField
                                        className='HomeContentInputFiled'
                                        value={editHomeContent?.fa?.part3?.description}
                                        onChange={(e) => handleChange('part3', 'description', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack className='HomeContentFieldCreateBlog'>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContent}

                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack> */}

                        {/* Part 4 */}
                        <Stack className='HomeContentTopMar'>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Part 4: How you can support us</Typography>
                                {/* <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' /> */}
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item xs={10} sx={12} md={10} lg={11}>
                                    <Stack className='HomeContentGridMarginLeft'>
                                        <Typography className='HomeContentHeadingThree'>Heading</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={supportHeading}
                                            onChange={(e) => handleChangeSupport(e, setSupportHeading)}
                                            variant="standard"
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                        />
                                        <Typography className='HomeContentHeadingThree'>Sub Heading</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={supportPara}
                                            onChange={(e) => handleChangeSupport(e, setSupportPara)}
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            InputProps={{ disableUnderline: true }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sx={12} md={10} lg={11}>
                                    <Stack className='HomeContentGridMarginLeft'>
                                        <Typography className='HomeContentHeadingThree'>سرفصل</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={supportHeadingFarsi}
                                            onChange={(e) => handleChangeSupport(e, setSupportHeadingFarsi)}
                                            variant="standard"
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                        />
                                        <Typography className='HomeContentHeadingThree'>عنوان فرعی</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={supportParaFarsi}
                                            onChange={(e) => handleChangeSupport(e, setSupportParaFarsi)}
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            InputProps={{ disableUnderline: true }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!supportFilePreview &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setSupportFile(selectedFile);
                                                                setSupportFilePreview(URL.createObjectURL(selectedFile));
                                                                setSupportError('');
                                                            } else {
                                                                setSupportError('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {supportFilePreview && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile, setSupportFilePreview)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitleFarsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitleFarsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescriptionFarsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescriptionFarsi)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!supportFilePreview2 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setSupportFile2(selectedFile);
                                                                setSupportFilePreview2(URL.createObjectURL(selectedFile));
                                                                setSupportError2('');
                                                            } else {
                                                                setSupportError2('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {supportFilePreview2 && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview2} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile2, setSupportFilePreview2)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle2}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle2)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription2}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription2)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle2Farsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle2Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription2Farsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription2Farsi)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!supportFilePreview3 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setSupportFile3(selectedFile);
                                                                setSupportFilePreview3(URL.createObjectURL(selectedFile));
                                                                setSupportError3('');
                                                            } else {
                                                                setSupportError3('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {supportFilePreview3 && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview3} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile3, setSupportFilePreview3)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle3}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle3)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription3}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription3)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle3Farsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle3Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription3Farsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription3Farsi)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <Stack className='HomeContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                        <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                        <Box>
                                            {!supportFilePreview4 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='HomeContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageHomeContent' />
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={(e) => {
                                                            const selectedFile = e.target.files[0];
                                                            if (selectedFile && ['image/jpeg', 'image/png'].includes(selectedFile.type)) {
                                                                setSupportFile4(selectedFile);
                                                                setSupportFilePreview4(URL.createObjectURL(selectedFile));
                                                                setSupportError4('');
                                                            } else {
                                                                setSupportError4('Only JPG and PNG files are allowed.');
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            }
                                            {supportFilePreview4 && (
                                                <Stack className=''>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview4} className='HomeContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile4, setSupportFilePreview4)} className='EditIconHomeContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle4}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle4)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription4}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription4)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='HomeContentGridMarginLeft'>
                                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportTitle4Farsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportTitle4Farsi)}
                                                variant="standard"
                                                fullWidth
                                                InputProps={{ disableUnderline: true }}

                                            />
                                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='HomeContentInputFiled'
                                                value={supportDescription4Farsi}
                                                onChange={(e) => handleChangeSupport(e, setSupportDescription4Farsi)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack className='HomeContentFieldCreateBlog' style={{ marginBottom: '3%' }}>
                                <Stack className='HomeContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCancelButton'
                                        onClick={handleCloseHomeEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='HomeContentFormCreateButton'
                                        onClick={editContentSupport}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>

            <Loader loader={loader} setLoader={setLoader} />

        </div>
    )
}

export default HomeContentEdit
