import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import NewWidgetTemplate from './NewWidgetTemplate';
import Widget from './Widget';

const Category = ({ categoryData, handleClickOpen, removeWidget }) => {
    const containerRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const checkOverflow = () => {
        if (containerRef.current) {
            setIsOverflowing(containerRef.current.scrollWidth > containerRef.current.clientWidth);
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);

        return () => window.removeEventListener('resize', checkOverflow);
    }, [categoryData.widgets]);

    const scroll = (direction) => {
        containerRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    };

    return (
        <Box className='row' sx={{ position: 'relative', marginBottom: 1 }}>
            <Typography variant='h6' sx={{ paddingLeft: 5, fontWeight: 700, fontSize: 16 }}>{categoryData.name}</Typography>
            {isOverflowing && (
                <IconButton
                    onClick={() => scroll('left')}
                    sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            )}
            <Box
                className='categories-bg'
                ref={containerRef}
                sx={{ display: 'flex', overflowX: 'hidden', padding: 2 }}
            >
                <Box className='widgets-bg' sx={{ display: 'flex' }}>
                    {
                        categoryData.widgets.map((eachWidget) => eachWidget.isActive ? (
                            <Widget key={eachWidget.id} data={eachWidget} removeWidget={removeWidget} categoryType={categoryData.id} />
                        ) : null)
                    }
                    <NewWidgetTemplate key="new-widget" categoryType={categoryData.id} handleClickOpen={handleClickOpen} />
                </Box>
            </Box>
            {isOverflowing && (
                <IconButton
                    onClick={() => scroll('right')}
                    sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default Category;