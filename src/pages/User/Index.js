import { Typography, Grid, Box, Button } from '@material-ui/core';
import UserDataTable from 'components/User/DataTable';

const UserIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={8} lg={6}>
          <Typography variant='h4'>สมาชิก</Typography>
        </Grid>
        <Grid item xs={4} lg={6} align='end'>
          <Button
            href='/user/create'
            variant='contained'
            color='primary'
            size='large'
          >
            เพิ่มผู้ใช้งาน
          </Button>
        </Grid>
        <Grid item md={12}>
          <Box mt={2}>
            <UserDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserIndexPage;
