import { Typography, Grid, Box, Button } from '@material-ui/core';
import CreateForm from 'components/Prize/CreateForm';

const PrizeCreatePage = () => {
  return (
    <>
      <Grid container>
        <Grid item md='6'>
          <Typography variant='h4'>เพิ่มของรางวัล</Typography>
        </Grid>
        <Grid item md='6' align='end'>
          <Button
            href='/prize'
            variant='contained'
            color='secondary'
            size='large'
          >
            กลับ
          </Button>
        </Grid>
        <Grid item md='6'>
          <Box mt={2}>
            <CreateForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PrizeCreatePage;
