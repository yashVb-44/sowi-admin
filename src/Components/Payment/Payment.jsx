import React, { useEffect, useState } from 'react';
import Header from '../../Common/Header/Header';
import './Payment.css';
import { Stack, TextField, Typography, Radio, Button } from '@mui/material';
import { usePayment } from '../../Context/PaymentContext';
import { useProjectList } from '../../Context/ProjectListContext';
import PayPal from '../../Assets/Images/Payment/PayPal.png';
import Stripe from '../../Assets/Images/Payment/Stripe.png';
import Bitcoin from '../../Assets/Images/Payment/Bitcoin.png';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardIcon from '../../Assets/Images/Payment/CardIcon.png';
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

// stripe imports 
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { postApiCaller } from '../../Lib/ApiCaller';
import { cryptoPayment, cryptoPaymentRes, paymentRes, paypalRes, stripeRes } from '../../Lib/PaymentApi';
import { useLocation, useParams } from 'react-router-dom';

import WordOfSupport from './WordOfSupport';
import AsyncTextRenderer from '../../Context/AsyncTextRenderer';
import { Alert } from '../../Common/Alert';
import { addUser } from '../../Lib/UsersApi';
import { useWordOfSupport } from '../../Context/WordOfSupportContext';
import CryptoPaymentModal from './CryptoPaymentModal';
import { useLanguage } from '../../Context/LanguageContext';
import { dashboardInfo } from '../../Lib/AdminApi';

const Payment = () => {
    const { paymentAmount, setPaymentAmount, donationAmount, setDonationAmount, selectedPg, setSelectedPg, userName, setUserName, userEmail, setUserEmail } = usePayment();
    const { projectListData, setProjectListData } = useProjectList();
    const location = useLocation();
    const { selectedLanguage } = useLanguage()


    const { donatedAmt, setDonatedAmt } = useWordOfSupport()
    const { setCryptoStatus, setCryptoTxnID } = usePayment()

    const fetchDashboard = async () => {
        await dashboardInfo()
    }
    const handleChnage = (e, setter) => {
        setter(e.target.value)
        if (setter === setUserEmail) {
            localStorage.setItem('userEmail', e.target.value)
        } else if (setter === setUserName) {
            localStorage.setItem('userName', e.target.value)
        }
    }

    const paymentGateways = [
        { name: 'PayPal', icon: PayPal },
        { name: 'Stripe', icon: Stripe },
        { name: 'Crypto Payment', icon: Bitcoin },
    ];

    const handleRadioChange = (value) => {
        setSelectedPg(value);
        // handleOpen()
    };

    useEffect(() => {
        setDonationAmount(paymentAmount);
    }, [paymentAmount, setDonationAmount]);


    // stripe payment setup 
    const [loading, setLoading] = useState(false);

    const handleStripe = async () => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const body = { amount: paymentAmount, currency: 'usd' };

            // Await the postApiCaller function call properly
            const responseData = await postApiCaller('payment/stripe', body, { headers });
            setLoading(false);

            // Redirect to the Stripe checkout page
            window.location.href = responseData.sessionUrl;
        } catch (error) {
            console.error('Error processing Stripe payment:', error);
        }
    };

    const getSessionIdFromUrl = () => {
        const params = new URLSearchParams(location.search);
        return params.get('session_id');
    };

    const handleCheckBox = () => {
        localStorage.setItem('checkBox', true)
    }

    const fetchRes = async () => {
        let sessionDataString = localStorage.getItem('projectListData')
        let name = localStorage.getItem('userName')
        let email = localStorage.getItem('userEmail')
        let checkBox = localStorage.getItem('checkBox') || 'false';
        const sessionData = JSON.parse(sessionDataString);
        setProjectListData(sessionData)
        const sessionUrl = getSessionIdFromUrl()
        let response = await stripeRes(sessionUrl)
        if (response?.statusCode === 200) {
            let amt = response?.message?.amount_received;
            let dollars = amt / 100;
            await paymentRes(sessionData?._id, 'Stripe', response?.message?.status, response?.message?.id, response?.message?.currency, dollars, response?.message?.created, name, email, checkBox)
            await addUser(response?.message?.payment_method_types[0], dollars, sessionData?._id, response?.message?.id, name, email, checkBox)
            handleOpen()
            handleClear()
            setDonatedAmt(dollars)
            fetchDashboard()
            localStorage.removeItem('checkBox')
            localStorage.removeItem('userName')
            localStorage.removeItem('userEmail')
        }
    }

    useEffect(() => {
        fetchRes()
    }, [])

    const handleCrypto = async () => {
        let response = await cryptoPayment(paymentAmount, cryptoPaymentType);
        let newTab = window.open(response?.message?.checkout_url, '_blank');
        // Continuously check the status
        let txn_id = response?.message?.txn_id
        setCryptoTxnID(txn_id)
        handleOpenCrypto()
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [cryptoOpen, setCryptoOpen] = useState(false)
    const handleCloseCrypto = () => {
        setCryptoOpen(false)
        // handleOpen()
    }
    const handleOpenCrypto = () => setCryptoOpen(true);

    const cryptoType = [
        {
            name: 'LTC'
        },
        {
            name: 'BCH'
        },
    ]

    const handleClear = () => {
        setUserName('')
        setUserEmail('')
        setPaymentAmount(0)
    }

    const [cryptoPaymentType, setCryptoPaymentType] = useState('LTC')

    return (
        <div className='PaymentBg'>
            <div className='Header'>
                <Header />
            </div>
            <Stack className='Payment'>
                <Stack className='PaymentDetail'>
                    <img src={projectListData?.documentUrl} alt='project' className='PaymentDetailImages' />
                    <Stack>
                        <Typography variant='div' className='PaymentHeadingOne' style={{ textTransform: 'capitalize' }}>
                            <AsyncTextRenderer text={projectListData?.title} />
                        </Typography>
                        {/* <Typography variant='div' className='ProjectDetailPara' style={{ textTransform: 'none' }}>
                            <AsyncTextRenderer text="Lorem ipsum dolor sit amet consectetur. A convallis velit odio" />
                        </Typography> */}
                    </Stack>
                    <Stack className='PaymenyFormFields'>
                        <div className='PaymentFields'>
                            <Typography variant="body2" color="text.secondary" className='PaymentInputLabel'>
                                {selectedLanguage === 'EN' ? 'Donation Amount' : 'مبلغ اهدا'}
                            </Typography>
                            <TextField
                                id="standard-required"
                                placeholder={selectedLanguage === 'EN' ? "Enter Donation Amount" : "مبلغ کمک مالی را وارد کنید"}
                                variant="standard"
                                className='PaymentInputFiled'
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)} // Handle change
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoneyIcon />
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true
                                }}
                            />
                        </div>
                        <div className='PaymentFileds'>
                            <Typography variant="body2" color="text.secondary" className='PaymentInputLabel'>
                                <AsyncTextRenderer text="Your Name" />
                            </Typography>

                            <TextField
                                id="standard-required"
                                placeholder={selectedLanguage === 'EN' ? 'Enter your full name' : 'نام کامل خود را وارد کنید'}
                                variant="standard"
                                className='PaymentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={userName}
                                onChange={(e) => handleChnage(e, setUserName)}
                                autoComplete='off'
                            />
                        </div>
                        <div className='PaymentFileds'>
                            <Typography variant="body2" color="text.secondary" className='PaymentInputLabel'>
                                <AsyncTextRenderer text="Your Email" />
                            </Typography>

                            <TextField
                                id="standard-required"
                                placeholder={selectedLanguage === 'EN' ? 'Enter your email' : 'ایمیل خود را وارد کنید'}
                                variant="standard"
                                type='email'
                                className='PaymentInputFiled'
                                InputProps={{ disableUnderline: true }}
                                value={userEmail}
                                onChange={(e) => handleChnage(e, setUserEmail)}
                                autoComplete='off'

                            />
                        </div>
                    </Stack>
                    <Stack className='PaymenyCardField'>
                        <Typography variant="body2" color="text.secondary" className='PaymentSubHeading'>
                            <AsyncTextRenderer text="Payment Method" />
                        </Typography>
                        <Stack className='PaymentCardInputFields'>
                            {paymentGateways.map((data, index) => (
                                <Stack className='CardRadio' key={index}>
                                    <Radio
                                        checked={selectedPg === data.name}
                                        onChange={() => handleRadioChange(data.name)}
                                        color="primary"
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: '1rem' },
                                            '&.Mui-checked': { color: '#239F40' },
                                        }}
                                    />
                                    <Stack className='CardRadioImg'>
                                        <img src={data.icon} alt={data.name} />
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" className='PaymentGateWayLabel'>
                                        <AsyncTextRenderer text={data.name} />
                                    </Typography>



                                </Stack>
                            ))}
                            {selectedPg === 'Crypto Payment' &&
                                <Stack className='CardRadioCrypto'>
                                    {cryptoType?.map((data, index) => {
                                        return (
                                            <Stack className='CardRadioCrypto'>
                                                <Radio
                                                    checked={cryptoPaymentType === data.name}
                                                    onChange={() => setCryptoPaymentType(data.name)}
                                                    color="primary"
                                                    sx={{
                                                        '& .MuiSvgIcon-root': { fontSize: '1rem' },
                                                        '&.Mui-checked': { color: '#239F40' },
                                                    }}
                                                />
                                                <Typography variant="body2" color="text.secondary" className='PaymentGateWayLabel'>
                                                    <AsyncTextRenderer text={data.name} />
                                                </Typography>
                                            </Stack>
                                        )
                                    })}
                                </Stack>
                            }

                        </Stack>
                        <Stack style={{ marginTop: '2%' }}>
                            <Stack className='CheckBoxCard' onClick={() => handleCheckBox()}>
                                <input type='checkBox' />
                                <Typography variant="body2" color="text.secondary" className='PaymentSubParaa'>
                                    <AsyncTextRenderer text="Don't display my name publicly on the fundraiser" />
                                </Typography>
                            </Stack>
                            {/* <Stack className='CheckBoxCard'>
                                <input type='checkBox' />
                                <Typography variant="body2" color="text.secondary" className='PaymentSubParaa'>
                                    <AsyncTextRenderer text="Lorem ipsum dolor sit amet consectetur. Vel volutpat lorem est bibendum. Purus quam scelerisque eget vitae feugiat sit." />
                                </Typography>
                            </Stack>
                            <Stack className='CheckBoxCard'>
                                <input type='checkBox' />
                                <Typography variant="body2" color="text.secondary" className='PaymentSubParaa'>
                                    <AsyncTextRenderer text="Lorem ipsum dolor sit amet consectetur. Vel volutpat lorem est bibendum. Purus quam scelerisque eget vitae feugiat sit." />
                                </Typography>
                            </Stack> */}
                        </Stack>
                        <Stack className='lineDivide' style={{ margin: '3% 0px' }}></Stack>
                        <Stack>
                            <Typography variant="body2" color="text.secondary" className='PaymentSubHeading'>
                                <AsyncTextRenderer text="Your Donation" />
                            </Typography>
                            <Stack className='PaymentSubTotals'>
                                <Typography variant="body2" color="text.secondary" className='PaymentParasTwo'>
                                    <AsyncTextRenderer text="Subtotal" />
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='PaymentSubTotals'>
                                    ${paymentAmount}
                                </Typography>
                            </Stack>
                            <Stack className='PaymentSubTotals'>
                                <Typography variant="body2" color="text.secondary" className='PaymentParasTwo'>
                                    <AsyncTextRenderer text="Tax" />
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='PaymentSubTotals'>
                                    $0.00
                                </Typography>
                            </Stack>
                            <Stack className='lineDivide' style={{ margin: '2% 0px' }}></Stack>
                            <Stack className='PaymentSubTotals'>
                                <Typography variant="body2" color="text.secondary" className='PaymentParasTwo'>
                                    <AsyncTextRenderer text="Total" />
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className='PaymentSubTotals'>
                                    ${paymentAmount}
                                </Typography>
                            </Stack>
                            <Stack className='PaymentCardButton'>
                                {selectedPg === 'PayPal' && (
                                    <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: 'USD' }}>
                                        <PayPalButtons
                                            fundingSource={FUNDING.PAYPAL}
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [{
                                                        amount: {
                                                            value: paymentAmount,
                                                        },
                                                    }],
                                                    application_context: {
                                                        // Disable shipping address collection
                                                        shipping_preference: 'NO_SHIPPING'
                                                    }
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                let name = localStorage.getItem('userName')
                                                let email = localStorage.getItem('userEmail')
                                                let checkBox = localStorage.getItem('checkBox') || 'false';
                                                const details = await actions.order.capture();
                                                let resDetail = details?.purchase_units[0]?.payments?.captures[0]
                                                let response = await paymentRes(projectListData?._id, 'PayPal', resDetail?.status, resDetail?.id, resDetail?.amount?.currency_code, resDetail?.amount?.value, resDetail?.create_time, name, email, checkBox)

                                                if (details.status === 'COMPLETED') {
                                                    handleClear()
                                                    handleOpen()
                                                    fetchDashboard()
                                                    localStorage.removeItem('checkBox')
                                                    await addUser('PayPal', resDetail?.amount?.value, projectListData?._id, resDetail?.id, name, email, checkBox)
                                                    setDonatedAmt(resDetail?.amount?.value)
                                                    localStorage.removeItem('checkBox')
                                                    localStorage.removeItem('userName')
                                                    localStorage.removeItem('userEmail')
                                                    // Alert("Congratulations", "Your donation has been completed successfully", "success");
                                                }
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                )}

                                {selectedPg === 'Stripe' && (
                                    <Button variant="outlined" onClick={handleStripe} sx={{ textTransform: 'none' }}>
                                        <AsyncTextRenderer text={` Pay USD${paymentAmount}`} />
                                    </Button>
                                )}
                                {selectedPg === 'Crypto Payment' && (
                                    <Button variant="outlined" onClick={handleCrypto} sx={{ textTransform: 'none' }}>
                                        <AsyncTextRenderer text={` Pay USD${paymentAmount}`} />

                                    </Button>
                                )}
                                {/* {selectedPg !== 'PayPal' && 'Stripe' && (
                                    <Button variant="outlined" onClick={() => handlePayment()} sx={{ textTransform: 'none' }}>
                                        Pay USD{paymentAmount}
                                    </Button>
                                )} */}

                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <WordOfSupport open={open} handleClose={handleClose} />
            <CryptoPaymentModal cryptoOpen={cryptoOpen} handleCloseCrypto={handleCloseCrypto} handleClear={handleClear} fetchDashboard={fetchDashboard} />
        </div>
    );
};

export default Payment;
