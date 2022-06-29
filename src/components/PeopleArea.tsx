import { Box, Typography } from '@mui/material';
import { People } from '../types';
import { Card } from './Card';

export interface PeopleAreaProps {
    people: People;
    name: string;
};

export const PeopleArea: React.FC<PeopleAreaProps> = (props) => {
    const { people, name } = props;

    return (
        <Box
            sx={{
                width: '100%',
                height: 300,
                textAlign: 'center',
                paddingTop: 2,
            }}
        >
            <Typography variant='h3'>{name}</Typography>
            {people.blackjack && (
                <Typography variant='h5'>Blackjack!</Typography>
            )}
            {people.total > 21 && (
                <Typography variant='h5'>Burst!</Typography>
            )}
            <Typography variant='h4'>total: {people.total}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {people.hand.map((card, i) => {
                    return <Card info={card} key={i} />
                })}
            </Box>
        </Box>
    );
};