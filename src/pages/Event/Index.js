import { Typography, Grid, Box, Button } from '@material-ui/core';
import EventDataTable from 'components/Event/DataTable';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EventIndexPage = () => {
  const [defaultEvent, setDefaultEvent] = useState('');

  const getDefaultEvent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/settings'
      );

      console.log(response);
      setDefaultEvent(response.data.data.defaultEvent);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateDefaultEvent = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/v1/settings/default-event',
        { defaultEvent: defaultEvent }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDefaultEvent();
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={2} lg={1}>
          <Typography variant='h4'>กิจกรรม</Typography>
        </Grid>
        <Grid item xs={3} lg={3}>
          <Box display='flex'>
            <TextField
              value={defaultEvent}
              variant='outlined'
              id='outlined-basic'
              label='id กิจกรรมมาตรฐาน'
              fullWidth
              onChange={(e) => setDefaultEvent(e.target.value)}
            />
            <Button
              onClick={() => updateDefaultEvent()}
              variant='contained'
              color='secondary'
              size='large'
            >
              บันทึก
            </Button>
          </Box>
        </Grid>
        <Grid item xs={7} lg={8} align='end'>
          <Button
            href='/event/create'
            variant='contained'
            color='primary'
            size='large'
          >
            สร้างกิจกรรม
          </Button>
        </Grid>
        <Grid item md={12}>
          <Box mt={2}>
            <EventDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EventIndexPage;
