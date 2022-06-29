import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { People, GameStatus, GameResult } from '../types';
import { ResultArea } from './ResultArea';
import { PeopleArea } from './PeopleArea';

const StyledDiv = styled('div')({
    textAlign: 'center',
});

const StyledButton = styled(Button)({
    width: 80,
    marginLeft: 10,
    marginRight: 10,
});
  

export interface PlayingViewProps {
    gameStatus: GameStatus;
    player: People;
    dealer: People;
    onClickHit: () => void;
    onClickStand: () => void;
    onClickMoreGame: () => void;
    gameResult?: GameResult;
};

export const PlayingView: React.FC<PlayingViewProps> = (props) => {
    const { gameStatus, player, dealer, onClickHit, onClickStand, onClickMoreGame, gameResult } = props;

    return (
        <>
            <Grid 
                container
                alignItems='center'
                justifyContent='center'
            >
                {(gameStatus == 'finished' && !!gameResult) && (
                    <Grid item xs={8}>
                        <ResultArea
                            gameResult={gameResult}
                            onClickMoreGame={onClickMoreGame}
                        />
                    </Grid>
                )}
                <Grid item xs={8}>
                    <PeopleArea
                        people={dealer}
                        name={'Dealer'}
                    />
                </Grid>
                <Grid item xs={8}>
                    {gameStatus == 'player' && (
                        <StyledDiv>
                            <StyledButton
                                variant='outlined'
                                onClick={onClickHit}
                            >
                                Hit
                            </StyledButton>
                            <StyledButton
                                variant='outlined'
                                onClick={onClickStand}
                            >
                                Stand
                            </StyledButton>
                        </StyledDiv>
                    )}
                    <PeopleArea
                        people={player}
                        name={'Player'}
                    /> 
                </Grid>
            </Grid>
        </>
    );
};