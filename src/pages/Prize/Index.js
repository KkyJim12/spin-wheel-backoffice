import { Typography, Grid, Box, Button } from "@material-ui/core";
import PrizeDataTable from "components/Prize/DataTable";

const PrizeIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md="6">
          <Typography variant="h4">ของรางวัล</Typography>
        </Grid>
        <Grid item md="6" align="end">
          <Button
            href="/prize/create"
            variant="contained"
            color="primary"
            size="large"
          >
            เพิ่มของรางวัล
          </Button>
        </Grid>
        <Grid item md="12">
          <Box mt={2}>
            <PrizeDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PrizeIndexPage;
