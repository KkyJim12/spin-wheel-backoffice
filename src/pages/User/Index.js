import { Typography, Grid, Box, Button } from '@material-ui/core';
import UserDataTable from 'components/User/DataTable';

const User = () => {
  return (
    <>
      <Grid container>
        <Grid item md='6'>
          <Typography variant='h4'>สมาชิก</Typography>
        </Grid>
        <Grid item md='6' align='end'>
          <Button variant='contained' color='primary' size='large'>
            เพิ่มผู้ใช้งาน
          </Button>
        </Grid>
        <Grid item md='12'>
          <Box mt={2}>
            <UserDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default User;
