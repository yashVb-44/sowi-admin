import React, { useCallback, useEffect, useState } from 'react'
import { Stack, Grid, Box, TextField, Typography, Select, MenuItem, InputAdornment, Button, Autocomplete } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SupportUs_Img_1 from '../../../Assets/Images/SupportUs/SupportUs_Img_1.png';
import SupportUs_Img_2 from '../../../Assets/Images/SupportUs/SupportUs_Img_2.png';
import SupportUs_Img_3 from '../../../Assets/Images/SupportUs/SupportUs_Img_3.png';
import SupportUs_Img_4 from '../../../Assets/Images/SupportUs/SupportUs_Img_4.png';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import CloudImage from '../../../Assets/AdminImages/CloudImgae.png'
import './AboutContent'
import teamImg from '../../../Assets/Images/About/Team1.png'
import teamImg2 from '../../../Assets/Images/About/Team2.png'
import AddTeam from './AddTeam';
import AddIcon from '@mui/icons-material/Add';
import { useContent } from '../../../Context/ContentContext';
import { updateAboutContent, updateJourneyContent } from '../../../Lib/AboutContent';
import Loader from '../../../Common/Loader';
import { Alert } from '../../../Common/Alert';
import EditTeam from './EditTeam';
import { useDropzone } from 'react-dropzone';


const AboutContentEdit = ({ openAboutEdit, handleCloseAboutEdit }) => {

    const { editAboutContent, setEditAboutContent, fetchAboutContent, fetchAboutJourney, fetchTeam, editJourneyContent, editteamData, editTeamMember, setEditTeamMember } = useContent()

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [error, setError] = useState('');
    const handleResetUpload = () => {
        setFile(null)
        setFilePreview(null)
    }

    const [teamFile, setTeamFile] = useState(null)
    const [teamFilePreview, setTeamFilePreview] = useState(null)

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

    const [part1Title, setPart1Title] = useState('')
    const [part1Desc, setPart1desc] = useState('')
    const [part1Year, setPart1Year] = useState('')

    const [part2Title, setPart2Title] = useState('')
    const [part2Desc, setPart2desc] = useState('')
    const [part2Year, setPart2Year] = useState('')

    const [part3Title, setPart3Title] = useState('')
    const [part3Desc, setPart3desc] = useState('')
    const [part3Year, setPart3Year] = useState('')

    const [part4Title, setPart4Title] = useState('')
    const [part4Desc, setPart4desc] = useState('')
    const [part4Year, setPart4Year] = useState('')
    // farsi
    const [part1TitleFarsi, setPart1TitleFarsi] = useState('')
    const [part1DescFarsi, setPart1descFarsi] = useState('')

    const [part2TitleFarsi, setPart2TitleFarsi] = useState('')
    const [part2DescFarsi, setPart2descFarsi] = useState('')

    const [part3TitleFarsi, setPart3TitleFarsi] = useState('')
    const [part3DescFarsi, setPart3descFarsi] = useState('')

    const [part4TitleFarsi, setPart4TitleFarsi] = useState('')
    const [part4DescFarsi, setPart4descFarsi] = useState('')



    const handleSupportImage = (setterFile, setterPreview) => {
        setterFile(null)
        setterPreview(null)
    }

    const handleChange = (section, field, value, lang) => {
        setEditAboutContent(prevContent => ({
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

    const handleChangeJourney = (e, setter) => {
        setter(e.target.value)
    };


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




    const generateYears = () => {
        const maxYear = new Date().getFullYear();
        const minYear = 1900;
        let years = [];
        for (let i = maxYear; i >= minYear; i--) {
            years.push(i.toString());
        }
        return years;
    };

    const yearsData = generateYears().reverse();
    const [year, setYear] = useState(yearsData[0]);


    const [openAddTeam, setOpenAddTeam] = useState(false);
    const handleOpenAddTeam = () => {
        setOpenAddTeam(true);
        handleCloseAboutEdit()
    }
    const handleCloseAddTeam = () => {
        setOpenAddTeam(false)
    }

    const [openEditTeam, setOpenEditTeam] = useState(false);
    const handleOpenEditTeam = (data) => {
        setOpenEditTeam(true);
        handleCloseAboutEdit()
        setEditTeamMember(data)
    }
    const handleCloseEditTeam = () => {
        setOpenEditTeam(false)
    }

    const [loader, setLoader] = useState(false)

    const editAbout = async () => {
        setLoader(true)
        try {
            let response = await updateAboutContent(file, editAboutContent?.en?.heroBanner, editAboutContent?.en?.part1, editAboutContent?.en?.part2, editAboutContent?.fa?.heroBanner, editAboutContent?.fa?.part1, editAboutContent?.fa?.part2, editAboutContent?._id)
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseAboutEdit()
                    fetchAboutContent()
                    Alert('Success', response?.message, 'success')
                }, 2000);
            }
            else {
                Alert('Info', response?.message, 'info')
                setLoader(false)
                handleCloseAboutEdit()
            }
        } catch (error) {
            setLoader(false)
            handleCloseAboutEdit()
        }
    }

    const editJourney = async () => {
        setLoader(true)
        try {
            let response = await updateJourneyContent(part1Title, part1Desc, part1Year, supportFile, part2Title, part2Desc, part2Year, supportFile2, part3Title, part3Desc, part3Year, supportFile3, part4Title, part4Desc, part4Year, supportFile4, part1TitleFarsi, part1DescFarsi, part2TitleFarsi, part2DescFarsi, part3TitleFarsi, part3DescFarsi, part4TitleFarsi, part4DescFarsi, editJourneyContent?._id)
            if (response?.statusCode === 200) {
                setTimeout(() => {
                    setLoader(false)
                    handleCloseAboutEdit()
                    fetchAboutJourney()
                    Alert('Success', response?.message, 'success')
                }, 2000);
            }
            else {
                Alert('Info', response?.message, 'info')
                setLoader(false)
                handleCloseAboutEdit()
            }
        } catch (error) {
            setLoader(false)
            handleCloseAboutEdit()
        }
    }

    useEffect(() => {
        setFilePreview(editAboutContent?.heroBannerImg)
        // support images
        setSupportFilePreview(editJourneyContent?.en?.part1?.icon1)
        setSupportFilePreview2(editJourneyContent?.en?.part2?.icon2)
        setSupportFilePreview3(editJourneyContent?.en?.part3?.icon3)
        setSupportFilePreview4(editJourneyContent?.en?.part4?.icon4)

        setPart1Title(editJourneyContent?.en?.part1?.title)
        setPart1desc(editJourneyContent?.en?.part1?.description)
        setPart1Year(editJourneyContent?.en?.part1?.year)

        setPart2Title(editJourneyContent?.en?.part2?.title)
        setPart2desc(editJourneyContent?.en?.part2?.description)
        setPart2Year(editJourneyContent?.en?.part2?.year)

        setPart3Title(editJourneyContent?.en?.part3?.title)
        setPart3desc(editJourneyContent?.en?.part3?.description)
        setPart3Year(editJourneyContent?.en?.part3?.year)

        setPart4Title(editJourneyContent?.en?.part4?.title)
        setPart4desc(editJourneyContent?.en?.part4?.description)
        setPart4Year(editJourneyContent?.en?.part4?.year)

        // farsi
        setPart1TitleFarsi(editJourneyContent?.fa?.part1?.title)
        setPart1descFarsi(editJourneyContent?.fa?.part1?.description)

        setPart2TitleFarsi(editJourneyContent?.fa?.part2?.title)
        setPart2descFarsi(editJourneyContent?.fa?.part2?.description)

        setPart3TitleFarsi(editJourneyContent?.fa?.part3?.title)
        setPart3descFarsi(editJourneyContent?.fa?.part3?.description)

        setPart4TitleFarsi(editJourneyContent?.fa?.part4?.title)
        setPart4descFarsi(editJourneyContent?.fa?.part4?.description)

        setTeamFilePreview(editteamData?.image)
    }, [editJourneyContent])

    return (
        <div>
            <Modal
                open={openAboutEdit}
                onClose={handleCloseAboutEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='AboutContentModal'>
                    <Stack className='AboutContentDetail'>
                        <Typography id="modal-modal-title" variant="h6" component="h2" className='AboutContentHeading'>
                            Edit
                        </Typography>
                        <Stack>
                            <CloseIcon onClick={() => handleCloseAboutEdit()} className='AboutContentCloseIcon' />
                        </Stack>
                    </Stack>
                    <Stack className='BorderLine'></Stack>
                    <Stack className='AboutContentSite'>
                        <Stack>
                            <Stack>
                                <Stack>
                                    <Stack className='AboutContentEditBtn'>
                                        <Typography className='AboutContentHeadingTwo'>Hero Banner</Typography>
                                        {/* <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' /> */}
                                    </Stack>
                                    <Typography className='AboutContentHeadingThree'>Sub Title 1</Typography>
                                    <TextField
                                        className='AboutContentInputFiled'
                                        value={editAboutContent?.en?.heroBanner?.subTitle1}
                                        onChange={(e) => handleChange('heroBanner', 'subTitle1', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='AboutContentHeadingThree'>Title</Typography>
                                    <TextField
                                        className='AboutContentInputFiled'
                                        value={editAboutContent?.en?.heroBanner?.title}
                                        onChange={(e) => handleChange('heroBanner', 'title', e.target.value, 'en')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='AboutContentHeadingThree'>Sub Title 2</Typography>
                                    <TextField
                                        className='AboutContentInputFiled'
                                        value={editAboutContent?.en?.heroBanner?.subTitle2}
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
                                    <Typography className='AboutContentHeadingThree'>عنوان فرعی 1</Typography>
                                    <TextField
                                        className='AboutContentInputFiled'
                                        value={editAboutContent?.fa?.heroBanner?.subTitle1}
                                        onChange={(e) => handleChange('heroBanner', 'subTitle1', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                    <TextField
                                        className='AboutContentInputFiled'
                                        value={editAboutContent?.fa?.heroBanner?.title}
                                        onChange={(e) => handleChange('heroBanner', 'title', e.target.value, 'fa')}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </Stack>
                                <Stack>
                                    <Typography className='AboutContentHeadingThree'>عنوان فرعی 2</Typography>
                                    <TextField
                                        className='AboutContentInputFiled'
                                        value={editAboutContent?.fa?.heroBanner?.subTitle2}
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
                                <Typography className='AboutContentHeadingThree'>Top Image</Typography>
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

                            <Stack className='AboutContentFieldCreateBlog'>
                                <Stack className='AboutContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCancelButton'
                                        onClick={handleCloseAboutEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCreateButton'
                                        onClick={editAbout}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Part 1 */}
                        <Stack className='AboutContentTopMar'>
                            <Stack className='AboutContentEditBtn'>
                                <Typography className='AboutContentHeadingTwo'>Part 1 :The Mission And Goals Of Our Organisation</Typography>
                                {/* <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenAboutEdit()} className='AboutContentEditIcon' /> */}
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Heading</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.heading}
                                    onChange={(e) => handleChange('part1', 'heading', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Sub Heading</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.subHeading}
                                    onChange={(e) => handleChange('part1', 'subHeading', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>سرفصل</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.heading}
                                    onChange={(e) => handleChange('part1', 'heading', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان فرعی</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.subHeading}
                                    onChange={(e) => handleChange('part1', 'subHeading', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.title}
                                    onChange={(e) => handleChange('part1', 'title', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.description}
                                    onChange={(e) => handleChange('part1', 'description', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.title}
                                    onChange={(e) => handleChange('part1', 'title', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.description}
                                    onChange={(e) => handleChange('part1', 'description', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.title2}
                                    onChange={(e) => handleChange('part1', 'title2', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.description2}
                                    onChange={(e) => handleChange('part1', 'description2', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.title2}
                                    onChange={(e) => handleChange('part1', 'title2', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.description2}
                                    onChange={(e) => handleChange('part1', 'description2', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>

                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.title3}
                                    onChange={(e) => handleChange('part1', 'title3', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part1?.description3}
                                    onChange={(e) => handleChange('part1', 'description3', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.title3}
                                    onChange={(e) => handleChange('part1', 'title3', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part1?.description3}
                                    onChange={(e) => handleChange('part1', 'description3', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'></Stack>

                            <Stack className='AboutContentFieldCreateBlog'>
                                <Stack className='AboutContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCancelButton'
                                        onClick={handleCloseAboutEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCreateButton'
                                        onClick={editAbout}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/* Part 2 */}
                        {/* <Stack className='AboutContentTopMar'>
                            <Stack className='AboutContentEditBtn'>
                                <Typography className='AboutContentHeadingTwo'>Part 2 : Fund Raising Trusted Charity Foundations</Typography>
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part2?.title}
                                    onChange={(e) => handleChange('part2', 'title', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part2?.description}
                                    onChange={(e) => handleChange('part2', 'description', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part2?.title}
                                    onChange={(e) => handleChange('part2', 'title', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part2?.description}
                                    onChange={(e) => handleChange('part2', 'description', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'> </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part2?.title2}
                                    onChange={(e) => handleChange('part2', 'title2', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part2?.description2}
                                    onChange={(e) => handleChange('part2', 'description2', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part2?.title2}
                                    onChange={(e) => handleChange('part2', 'title2', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part2?.description2}
                                    onChange={(e) => handleChange('part2', 'description2', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'> </Stack>

                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Title</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part2?.title3}
                                    onChange={(e) => handleChange('part2', 'title3', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>Description</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.en?.part2?.description3}
                                    onChange={(e) => handleChange('part2', 'description3', e.target.value, 'en')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part2?.title3}
                                    onChange={(e) => handleChange('part2', 'title3', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack>
                                <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                <TextField
                                    className='AboutContentInputFiled'
                                    value={editAboutContent?.fa?.part2?.description3}
                                    onChange={(e) => handleChange('part2', 'description3', e.target.value, 'fa')}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true }}
                                />
                            </Stack>
                            <Stack className='BorderBottom'> </Stack>
                            <Stack className='AboutContentFieldCreateBlog'>
                                <Stack className='AboutContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCancelButton'
                                        onClick={handleCloseAboutEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCreateButton'
                                        onClick={editAbout}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack> */}

                        {/* Part 3 */}
                        {/* <Stack className='AboutContentTopMar'>
                            <Stack className='AboutContentEditBtn'>
                                <Typography className='AboutContentHeadingTwo'>Part 3 : How It Work Journey</Typography>
                            </Stack>
                            <Stack className='AboutContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                        <Typography className='AboutContentHeadingThree'>Image</Typography>
                                        <Box>
                                            {!supportFilePreview &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='AboutContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageAboutContent' />
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
                                                    <Box className='AboutContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile, setSupportFilePreview)} className='EditIconAboutContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                    <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                                        Year
                                                    </Typography>
                                                    <Autocomplete
                                                        value={part1Year}
                                                        onChange={(event, newValue) => setPart1Year(newValue)}
                                                        options={yearsData}
                                                        getOptionLabel={(option) => option}
                                                        isOptionEqualToValue={(option, value) => option === value}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                className="AddProjectInputFiledTwo"
                                                                sx={{
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>Title</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part1Title}
                                                        onChange={(e) => handleChangeJourney(e, setPart1Title)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part1Desc}
                                                onChange={(e) => handleChangeJourney(e, setPart1desc)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>

                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part1TitleFarsi}
                                                        onChange={(e) => handleChangeJourney(e, setPart1TitleFarsi)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part1DescFarsi}
                                                onChange={(e) => handleChangeJourney(e, setPart1descFarsi)}
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
                            <Stack className='AboutContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                        <Typography className='AboutContentHeadingThree'>Image</Typography>
                                        <Box>
                                            {!supportFilePreview2 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='AboutContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageAboutContent' />
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
                                                    <Box className='AboutContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview2} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile2, setSupportFilePreview2)} className='EditIconAboutContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                    <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                                        Year
                                                    </Typography>
                                                    <Autocomplete
                                                        value={part2Year}
                                                        onChange={(event, newValue) => setPart2Year(newValue)}
                                                        options={yearsData}
                                                        getOptionLabel={(option) => option}
                                                        isOptionEqualToValue={(option, value) => option === value}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                className="AddProjectInputFiledTwo"
                                                                sx={{
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>Title</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part2Title}
                                                        onChange={(e) => handleChangeJourney(e, setPart2Title)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part2Desc}
                                                onChange={(e) => handleChangeJourney(e, setPart2desc)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part2TitleFarsi}
                                                        onChange={(e) => handleChangeJourney(e, setPart2TitleFarsi)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part2DescFarsi}
                                                onChange={(e) => handleChangeJourney(e, setPart2descFarsi)}
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
                            <Stack className='AboutContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                        <Typography className='AboutContentHeadingThree'>Image</Typography>
                                        <Box>
                                            {!supportFilePreview3 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='AboutContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageAboutContent' />
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
                                                    <Box className='AboutContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview3} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile3, setSupportFilePreview3)} className='EditIconAboutContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                    <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                                        Year
                                                    </Typography>
                                                    <Autocomplete
                                                        value={part3Year}
                                                        onChange={(event, newValue) => setPart3Year(newValue)}
                                                        options={yearsData}
                                                        getOptionLabel={(option) => option}
                                                        isOptionEqualToValue={(option, value) => option === value}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                className="AddProjectInputFiledTwo"
                                                                sx={{
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>Title</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part3Title}
                                                        onChange={(e) => handleChangeJourney(e, setPart3Title)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part3Desc}
                                                onChange={(e) => handleChangeJourney(e, setPart3desc)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part3TitleFarsi}
                                                        onChange={(e) => handleChangeJourney(e, setPart3TitleFarsi)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part3DescFarsi}
                                                onChange={(e) => handleChangeJourney(e, setPart3descFarsi)}
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
                            <Stack className='AboutContentTopMar'>
                                <Grid item container >
                                    <Grid item xs={12} sx={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                        <Typography className='AboutContentHeadingThree'>Image</Typography>
                                        <Box>
                                            {!supportFilePreview4 &&
                                                <Button
                                                    component="label"
                                                    variant="contained"
                                                    className='AboutContentFileUploadButton'
                                                >
                                                    <img src={CloudImage} alt='Cloud Image' className='CloudImageAboutContent' />
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
                                                    <Box className='AboutContentPreviewUploadImageContainer'>
                                                        <img src={supportFilePreview4} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                        <img src={EditIcon} alt='Edit Icon' onClick={() => handleSupportImage(setSupportFile4, setSupportFilePreview4)} className='EditIconAboutContent' />
                                                    </Box>
                                                </Stack>

                                            )}
                                        </Box>
                                    </Grid>


                                    <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>
                                                <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                    <Typography variant="body2" color="text.secondary" className='AddProjectInputLabel'>
                                                        Year
                                                    </Typography>
                                                    <Autocomplete
                                                        value={part4Year}
                                                        onChange={(event, newValue) => setPart4Year(newValue)}
                                                        options={yearsData}
                                                        getOptionLabel={(option) => option}
                                                        isOptionEqualToValue={(option, value) => option === value}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                className="AddProjectInputFiledTwo"
                                                                sx={{
                                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                                        border: 'none',
                                                                    },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>Title</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part4Title}
                                                        onChange={(e) => handleChangeJourney(e, setPart4Title)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>Description</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part4Desc}
                                                onChange={(e) => handleChangeJourney(e, setPart4desc)}
                                                variant="standard"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                InputProps={{ disableUnderline: true }}
                                            />
                                        </Stack>
                                        <Stack className='AboutContentGridMarginLeft'>
                                            <Grid container spacing={4}>                                            
                                                <Grid item sx={12} md={8} lg={8} style={{ marginTop: '5px' }}>
                                                    <Typography className='AboutContentHeadingThree'>عنوان</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={part4TitleFarsi}
                                                        onChange={(e) => handleChangeJourney(e, setPart4TitleFarsi)}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true }}

                                                    />
                                                </Grid>
                                            </Grid>
                                            <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                            <TextField
                                                className='AboutContentInputFiled'
                                                value={part4DescFarsi}
                                                onChange={(e) => handleChangeJourney(e, setPart4descFarsi)}
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

                            <Stack className='AboutContentFieldCreateBlog'>
                                <Stack className='AboutContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCancelButton'
                                        onClick={handleCloseAboutEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCreateButton'
                                        onClick={editJourney}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack> */}

                        {/* Part 4 */}
                        {/* <Stack className='AboutContentTopMar'>
                            <Stack className='AboutContentEditBtn'>
                                <Typography className='AboutContentHeadingTwo'>Part 4 : Meet Our Team</Typography>
                                <AddIcon onClick={() => handleOpenAddTeam()} className='AboutContentEditIcon' />
                            </Stack>

                            <Stack className='AboutContentTopMar'>
                                {editteamData?.map((data, index) => {
                                    return (
                                        <Grid item container key={index}>
                                            <Grid item xs={12} sx={12} md={2} lg={1} className='AboutContentSupportIcon AboutContentMarginImage'>
                                                <Typography className='AboutContentHeadingThree'>Image</Typography>
                                                <Box>
                                                    <Stack className=''>
                                                        <Box className='AboutContentPreviewUploadImageContainer'>
                                                            <img src={data?.image} className='AboutContentPreviewUploadImage' alt="Preview" />
                                                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenEditTeam(data)} className='EditIconAboutContent' />
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={10} sx={12} md={10} lg={11} className=''>
                                                <Stack className='AboutContentGridMarginLeft'>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                            <Typography className='AboutContentHeadingThree'>Name</Typography>
                                                            <TextField
                                                                className='AboutContentInputFiled'
                                                                value={data?.en?.name}
                                                                // onChange={(e) => handleChange('part4', 'title', e.target.value,)}
                                                                variant="standard"
                                                                fullWidth
                                                                InputProps={{ disableUnderline: true }}

                                                            />
                                                        </Grid>
                                                        <Grid item sx={12} md={8} lg={8} style={{ marginTop: '2px' }}>
                                                            <Typography className='AboutContentHeadingThree'>Designation</Typography>
                                                            <TextField
                                                                className='AboutContentInputFiled'
                                                                value={data?.en?.designation}
                                                                // onChange={(e) => handleChange('part4', 'title', e.target.value,)}
                                                                variant="standard"
                                                                fullWidth
                                                                InputProps={{ disableUnderline: true }}

                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Typography className='AboutContentHeadingThree'>Description</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={data?.en?.description}
                                                        // onChange={(e) => handleChange('part4', 'description', e.target.value,)}
                                                        variant="standard"
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        InputProps={{ disableUnderline: true }}
                                                    />
                                                </Stack>
                                                <Stack className='AboutContentGridMarginLeft'>
                                                    <Grid container spacing={4}>
                                                        <Grid item xs={12} md={4} lg={4} className='AddProjectFields'>
                                                            <Typography className='AboutContentHeadingThree'>نام</Typography>
                                                            <TextField
                                                                className='AboutContentInputFiled'
                                                                value={data?.fa?.name}
                                                                // onChange={(e) => handleChange('part4', 'title', e.target.value,)}
                                                                variant="standard"
                                                                fullWidth
                                                                InputProps={{ disableUnderline: true }}

                                                            />
                                                        </Grid>
                                                        <Grid item sx={12} md={8} lg={8} style={{ marginTop: '2px' }}>
                                                            <Typography className='AboutContentHeadingThree'>تعیین</Typography>
                                                            <TextField
                                                                className='AboutContentInputFiled'
                                                                value={data?.fa?.designation}
                                                                // onChange={(e) => handleChange('part4', 'title', e.target.value,)}
                                                                variant="standard"
                                                                fullWidth
                                                                InputProps={{ disableUnderline: true }}

                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Typography className='AboutContentHeadingThree'>شرح</Typography>
                                                    <TextField
                                                        className='AboutContentInputFiled'
                                                        value={data?.fa?.description}
                                                        // onChange={(e) => handleChange('part4', 'description', e.target.value,)}
                                                        variant="standard"
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        InputProps={{ disableUnderline: true }}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    )
                                })}
                            </Stack>

                            <Stack className='AboutContentFieldCreateBlog' style={{ marginBottom: '3%' }}>
                                <Stack className='AboutContentButtonFormSubmit'>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCancelButton'
                                        onClick={handleCloseAboutEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        className='AboutContentFormCreateButton'
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack> */}

                    </Stack>
                </Box>
            </Modal>

            <AddTeam openAddTeam={openAddTeam} handleCloseAddTeam={handleCloseAddTeam} />
            <EditTeam openEditTeam={openEditTeam} handleCloseEditTeam={handleCloseEditTeam} />
            <Loader loader={loader} setLoader={setLoader} />

        </div>
    )
}

export default AboutContentEdit
