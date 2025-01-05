import React from 'react'
import Typography from '@mui/material/Typography';
import './FundRaise.css'
import LeftLeaf from '../../Assets/Images/FundRaise/LeftLeaf.png'
import RightLeaf from '../../Assets/Images/FundRaise/RightLeaf.png'
import Heart from '../../Assets/Images/FundRaise/Heart.png'
import { Grid } from '@mui/material';
import { useContent } from '../../Context/ContentContext';
const FundRaise = () => {
    const { homeContent } = useContent()

    return (
        <div className='FundRaiseBg'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={3} className='LeftLeafFund'>
                    <div className='LeftImageFund'>
                        <img src={Heart} alt='Heart' className='HeartFund' />
                        <img src={LeftLeaf} alt='LeftLeaf' className='LeftLeafFund' />
                    </div>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <div className='FundRaise'>
                        <Typography gutterBottom variant="h5" component="div" className='FundRaiseText'>
                            {homeContent?.part1?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='FundRaisePara'>
                            {homeContent?.part1?.description}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={1} lg={1}>
                    <div className='RightImage'>
                        <img src={RightLeaf} alt='RightLeaf' />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default FundRaise
