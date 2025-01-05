import React from 'react'
import { Typography } from '@mui/material'

const Footer = () => {

    const date = new Date()

    return (
        <div className='AdminFooter'>
            <Typography className='AdminFooterText' style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                &#169; Copyright {date.getFullYear()}. All rights reserved.
            </Typography>
        </div>

        
    )
}

export default Footer
