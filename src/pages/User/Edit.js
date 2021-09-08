import { Typography, Grid, Box, Button } from '@material-ui/core';
import EditForm from 'components/User/EditForm';

const UserEditPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md='6'>
          <Typography variant='h4'>เพิ่มสมาชิก</Typography>
        </Grid>
        <Grid item md='6' align='end'>
          <Button
            href='/user'
            variant='contained'
            color='secondary'
            size='large'
          >
            กลับ
          </Button>
        </Grid>
        <Grid item md='6'>
          <Box mt={2}>
            <EditForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserEditPage;
