import React, { useEffect, useState } from 'react'
import Header from '../../Common/Header/Header'
import { Button, FormControl, Grid, InputAdornment, LinearProgress, OutlinedInput, Stack, Typography, linearProgressClasses, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Human from '../../Assets/Images/ProjectList/Human.png'
import Donate from '../../Assets/Images/ProjectList/Donate.png'
import Email from '../../Assets/Images/ProjectList/Email.png'
import Calender from '../../Assets/Images/ProjectList/Calender.png'
import ShareModal from '../../Common/ShareModal'
import { getImageSrc, getProjectId } from '../../Lib/ProjectApi'
import { usePayment } from '../../Context/PaymentContext'
import { dateMonth, formatNumber } from '../../Lib/ApiCaller'
import { getSupport } from '../../Lib/WordOfSupport'
import './ProjectDetail.css'
import { useProjectList } from '../../Context/ProjectListContext';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const ProjectDetail = () => {

    const { id } = useParams();
    let projectId
    if (id) {
        projectId = id

    } else {
        let dat = JSON.parse(localStorage.getItem('projectListData'));
        projectId = dat?._id
    }

    const { selectedLanguage } = useLanguage()
    const { paymentAmount, setPaymentAmount } = usePayment();
    const { projectListData, setProjectListData } = useProjectList();
    const navigate = useNavigate();
    const [progressValue, setProgressValue] = useState(0);
    const [showFullContent, setShowFullContent] = useState(false);
    const [selectedAmt, setSelectedAmt] = useState(25);
    const [selectedButton, setSelectedButton] = useState('oneTime');
    const [supportData, setSupportData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(2);
    const [open, setOpen] = useState(false);

    const donateAmtJson = [{ amt: 25 }, { amt: 50 }, { amt: 100 }, { amt: 200 }, { amt: 250 }];

    const fetchProjectById = async () => {
        try {
            const response = await getProjectId(projectId);
            if (response?.data) {
                if (selectedLanguage === 'EN') {
                    setProjectListData(response.data.en);
                } else {
                    setProjectListData(response.data.fa);
                }
                // const raisedPercentage = (response.data.currentAmount / response.data.goalAmount) * 100;
                const raisedPercentage = Math.min((response?.data?.en?.currentAmount ?? 0) / (response?.data?.en?.goalAmount ?? 1) * 100, 100);
                setProgressValue(raisedPercentage);
            }
            else {

            }
        } catch (error) {
        }
    };

    const fetchWordSupport = async () => {
        const dat = localStorage.getItem('projectListData');
        const storedData = JSON.parse(dat);
        try {
            const response = await getSupport(storedData._id);
            if (response?.statusCode === 200) {
                setSupportData(response.data);
            }
        } catch (error) {
            // console.error('Error fetching words of support:', error);
        }
    };

    useEffect(() => {
        fetchProjectById();
    }, [selectedLanguage]);

    useEffect(() => {
        fetchWordSupport();
    }, [projectListData, selectedLanguage]);

    const handleAmtClick = (amt) => {
        setSelectedAmt(amt);
    };

    const handleAmtChange = (e) => {
        setSelectedAmt(e.target.value);
    };

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#239F40' : '#308fe8',
        },
    }));

    const handleDoateButton = () => {
        navigate('/payment');
        setPaymentAmount(selectedAmt);
    };

    const handleShowMore = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
    };

    const handleShowLess = () => {
        setVisibleItems(2);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div className='ProjectDetailBg'>
                <div className='Header'>
                    <Header />
                </div>
                <Stack className='ProjectDetail'>
                    <Grid container>
                        <Grid xs={8} md={8} lg={11}>
                            <Typography gutterBottom variant="h5" component="div" className='ProjectDetailText' sx={{ textTransform: 'capitalize' }}>
                            {projectListData?.categoryId?.map((data) => data?.title).join(', ')}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize', }} className='ProjectHeadingOne'>
                                {projectListData?.title}
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid container spacing={4} >
                        <Grid item xs={12} sx={12} md={7} lg={8}>
                            <img src={projectListData?.documentUrl} className='ProjectDetailImage' />
                            <Typography component="div" sx={{ textTransform: 'capitalize' }} className='ProjectDetailParaa'>
                                {showFullContent ?
                                    <span> {projectListData?.description} </span> :
                                    <span>{projectListData?.description.slice(0, 1000)}</span>
                                }
                            </Typography>
                            <Stack className='ProjectDetailButton'>
                                <Button
                                    variant="text"
                                    className=''
                                    sx={{
                                        textTransform: 'capitalize',
                                        '& .MuiButton-endIcon': {
                                            marginLeft: '4px', // Adjust margin as needed
                                        }
                                    }}
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => setShowFullContent(!showFullContent)} // Toggle show full content
                                >
                                    {showFullContent ? <> {getTranslation('projectListDetail.hide', selectedLanguage)} </> : <> {getTranslation('projectListDetail.learn', selectedLanguage)} </>}
                                </Button>
                            </Stack>
                            {projectListData?.status === 'active' &&
                                <Grid container spacing={2} className='ProjectDetailButtonDonate'>
                                    <Grid item xs={6} sx={6} md={6} lg={6}>
                                        <Button variant='contained' style={{ textTransform: 'none' }} className='ProjectDetailDonateBtn' onClick={handleDoateButton} > {getTranslation('button.donate', selectedLanguage)} </Button>
                                    </Grid>
                                    <Grid item xs={6} sx={6} md={6} lg={6}>
                                        <Button variant='contained' style={{ textTransform: 'none' }} className='ProjectDetailDonateBtnShare' onClick={handleOpen}> {getTranslation('button.share', selectedLanguage)} </Button>
                                    </Grid>
                                </Grid>
                            }
                            <Grid container spacing={2} className='ProjectDetailOrganiser dottedLine'>
                                <Grid item xs={12} sx={6} md={4} lg={4}>
                                    <Stack className='ProjectDetailHuman'>
                                        <Typography component="div" className='ProjectDetailOrganiserText' >{getTranslation('projectListDetail.organizer', selectedLanguage)}</Typography>
                                        <Stack className='ProjectDetailOrganiserHuman'>
                                            <img src={Human} alt='Human' style={{ backgroundColor: '#F1EFFD' }} />
                                            <Stack className='ProjectDetailTextDetail'>
                                                <Typography component="div" className='ProjectDetailOrganiserName' > {projectListData?.organiserName} </Typography>
                                                <Typography component="div" className='ProjectDetailOrganiserDesc' > {projectListData?.organisationName} </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sx={6} md={4} lg={5}>
                                    <Stack className='ProjectDetailHuman'>
                                        <Typography component="div" className='ProjectDetailOrganiserText' >{getTranslation('projectListDetail.contact', selectedLanguage)}</Typography>
                                        <Stack className='ProjectDetailOrganiserHuman'>
                                            <img src={Email} alt='Email' style={{ backgroundColor: '#FFFAEB' }} />
                                            <Typography
                                                component="div"
                                                className='ProjectDetailOrganiserDesc'
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    margin:'auto 0px'
                                                }} 
                                                data-tooltip-id="email" data-tooltip-content={projectListData?.email}                                               
                                            >
                                                {projectListData?.email}
                                            </Typography>

                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sx={6} md={4} lg={3}>
                                    <Stack className='ProjectDetailHuman TopMarginCreated' >
                                        <Stack className='ProjectDetailOrganiserHuman'>
                                            <img src={Calender} alt='Calender' style={{ backgroundColor: '#EFFDF3' }} />
                                            <Stack className='ProjectDetailTextDetail'>
                                                <Typography component="div" className='ProjectDetailOrganiserDesc' >{dateMonth(projectListData?.createdAt)}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Stack className='dottedLine' style={{ marginTop: '10px', padding: '0px' }}>
                            </Stack>
                            <Grid container spacing={2}>
                                <Stack className='ProjectDetailWordSupport'>
                                    <Typography component="div" className='ProjectDetailOrganiserText'>
                                        {getTranslation('projectListDetail.wordSupport', selectedLanguage)}
                                         {/* ({supportData?.length}) */}
                                    </Typography>
                                    {supportData?.length > 0 ? (
                                        supportData.slice(0, visibleItems).map((data, index) => (
                                            <Stack key={index} className='ProjectDetailDonate'>
                                                <img src={Donate} alt='Human' />
                                                <Stack className='ProjectDetailDonateDetail'>
                                                    <Typography component="div" className='ProjectDetailDonateText'>
                                                        <AsyncTextRenderer text={data?.name} />
                                                    </Typography>
                                                    <Stack className='ProjectDetailDonateFlex'>
                                                        <Typography component="div" className='ProjectDetailDonateFlexRupee'>
                                                            $ {formatNumber(data?.donatedAmount)}
                                                        </Typography>
                                                        <Stack className='divideline'></Stack>
                                                        <Typography component="div" className='ProjectDetailDonateFlexDay'>
                                                            <AsyncTextRenderer text={data?.createdAt} />
                                                        </Typography>
                                                    </Stack>
                                                    <Typography component="div" className='ProjectDetailDonateFlexPara'>
                                                        <AsyncTextRenderer text={data?.description} />
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        ))
                                    ) : (
                                        <Typography>{getTranslation('projectListDetail.noRecord', selectedLanguage)}</Typography>
                                    )}
                                </Stack>
                            </Grid>
                            <Stack className='ProjectDetailDonateBtnShowMore'>
                                {supportData?.length > visibleItems ? (
                                    <Button
                                        variant='contained'
                                        style={{ textTransform: 'none' }}
                                        className='ProjectDetailDonateBtnShowMore'
                                        onClick={handleShowMore}
                                    >
                                        {getTranslation('projectListDetail.showMore', selectedLanguage)}
                                    </Button>
                                ) : (
                                    supportData?.length > 2 && (
                                        <Button
                                            variant='contained'
                                            style={{ textTransform: 'none' }}
                                            className='ProjectDetailDonateBtnShowMore'
                                            onClick={handleShowLess}
                                        >
                                            {getTranslation('projectListDetail.showLess', selectedLanguage)}
                                        </Button>
                                    )
                                )}
                            </Stack>
                            <Typography component="div" className='ProjectDetailDonateCreatedDate' > {`${getTranslation('common.Created', selectedLanguage)} ${dateMonth(projectListData?.createdAt)}`}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={12} md={5} lg={4}>
                            <Stack className='ProjectDetailRight'>
                                <Stack style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component='div' className='DonateCount'> {`${projectListData?.totalPeople} ${getTranslation('common.Donations', selectedLanguage)}`}</Typography>
                                    <img src={getImageSrc(projectListData)} alt='' style={{ width: '40px', height: '40px' }} />
                                </Stack>
                                <Stack className='DonateAmt'>
                                    <Typography component='div' className='RaisedAmt'>$ {`${formatNumber(projectListData?.currentAmount)} ${getTranslation('common.Raised', selectedLanguage)}`}</Typography>
                                    <Typography component='div' className='TargetAmt'>{getTranslation('common.of', selectedLanguage)} $ {`${formatNumber(projectListData?.goalAmount)} ${getTranslation('common.target', selectedLanguage)}`}</Typography>
                                </Stack>
                                <Stack spacing={2} sx={{ flexGrow: 1 }} style={{ margin: '8px 0px' }}>
                                    <BorderLinearProgress variant="determinate" value={progressValue} />
                                </Stack>
                                <Typography component='div' className='PeopleCount'> {`${projectListData?.totalPeople} ${getTranslation('projectListDetail.peopleMadeDonation', selectedLanguage)}`}</Typography>
                                <Stack className='DonateAmtSample'>
                                    {donateAmtJson.map((data, index) => (
                                        <Typography
                                            key={index}
                                            component='div'
                                            className={`DonateAmtSampleInput ${selectedAmt === data.amt ? 'selected' : ''}`}
                                            onClick={() => handleAmtClick(data.amt)}
                                        >
                                            $ {data.amt}
                                        </Typography>
                                    ))}
                                </Stack>
                                <Stack className='DonateAmtInputText'>
                                    <FormControl fullWidth>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            className='AmtInputField'
                                            value={selectedAmt}
                                            onChange={handleAmtChange}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack className='DonateAmtButton'>
                                    <Button
                                        variant='contained'
                                        className={`OneTimePayment ${selectedButton === 'oneTime' ? 'selected' : ''}`}
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => setSelectedButton('oneTime')}
                                    >
                                        {getTranslation('button.oneTime', selectedLanguage)}
                                    </Button>
                                    <Button
                                        variant='contained'
                                        className={`MonthlyPayment ${selectedButton === 'monthly' ? 'selected' : ''}`}
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => setSelectedButton('monthly')}
                                    >
                                        {getTranslation('button.monthly', selectedLanguage)}
                                    </Button>
                                </Stack>
                                <Typography component='div' className='PeopleCount'>{getTranslation('projectListDetail.para2', selectedLanguage)}</Typography>
                                {/*  showing button when projects are active */}
                                {projectListData?.status === 'active' &&
                                    <Stack className='DonateShare'>
                                        <Button
                                            variant='contained'
                                            className={`ProjectDonateButton ${selectedButton === 'oneTime' ? 'selected' : ''}`}
                                            sx={{ textTransform: 'none' }}
                                            onClick={handleDoateButton}
                                        >
                                            {getTranslation('button.donate', selectedLanguage)}
                                        </Button>
                                        <Button
                                            variant='contained'
                                            className={`ProjectShareButton ${selectedButton === 'monthly' ? 'selected' : ''}`}
                                            sx={{ textTransform: 'none' }}
                                            onClick={handleOpen}
                                        >
                                            {getTranslation('button.share', selectedLanguage)}
                                        </Button>
                                    </Stack>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
                <ShareModal open={open} handleClose={handleClose} projectId={projectListData?._id} />
                <Tooltip id="email" />
            </div>
        </div>
    )
}

export default ProjectDetail;
