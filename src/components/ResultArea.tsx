import { Button, Box, Typography } from '@mui/material';
import { GameResult } from '../types';

export interface ResultAreaProps {
    gameResult: GameResult;
    onClickMoreGame: () => void;
};

export const ResultArea: React.FC<ResultAreaProps> = (props) => {
    const { gameResult, onClickMoreGame } = props;

    return (
        <Box
            sx={{
                width: '100%',
                height: 100,
                textAlign: 'center',
                paddingTop: 10,
            }}
        >
            <Typography variant='h2'>{gameResult}</Typography>
            <Button
                size='large'
                onClick={onClickMoreGame}
            >
                More Game
            </Button>
        </Box>
    );
};