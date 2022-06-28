import { Button, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
    marginTop: 300,
});
  

export interface WaitingViewProps {
    onClick: () => void;
};

export const WaitingView: React.FC<WaitingViewProps> = (props) => {
    const { onClick } = props;

    return (
        <>
            <Grid 
                container
                alignItems='center'
                justifyContent='center'
            >
                <StyledButton
                    variant='contained'
                    onClick={onClick}
                    size='large'
                >
                    Start
                </StyledButton>
            </Grid>
        </>
    );
};