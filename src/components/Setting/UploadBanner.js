import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Banner from "assets/Image/banner.png";
import Button from "@material-ui/core/Button";
import axios from "axios";

const UploadBanner = (props) => {
  const handleUpload = () => {
    document.getElementById("hideBannerUploadButton").click();
  };

  const [image, setImage] = useState();

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

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

  return (
    <>
      <Card style={{ height: "40vh" }}>
        <Box p={5}>
          <h1>อัพโหลดแบนเนอร์</h1>
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
              style={{ width: "40vw", height: 500, objectFit: "cover" }}
              src={
                image
                  ? process.env.REACT_APP_API_URL + "/uploads/image/" + image
                  : Banner
              }
              alt="banner"
            />
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default UploadBanner;
