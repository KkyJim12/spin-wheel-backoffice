import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import UploadBackground from "components/Setting/UploadBackground";
import UploadPopup from "components/Setting/UploadPopup";
import UploadBanner from "components/Setting/UploadBanner";
import { useEffect, useState } from "react";
import axios from "axios";

const SettingIndexPage = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [popUpImage, setpopUpImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  useEffect(() => {
    getSetting();
  });

  const getSetting = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/settings"
      );

      setBackgroundImage(response.data.data.backgroundImage);
      setpopUpImage(response.data.data.popUpImage);
      setBannerImage(response.data.data.bannerImage);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item md={6}>
          <Box p={2}>
            <UploadBackground image={backgroundImage} />
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box p={2}>
            <Grid container>
              <Box mb={2}>
                <Grid item md={12}>
                  <UploadPopup image={popUpImage} />
                </Grid>
              </Box>
              <Box>
                <Grid item md={12}>
                  <UploadBanner image={bannerImage} />
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
