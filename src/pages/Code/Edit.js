import { Typography, Grid, Box, Button } from "@material-ui/core";
import EditForm from "components/Code/EditForm";

const CodeEditPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h4">แก้ไขโค๊ด</Typography>
        </Grid>
        <Grid item md={6} align="end">
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
            <EditForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CodeEditPage;
