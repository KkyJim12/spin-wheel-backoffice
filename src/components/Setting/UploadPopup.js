import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Popup from "assets/Image/popup.png";
import Button from "@material-ui/core/Button";
import axios from "axios";

const UploadPopup = (props) => {
  const handleUpload = () => {
    document.getElementById("hidePopupUploadButton").click();
  };

  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  const uploadPopup = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data);

      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/images",
        formData
      );

      await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/settings/pop-up",
        { popupImage: response.data.data }
      );

      setImage(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Card style={{ height: "35vh" }}>
        <Box p={5}>
          <h1>อัพโหลดป๊อปอัพ (800x600)</h1>
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
            id="hidePopupUploadButton"
            style={{ display: "none" }}
            type="file"
            name="image"
            onChange={(e) => {
              uploadPopup(e.target.files[0]);
            }}
          />
          <Box>
            <img
              style={{ width: "40vw", height: 150, objectFit: "cover" }}
              src={
                image
                  ? process.env.REACT_APP_API_URL + "/uploads/image/" + image
                  : "https://via.placeholder.com/800x600"
              }
              alt="popup"
            />
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default UploadPopup;
