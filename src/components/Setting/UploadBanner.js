import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Banner from "assets/Image/banner.png";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { isMobile } from "react-device-detect";

const UploadBanner = (props) => {
  const handleUpload = () => {
    document.getElementById("hideBannerUploadButton").click();
  };

  const [image, setImage] = useState();
  const [bannerLink, setBannerLink] = useState("");

  useEffect(() => {
    setImage(props.image);
    setBannerLink(props.bannerLink);
  }, [props.image, props.bannerLink]);

  const uploadBanner = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data);

      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/images",
        formData
      );

      await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/settings/banner",
        { bannerImage: response.data.data }
      );

      setImage(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const uploadLink = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/settings/banner-link",
        { bannerLink: bannerLink }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Card style={{ height: isMobile ? "100vh" : "45vh" }}>
        <Box p={5}>
          <h1>อัพโหลดแบนเนอร์ (1110x160)</h1>
          <Box display="flex" alignItems="center" mb={2}>
            <Button
              onClick={() => handleUpload()}
              variant="contained"
              color="primary"
            >
              อัพโหลดรูป
            </Button>
          </Box>
          <input
            id="hideBannerUploadButton"
            style={{ display: "none" }}
            type="file"
            name="image"
            onChange={(e) => {
              uploadBanner(e.target.files[0]);
            }}
          />
          <Box>
            <img
              style={{ width: "40vw", height: 150, objectFit: "cover" }}
              src={
                image
                  ? process.env.REACT_APP_API_URL + "/uploads/image/" + image
                  : "https://via.placeholder.com/1110x160"
              }
              alt="banner"
            />
          </Box>
          <Box mt={3} display="flex">
            <TextField
              id="outlined-basic"
              label="ลิงค์"
              variant="outlined"
              fullWidth
              placeholder="https://google.co.th"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
            />
            <Button
              onClick={() => uploadLink()}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default UploadBanner;
