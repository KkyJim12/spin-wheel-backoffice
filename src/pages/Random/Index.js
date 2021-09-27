import { Typography, Grid, Box, Button } from "@material-ui/core";
import RandomDataTable from "components/Random/DataTable";

const RandomIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md="6">
          <Typography variant="h4">ประวัติการสุ่ม</Typography>
        </Grid>
        <Grid item md="12">
          <Box mt={2}>
            <RandomDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RandomIndexPage;
