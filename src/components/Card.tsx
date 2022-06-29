import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import { styled } from '@mui/system';
import { CardInfo } from '../types';

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

    const createIcon = (mark: string) => {
        switch (mark) {
            case 'spade':
                return <WbSunnyOutlinedIcon />;
            case 'hurt':
                return <AcUnitOutlinedIcon />;
            case 'diamond':
                return <CloudOutlinedIcon />;
            case 'clover':
                return <NightlightOutlinedIcon />;
            default:
                throw new Error('invalid mark');
        }
    };

    return (
        <StyledCard>
            <CardContent>
                {info.isShow ? (
                    <>
                        {createIcon(info.mark)}
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