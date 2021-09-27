import { Typography, Grid, Box, Button } from "@material-ui/core";
import ExchangeDataTable from "components/Exchange/DataTable";

const ExchangeIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md="6">
          <Typography variant="h4">ประวัติการแลกของรางวัล</Typography>
        </Grid>
        <Grid item md="12">
          <Box mt={2}>
            <ExchangeDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ExchangeIndexPage;
