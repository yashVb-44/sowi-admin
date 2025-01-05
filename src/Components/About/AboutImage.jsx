import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageSec1 from '../../Assets/Images/About/ImageSec1.png';
import ImageSec2 from '../../Assets/Images/About/ImageSec2.png';
import ImageSec3 from '../../Assets/Images/About/ImageSec3.png';
import ImageSec4 from '../../Assets/Images/About/ImageSec4.png';
import ImageSec5 from '../../Assets/Images/About/ImageSec5.png';
import ImageSec6 from '../../Assets/Images/About/ImageSec6.png';

const AboutImage = () => {

    const srcset = (image, size, rows = 1, cols = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
        };
    };

    const itemData = [
        {
            img: ImageSec1,
            rows: 2,
            cols: 2,
        },
        {
            img: ImageSec2,
            rows: 2,
            cols: 1,
        },
        {
            img: ImageSec3,
            rows: 2,
            cols: 1,
        },
        {
            img: ImageSec4,
            rows: 2,
            cols: 1,
        },
        {
            img: ImageSec5,
            rows: 2,
            cols: 1,
        },
        {
            img: ImageSec6,
            rows: 2,
            cols: 2,
        },
    ];

    return (
        <div>
            <ImageList
                sx={{ marginTop: '1%', padding:'0px 10%' }} 
                variant="quilted"
                cols={4}
                rowHeight={121}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 2} style={{margin:'8px'}}>
                        <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt=''
                            loading="lazy"
                            style={{ borderRadius: '6px' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default AboutImage;
