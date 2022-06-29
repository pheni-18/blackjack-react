import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import { styled } from '@mui/system';
import { CardInfo, Suit } from '../types';

const StyledCard = styled(MuiCard)({
    width: 70,
    height: 100,
    margin: 2,
});


export interface CardProps {
    info: CardInfo;
};

export const Card: React.FC<CardProps> = (props) => {
    const { info } = props;

    const createIcon = (suit: Suit) => {
        switch (suit) {
            case 'spade':
                return <WbSunnyOutlinedIcon />;
            case 'heart':
                return <AcUnitOutlinedIcon />;
            case 'diamond':
                return <CloudOutlinedIcon />;
            case 'club':
                return <NightlightOutlinedIcon />;
            default:
                throw new Error('invalid suit');
        }
    };

    return (
        <StyledCard>
            <CardContent>
                {info.isShow ? (
                    <>
                        {createIcon(info.suit)}
                        <Typography variant='h4' color="text.secondary">
                            {info.number}
                        </Typography>
                    </>
                ) : (
                    <Typography variant='h4' color="text.secondary">
                        {'？'}
                    </Typography>
                )}
            </CardContent>
        </StyledCard>
    );
};