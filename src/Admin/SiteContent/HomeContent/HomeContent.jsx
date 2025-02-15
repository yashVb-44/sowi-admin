import React, { useEffect, useState } from 'react';
import './HomeContent.css';
import { Grid, Typography, Button, Stack, TextField, Box } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import HomeContentEdit from './HomeContentEdit';
import './HomeContent.css'
import { getHomeContent, getSupportContent } from '../../../Lib/HomeContent';
import { useContent } from '../../../Context/ContentContext';

const HomeContent = () => {

    const { homeContentAdmin, fetchHomeContent, fetchSupportContent, supportContentEn, supportContentFa, missionContentEn, missionContentFa } = useContent();

    const [openHomeEdit, setOpenHomeEdit] = useState(false);
    const handleOpenHomeEdit = () => setOpenHomeEdit(true);
    const handleCloseHomeEdit = () => {
        setOpenHomeEdit(false)
    }

    useEffect(() => {
        fetchHomeContent()
        fetchSupportContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        Home Content
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>
                    <Stack>
                        <Stack>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Hero Banner</Typography>
                                <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                            </Stack>
                            <Typography className='HomeContentHeadingThree'>Sub Title 1</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.heroBanner?.subTitle1}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}
                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.heroBanner?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Sub Title 2</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.heroBanner?.subTitle2}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack>
                    <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>
                    <Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Top Image</Typography>

                            <Stack className='PreviewUpload'>
                                <Box className='PreviewUploadImageContainer'>
                                    <img src={homeContentAdmin?.heroBannerImg} className='PreviewUploadImage' alt="Preview" />
                                    <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='EditIconAddProject' />
                                </Box>
                            </Stack>

                        </Stack>
                    </Stack>

                    <Stack className='BorderBottom' sx={{ margin: '1% 0px' }}></Stack>

                    {/* mission content  */}
                    <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>We’re On A Mission Of Big Changes</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={handleOpenHomeEdit} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack className='HomeContentTopMar'>
                            <Grid item container>
                                <Grid item xs={12} sx={12} md={12} lg={12}>
                                    <Stack>
                                        <Typography className='HomeContentHeadingThree'>Heading</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={missionContentEn?.heading}
                                            variant="standard"
                                            fullWidth
                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Typography className='HomeContentHeadingThree'>Description</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={missionContentEn?.para}
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sx={12} md={12} lg={12}>
                                    <Stack>
                                        <Typography className='HomeContentHeadingThree'>سرفصل</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={missionContentFa?.heading}
                                            variant="standard"
                                            fullWidth
                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                        />
                                    </Stack>
                                    <Stack>
                                        <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                        <TextField
                                            className='HomeContentInputFiled'
                                            value={missionContentFa?.para}
                                            variant="standard"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            InputProps={{ disableUnderline: true, readOnly: true }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>

                            {['mission1', 'mission2', 'mission3', 'mission4'].map((missionKey, index) => {
                                const dataEn = []
                                const dataFa = []

                                return (
                                    <Grid item container key={index} style={{ marginTop: '1%' }}>
                                        <Grid item xs={12} sx={12} md={2} lg={1} className='HomeContentSupportIcon HomeContentMarginImage'>
                                            <Typography className='HomeContentHeadingThree'>Icon</Typography>
                                            <Box>
                                                <Stack>
                                                    <Box className='HomeContentPreviewUploadImageContainer'>
                                                        {dataEn &&
                                                            <img
                                                                src={dataEn[`icon${index + 1}`]}
                                                                className='HomeContentPreviewUploadImage'
                                                                alt={`Mission Icon ${index + 1}`}
                                                            />
                                                        }
                                                        <img
                                                            src={EditIcon}
                                                            alt='Edit Icon'
                                                            onClick={handleOpenHomeEdit}
                                                            className='EditIconHomeContent'
                                                        />
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={10} sx={12} md={10} lg={11}>
                                            <Stack className='HomeContentGridMarginLeft'>
                                                <Typography className='HomeContentHeadingThree'>Number</Typography>
                                                <TextField
                                                    className='HomeContentInputFiled'
                                                    value={dataEn?.number}
                                                    variant="standard"
                                                    fullWidth
                                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                                />
                                                <Typography className='HomeContentHeadingThree'>Description</Typography>
                                                <TextField
                                                    className='HomeContentInputFiled'
                                                    value={dataEn?.description}
                                                    variant="standard"
                                                    fullWidth
                                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                                />
                                            </Stack>
                                            {dataFa && (
                                                <Stack className='HomeContentGridMarginLeft'>
                                                    <Typography className='HomeContentHeadingThree'>عدد</Typography>
                                                    <TextField
                                                        className='HomeContentInputFiled'
                                                        value={dataFa?.number}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true, readOnly: true }}
                                                    />
                                                    <Typography className='HomeContentHeadingThree'>شرح</Typography>
                                                    <TextField
                                                        className='HomeContentInputFiled'
                                                        value={dataFa?.description}
                                                        variant="standard"
                                                        fullWidth
                                                        InputProps={{ disableUnderline: true, readOnly: true }}
                                                    />
                                                </Stack>
                                            )}
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Stack>
                    </Stack>

                    {/* part 0  */}
                    <Stack className='HomeContentTopMar'>
                        <Stack>
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>Part 0 (Support Our Mission, Change Lives Today) </Typography>
                                <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                            </Stack>
                            <Stack>
                                <Typography className='HomeContentHeadingThree'>Heading</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={homeContentAdmin?.en?.part0?.title}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                                <Typography className='HomeContentHeadingThree'>Sub Heading</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={homeContentAdmin?.en?.part0?.description}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                        </Stack>
                        <Stack className='BorderBottom'></Stack>
                        <Stack >
                            <Stack className='HomeContentEditBtn'>
                                <Typography className='HomeContentHeadingTwo'>قسمت 0 (از ماموریت ما حمایت کنید، امروز زندگی را تغییر دهید)</Typography>
                                <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                            </Stack>
                            <Stack >
                                <Typography className='HomeContentHeadingThree'>سرفصل</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={homeContentAdmin?.fa?.part0?.title}
                                    variant="standard"
                                    fullWidth
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                                <Typography className='HomeContentHeadingThree'>عنوان فرعی</Typography>
                                <TextField
                                    className='HomeContentInputFiled'
                                    value={homeContentAdmin?.fa?.part0?.description}
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    InputProps={{ disableUnderline: true, readOnly: true }}
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Part 1 */}
                    <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>Part 1</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.part1?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.part1?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack>
                    <Stack className='BorderBottom'></Stack>
                    <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>قسمت 1</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.fa?.part1?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.fa?.part1?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack>

                    {/* Part 2 */}
                    {/* <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>Part 2</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.part2?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.part2?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack>
                    <Stack className='BorderBottom'></Stack>
                    <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>قسمت 2</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.fa?.part2?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.fa?.part2?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack> */}

                    {/* Part 3 */}
                    {/* <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>Part 3</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Title</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.part3?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>Description</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.en?.part3?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack>
                    <Stack className='BorderBottom'></Stack>
                    <Stack className='HomeContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingTwo'>قسمت 3</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenHomeEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>عنوان</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.fa?.part3?.title}
                                variant="standard"
                                fullWidth
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                        <Stack>
                            <Typography className='HomeContentHeadingThree'>شرح</Typography>
                            <TextField
                                className='HomeContentInputFiled'
                                value={homeContentAdmin?.fa?.part3?.description}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{ disableUnderline: true, readOnly: true }}

                            />
                        </Stack>
                    </Stack> */}

                    {/* Part 4 */}
                    
                </Stack>
            </Grid>
            <HomeContentEdit openHomeEdit={openHomeEdit} handleCloseHomeEdit={handleCloseHomeEdit} />

        </div>
    );
}

export default HomeContent;
