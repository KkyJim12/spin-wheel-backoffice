import { Typography, Grid, Box, Button } from "@material-ui/core";
import EventDataTable from "components/Event/DataTable";

const EventIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h4">กิจกรรม</Typography>
        </Grid>
        <Grid item md={6} align="end">
          <Button
            href="/event/create"
            variant="contained"
            color="primary"
            size="large"
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
