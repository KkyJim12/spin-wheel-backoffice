import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Background from "assets/Image/background.png";
import Button from "@material-ui/core/Button";
import axios from "axios";

const UploadBackground = (props) => {
  const handleUpload = () => {
    document.getElementById("hideBackgroundUploadButton").click();
  };

  const [image, setImage] = useState();

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  const uploadBackground = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data);

      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/images",
        formData
      );

      await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/settings/background",
        { backgroundImage: response.data.data }
      );

      setImage(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Card style={{ height: "82vh" }}>
        <Box p={5}>
          <h1>อัพโหลดพื้นหลัง (1920x1080)</h1>
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
            id="hideBackgroundUploadButton"
            style={{ display: "none" }}
            type="file"
            name="image"
            onChange={(e) => {
              uploadBackground(e.target.files[0]);
            }}
          />
          <img
            style={{ width: "40vw", height: 500, objectFit: "cover" }}
            src={
              image
                ? process.env.REACT_APP_API_URL + "/uploads/image/" + image
                : "https://via.placeholder.com/1920x1080"
            }
            alt="background"
          />
        </Box>
      </Card>
    </>
  );
};

export default UploadBackground;
