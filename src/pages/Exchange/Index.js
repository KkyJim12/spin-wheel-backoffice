import { Typography, Grid, Box, Button } from "@material-ui/core";
import ExchangeDataTable from "components/Exchange/DataTable";

const ExchangeIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={6}>
          <Typography variant="h4">ประวัติการแลกของรางวัล</Typography>
        </Grid>
        <Grid item lg={12}>
          <Box>
            <ExchangeDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ExchangeIndexPage;
