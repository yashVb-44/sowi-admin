import { Button, Typography, Grid, Stack } from '@mui/material'
import React from 'react'
import './Contact.css'
import PlaceIcon from '@mui/icons-material/Place';
import WorldImage from '../../Assets/Images/Contact/WorldImage.png'
import LocationIcon from '../../Assets/Images/location.png'
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../Context/ContentContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';
import { useLanguage } from '../../Context/LanguageContext';

const Location = () => {

    const navigate = useNavigate()

    const { contactData } = useContent()
    const { selectedLanguage } = useLanguage()


    return (
        <div>

            <div className='Location'>
                <Typography gutterBottom variant="h5" component="div" className='HeadingThreeContact'>
                    {getTranslation('contact.locationHeading', selectedLanguage)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }} className='ParaTwoContact'>
                    {getTranslation('contact.locationPara', selectedLanguage)}
                </Typography>

                <Grid container className='LocationDetail'>
                    {contactData?.map((data, index) => {
                        return (
                            <Grid sx={12} md={4} lg={4} key={index}>
                                <img src={`https://flagcdn.com/${data.countryCode.toLowerCase()}.svg`} alt={`${data.countryCode} flag`} className='ContactFlag' />
                                <Typography variant="body2" color="text.secondary" className='SubHeadingContact' >
                                {data?.countryName}
                                </Typography>
                                <Stack className='LocationText'>
                                    <img src={LocationIcon} alt='Location' />
                                    <Typography variant="body2" color="text.secondary" className='SubParaContact'>
                                    {data?.address} {data?.pinCode}
                                    </Typography>
                                </Stack>
                            </Grid>
                        )
                    })}
                </Grid>

                <div className='DonateButtonContact' style={{ border: 'none' }}>
                    <Button variant="contained" sx={{ textTransform: 'none' }} onClick={() => navigate('/project')}> {getTranslation('button.donate', selectedLanguage)}  </Button>
                </div>
            </div>
            <div className='WorldImage'>
                <img src={WorldImage} alt='World Image' />
            </div>
        </div>
    )
}

export default Location
