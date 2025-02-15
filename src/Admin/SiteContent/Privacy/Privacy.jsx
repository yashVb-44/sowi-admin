import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Stack, TextField, Box } from '@mui/material';
import EditIcon from '../../../Assets/AdminImages/EditIcon.png'
import './Privacy.css'
import PrivacyEdit from './PrivacyEdit';
import { useContent } from '../../../Context/ContentContext';

const Privacy = () => {

    const { settingContant, fetchSettingContent } = useContent()

    const [openPrivacyEdit, setOpenPrivacyEdit] = useState(false);
    const handleOpenPrivacyEdit = () => setOpenPrivacyEdit(true);
    const handleClosePrivacyEdit = () => {
        setOpenPrivacyEdit(false)
    }

    useEffect(() => {
        fetchSettingContent()
    }, [])

    return (
        <div className='HomeContentMang'>
            <Grid item xs={12} md={12} lg={12}>
                <Stack className='HomeContentMangText'>
                    <Typography gutterBottom variant="h5" component="div" className='HomeContentHeading'>
                        Privacy Policy
                    </Typography>
                </Stack>

                <Stack className='HomeContentSite'>

                    {/* Part 1 */}
                    <Stack className='PrivacyContentTopMar'>
                        <Stack className='HomeContentEditBtn'>
                            <Typography className='HomeContentHeadingThree'>Privacy Policy Content</Typography>
                            <img src={EditIcon} alt='Edit Icon' onClick={() => handleOpenPrivacyEdit()} className='HomeContentEditIcon' />
                        </Stack>
                        <Stack className='siteContentBorderBottom'></Stack>

                        <Stack style={{ marginTop: '1%', height: '500px', overflow: 'scroll' }}>

                            <div
                                className='HomeContentInputFiled'
                                dangerouslySetInnerHTML={{ __html: settingContant?.privacy }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>
            <PrivacyEdit openPrivacyEdit={openPrivacyEdit} handleClosePrivacyEdit={handleClosePrivacyEdit} />

        </div>
    );
}

export default Privacy;
