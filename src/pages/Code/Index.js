import { Typography, Grid, Box, Button } from "@material-ui/core";
import CodeDataTable from "components/Code/DataTable";

const CodeIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md="6">
          <Typography variant="h4">โค๊ด</Typography>
        </Grid>
        <Grid item md="6" align="end">
          <Button
            href="/code/create"
            variant="contained"
            color="primary"
            size="large"
          >
            เพิ่มโค๊ด
          </Button>
        </Grid>
        <Grid item md="12">
          <Box mt={2}>
            <CodeDataTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CodeIndexPage;
