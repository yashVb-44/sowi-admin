import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import logo from '../../Assets/Images/WhiteLogo.png';
import { Grid, Container, Typography, Link as MuiLink } from '@mui/material';
import Insta from '../../Assets/Images/SocialMedia/Insta.png';
import Facebook from '../../Assets/Images/SocialMedia/Facebook.png';
import Twitter from '../../Assets/Images/SocialMedia/Twitter.png';
import Youtube from '../../Assets/Images/SocialMedia/YouTube.png';
import Linkdin from '../../Assets/Images/SocialMedia/Linkdin.png';
import Telegram from '../../Assets/Images/SocialMedia/telegram.png'
import { getCategory } from '../../Lib/CategoryApi';
import { useFundraise } from '../../Context/FundraiseContext';
import ScrollToTop from '../../Routes/ScrollToTop';
import { useLanguage } from '../../Context/LanguageContext';
import en from '../LanguageFile/en.json'
import fa from '../LanguageFile/fa.json'
import { getTranslation } from '../LanguageFile/transalation';

const Footer = () => {
  const date = new Date();

  const { selectedLanguage } = useLanguage()

  const [socialMedia, setSocialMedia] = useState([])

  const SocialMediaImgEnglish = [
    // {
    //   image: Facebook,
    //   link: ""
    // },
    {
      name: "Twitter",
      image: Twitter,
      link: "https://x.com/i/flow/login?redirect_after_login=%2Fhope4_iran"
    },
    // {
    //   image: Youtube,
    //   link: ""
    // },
    {
      name: "Telegram",
      image: Telegram,
      link: "https://t.me/hopeForIran"
    },
  ];
  const SocialMediaImgFarsi = [
    // {
    //   image: Facebook,
    //   link: ""
    // },
    {
      name: "توییتر",
      image: Twitter,
      link: "https://x.com/i/flow/login?redirect_after_login=%2Fhope4_iran"
    },
    // {
    //   image: Youtube,
    //   link: ""
    // },
    {
      name: "تلگرام",
      image: Telegram,
      link: "https://t.me/hopeForIran"
    },
  ];

  const [pages, setPages] = useState([]);
  useEffect(() => {
    if (selectedLanguage === 'EN') {
      setPages(en.footer.pages);
      setSocialMedia(SocialMediaImgEnglish)
    } else {
      setPages(fa.footer.pages);
      setSocialMedia(SocialMediaImgFarsi)
    }
  }, [selectedLanguage]);

  const [categoryData, setCategoryData] = useState([])
  const navigate = useNavigate()
  const { setCategoryId } = useFundraise()

  const fetchCategory = async () => {
    let response = await getCategory()
    const enCategories = response?.categories?.map(cat => cat?.en);
    const faCategories = response?.categories?.map(cat => cat?.fa);
    {
      selectedLanguage === 'EN' ?
        (
          setCategoryData(enCategories)
        )
        :
        setCategoryData(faCategories)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [selectedLanguage])

  const handleNavigate = (data) => {
    navigate('/fundraise-cat')
    // let dat = JSON.stringify(data)
    localStorage.setItem('categoryId', data?._id)
    window.scrollTo(0, 0);
  };


  return (
    <div className='Footer'>
      <ScrollToTop />

      <div className="FooterSection">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="FooterLeft">
            <img src={logo} alt="Logo" />
            {/* <Typography variant="body2" color="text.secondary" className="FooterTextPara">
              {getTranslation('footer.text', selectedLanguage)}
            </Typography> */}
          </Grid>
          <Grid item xs={12} md={6} className="FooterRight">
            {/* <Container maxWidth="xl">
              <Typography variant="body2" color="text.secondary" className="FooterTextHeader">
                {getTranslation('footer.heading1', selectedLanguage)}
              </Typography>
              <div className="FooterService">
                {pages.map((page, index) => (
                  <MuiLink
                    component={Link}
                    to={`/${page.link.toLowerCase().replace(/\s+/g, '-')}`}
                    key={index}
                    className="FooterService"
                  >
                    <p> {page.name} </p>
                  </MuiLink>
                ))}
              </div>
            </Container> */}
            {/* <Container maxWidth="xl">
              <Typography variant="body2" color="text.secondary" className="FooterTextHeader">
                {getTranslation('footer.heading2', selectedLanguage)}
              </Typography>
              <div className="FooterService">
                {categoryData?.slice(0, 4)?.map((page, index) => (
                  <MuiLink
                    key={index}
                    className="FooterService"
                    onClick={() => handleNavigate(page)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <p> {page?.title} </p>
                  </MuiLink>
                ))}
              </div>
            </Container> */}
            <Container maxWidth="xl">
              <Typography variant="body2" color="text.secondary" className="FooterTextHeader">
                {getTranslation('footer.heading3', selectedLanguage)}
              </Typography>
              <div className="FooterService">
                {socialMedia?.slice(0, 4)?.map((page, index) => (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '1%' }}>
                    <div key={index} onClick={() => window.open(page.link, '_blank')} className='SocialMediaImage'>
                      <img src={page.image} alt='Social Media' style={{ cursor: 'pointer', margin:'auto 0px', height:'40px' }} />
                      {/* <MuiLink
                        key={index}
                        className="FooterService"
                        // onClick={() => handleNavigate(page)}
                        sx={{ cursor: 'pointer', margin: 'auto 0px' }}
                        style={{ margin: 'auto 0px' }}
                      >
                        <p> {page?.name} </p>
                      </MuiLink> */}
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Grid>
        </Grid>
      </div>

      <div className='FooterPrivacy'>
        {/* <div className='SocialMediaImage'>
          {socialMedia.map((data, index) => (
            <div key={index} onClick={() => window.open(data.link, '_blank')}>
              <img src={data.image} alt='Social Media' style={{ cursor: 'pointer' }} />
            </div>
          ))}
        </div> */}
        <div className='FooterPrivacyText'>
          <Link to="/privacy-policy" className='FooterPrivacyPara'>
            <Typography variant="body2" color="text.secondary" className='FooterPrivacyPara'>
              {getTranslation('footer.privacy', selectedLanguage)}
            </Typography>
          </Link>
          <div className='FooterCenterLine'></div>
          <Typography variant="body2" color="text.secondary">
            <Link to="/terms-of-use" className='FooterPrivacyPara'>
              {getTranslation('footer.terms', selectedLanguage)}
            </Link>
          </Typography>
        </div>
        <div className='FooterCopyRight'>
          <Typography variant="body2" color="text.secondary" className='FooterPrivacyCopyRight'>
            &#169; {date.getFullYear()} {getTranslation('hope4Iran', selectedLanguage)}.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Footer;
