import { Typography, Grid, Button } from '@material-ui/core';
import CreateForm from 'components/Event/CreateForm';
const EventCreatePage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={8} lg={6}>
          <Typography variant='h4'>สร้างกิจกรรม</Typography>
        </Grid>
        <Grid item xs={4} lg={6} align='end'>
          <Button
            href='/event'
            variant='contained'
            color='secondary'
            size='large'
          >
            กลับ
          </Button>
        </Grid>
      </Grid>
      <CreateForm />
    </>
  );
};

export default EventCreatePage;
