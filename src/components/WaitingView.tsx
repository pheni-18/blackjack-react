import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledTypography = styled(Typography)({
    marginTop: 100,
});

const StyledButton = styled(Button)({
    marginTop: 200,
});
  

export interface WaitingViewProps {
    onClickStart: () => void;
};

export const WaitingView: React.FC<WaitingViewProps> = (props) => {
    const { onClickStart } = props;

    return (
        <>
            <Grid 
                container
                direction="column"
                alignItems='center'
                justifyContent='center'
            >
                <StyledTypography variant='h2'>Blackjack</StyledTypography>
                <StyledButton
                    variant='contained'
                    onClick={onClickStart}
                    size='large'
                >
                    Start
                </StyledButton>
            </Grid>
        </>
    );
};