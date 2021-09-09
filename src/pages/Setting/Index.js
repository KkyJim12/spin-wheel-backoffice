import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import UploadBackground from "components/Setting/UploadBackground";
import UploadPopup from "components/Setting/UploadPopup";
import UploadBanner from "components/Setting/UploadBanner";

const SettingIndexPage = () => {
  return (
    <>
      <Grid container>
        <Grid item md="6">
          <Box p={2}>
            <UploadBackground />
          </Box>
        </Grid>
        <Grid item md="6">
          <Box p={2}>
            <Grid container>
              <Box mb={2}>
                <Grid item md="12">
                  <UploadPopup />
                </Grid>
              </Box>
              <Box>
                <Grid item md="12">
                  <UploadBanner />
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingIndexPage;
