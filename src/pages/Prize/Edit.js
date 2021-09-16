import { Typography, Grid, Box, Button } from "@material-ui/core";
import EditForm from "components/Prize/EditForm";

const PrizeEditPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="h4">แก้ไขของรางวัล</Typography>
        </Grid>
        <Grid item md={6} align="end">
          <Button
            href="/prize"
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

export default PrizeEditPage;
