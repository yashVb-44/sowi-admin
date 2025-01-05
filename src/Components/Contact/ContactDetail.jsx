import React from 'react';
import './Contact.css';
import { Grid, Typography } from '@mui/material';
import Heart from '../../Assets/Images/Contact/Heart.png';
import Email from '../../Assets/Images/email.png';
import Phone from '../../Assets/Images/phone.png';
import Insta from '../../Assets/Images/SocialMedia/Insta.png';
import Facebook from '../../Assets/Images/SocialMedia/Facebook.png';
import Twitter from '../../Assets/Images/SocialMedia/Twitter.png';
import Youtube from '../../Assets/Images/SocialMedia/YouTube.png';
import Linkdin from '../../Assets/Images/SocialMedia/Linkdin.png';
import Telegram from '../../Assets/Images/SocialMedia/telegram.png';
import LeftLeaf from '../../Assets/Images/Contact/LeftLeaf.png';
import RightLeaf from '../../Assets/Images/Contact/RightLeaf.png';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';

const ContactDetail = () => {
    const { selectedLanguage } = useLanguage()
    const SocialMediaImg = [
        // {
        //     image: Facebook,
        //     link: ""
        // },
        {
            image: Twitter,
            link: "https://x.com/i/flow/login?redirect_after_login=%2Fhope4_iran"
        },
        // {
        //     image: Youtube,
        //     link: ""
        // },
        {
            image: Telegram,
            link: "https://t.me/hopeForIran"
        },
    ];

    return (
        <div className='ContactDetailBg'>
            <div className='ContactDetail'>
                <Typography gutterBottom variant="h5" component="div" className='HeadingThreeContact'>
                    {getTranslation('contact.deatilHeading', selectedLanguage)}
                </Typography>
                <Typography variant="body2" color="text.secondary" className='ParaTwoContact' style={{ marginTop: '20px', marginBottom: '5%' }}>
                    {getTranslation('contact.deatilPara', selectedLanguage)}
                </Typography>
                <div className='ContactDetailText'>
                    <Typography gutterBottom variant="h5" component="div" className='HeadingThreeContact' >
                        {getTranslation('contact.contactDetails', selectedLanguage)}
                    </Typography>
                    <img src={Heart} alt='Heart' />
                </div>
                <Typography variant="body2" color="text.secondary" className='ParaTwoContact'>
                    {getTranslation('contact.deatilPara2', selectedLanguage)}
                </Typography>
            </div>

            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                <Grid item className='ContactLeaf' md={1} lg={1} style={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
                    <img src={LeftLeaf} alt='LeftLeaf' style={{ width: '120%', height: '300px', display: 'flex', justifyContent: 'start' }} />
                </Grid>
                <Grid item xs={12} md={10} lg={10} style={{ padding: '0px 40px', marginBottom: '100px' }}>
                    <div className='ConatctDetailSocial'>
                        <div>
                            <Typography variant="body2" color="text.secondary" className='SubHeadingContact'>
                                {getTranslation('contactDetail.emailText', selectedLanguage)}
                            </Typography>
                            <div className='ContactInfoSocial'>
                                <div className='ContactInfo'>
                                    <img src={Email} alt='Email' />
                                    <Typography variant="body2" color="text.secondary" className='SubParaContact'>
                                        {getTranslation('contactDetail.email', selectedLanguage)}
                                    </Typography>
                                </div>
                                <div className='ContactInfo'>
                                    <img src={Email} alt='Email' />
                                    <Typography variant="body2" color="text.secondary" className='SubParaContact'>
                                        {getTranslation('contactDetail.email2', selectedLanguage)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Typography variant="body2" color="text.secondary" className='SubHeadingContact'>
                                {getTranslation('contactDetail.phoneText', selectedLanguage)}
                            </Typography>
                            <div className='ContactInfoSocial'>
                                <div className='ContactInfo'>
                                    <img src={Phone} alt='Email' />
                                    <Typography variant="body2" color="text.secondary" className='SubParaContact'>
                                        {getTranslation('contactDetail.Phone', selectedLanguage)}
                                    </Typography>
                                </div>
                                <div className='ContactInfo'>
                                    <img src={Phone} alt='Email' />
                                    <Typography variant="body2" color="text.secondary" className='SubParaContact'>
                                        {getTranslation('contactDetail.Phone2', selectedLanguage)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Typography variant="body2" color="text.secondary" className='SubHeadingContact'>
                                {getTranslation('contactDetail.socialMedia', selectedLanguage)}
                            </Typography>
                            <div className='SocialIcon'>
                                {SocialMediaImg.map((data, index) => {
                                    return (
                                        <div key={index} onClick={() => window.open(data.link, '_blank')} className='ContactInfo'>
                                            <img src={data.image} alt='Social Media' style={{ cursor: 'pointer' }} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item className='ContactLeaf' md={1} lg={1} style={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>

                    <img src={RightLeaf} alt='RightLeaf' style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'end' }} />
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactDetail;
