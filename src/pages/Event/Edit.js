import { Typography, Grid, Button } from "@material-ui/core";
import EditForm from "components/Event/EditForm";

const EventEditPage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={8} lg={6}>
          <Typography variant="h4">แก้ไขกิจกรรม</Typography>
        </Grid>
        <Grid item xs={4} lg={6} align="end">
          <Button
            href="/event"
            variant="contained"
            color="secondary"
            size="large"
          >
            กลับ
          </Button>
        </Grid>
      </Grid>
      <EditForm />
    </>
  );
};

export default EventEditPage;
