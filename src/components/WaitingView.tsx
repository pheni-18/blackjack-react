import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
    marginTop: 300,
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
                alignItems='center'
                justifyContent='center'
            >
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