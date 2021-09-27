import { Typography, Grid, Box, Button } from "@material-ui/core";
import CreateForm from "components/Code/CreateForm";

const CodeCreatePage = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={8} md={6}>
          <Typography variant="h4">เพิ่มโค้ด</Typography>
        </Grid>
        <Grid item xs={4} md={6} align="end">
          <Button
            href="/code"
            variant="contained"
            color="secondary"
            size="large"
          >
            กลับ
          </Button>
        </Grid>
        <Grid item md={6}>
          <Box mt={2}>
            <CreateForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CodeCreatePage;
