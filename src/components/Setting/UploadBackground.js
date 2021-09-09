import { useState } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Background from "assets/Image/background.png";
import Button from "@material-ui/core/Button";

const UploadBackground = () => {
  const handleUpload = () => {
    document.getElementById("hideUploadButton").click();
  };

  const [image, setImage] = useState("");

  return (
    <>
      <Card style={{ height: "82vh" }}>
        <Box p={5}>
          <h1>อัพโหลดพื้นหลัง</h1>
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
            id="hideUploadButton"
            style={{ display: "none" }}
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <img
            style={{ width: "40vw", height: 500, objectFit: "cover" }}
            src={Background}
            alt="background"
          />
        </Box>
      </Card>
    </>
  );
};

export default UploadBackground;
