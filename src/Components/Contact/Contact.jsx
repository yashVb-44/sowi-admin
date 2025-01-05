import React from 'react';
import './Contact.css';
import Hand from '../../Assets/Images/Contact/Hand.png';
import { Grid, Typography, capitalize } from '@mui/material';
import Header from '../../Common/Header/Header';
import ContactForm from './ContactForm';
import Location from './Location';
import ContactDetail from './ContactDetail';
import { useLanguage } from '../../Context/LanguageContext';
import { getTranslation } from '../../Common/LanguageFile/transalation';

const Contact = () => {

  const { selectedLanguage } = useLanguage()

  return (
    <div className='Contact'>
      <div className='ContactBg'>
        <div className='Header'>
          <Header />
        </div>

        <div className=''>
          <Grid container spacing={1}>
            <Grid item sx={12} md={9} lg={9} className='ContactText'>
              <Typography gutterBottom variant="h5" component="div" className='ContactUS'>
                {selectedLanguage === 'EN' ? 'Contact Us' : 'با ما تماس بگیرید'}
              </Typography>
              <Typography sx={{ textTransform: 'uppercase' }} gutterBottom variant="h5" component="div" className='HeadingOne'>
                {getTranslation('contact.heading', selectedLanguage)}
              </Typography>
              <Typography variant="body2" color="text.secondary" className='ParaContact'>
                {getTranslation('contact.para', selectedLanguage)}
              </Typography>
            </Grid>
            <Grid item md={3} lg={3}>
              <div className='HandImage'>
                <img src={Hand} alt='Hand' />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <ContactForm />
      <Location />
      <ContactDetail />
    </div>
  );
};

export default Contact;
