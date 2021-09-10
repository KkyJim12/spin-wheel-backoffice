import { Typography, Grid, Button } from "@material-ui/core";
import CreateForm from "components/Event/CreateForm";
const EventCreatePage = () => {
  return (
    <>
      <Grid container>
        <Grid item md="6">
          <Typography variant="h4">สร้างกิจกรรม</Typography>
        </Grid>
        <Grid item md="6" align="end">
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
      <CreateForm />
    </>
  );
};

export default EventCreatePage;
