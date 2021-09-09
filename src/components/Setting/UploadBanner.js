import { useState } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Banner from "assets/Image/banner.png";
import Button from "@material-ui/core/Button";

const UploadBanner = () => {
  const handleUpload = () => {
    document.getElementById("hideUploadButton").click();
  };

  const [image, setImage] = useState("");

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
            id="hideUploadButton"
            style={{ display: "none" }}
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Box>
            <img
              style={{ width: "40vw", height: 150, objectFit: "cover" }}
              src={Banner}
              alt="background"
            />
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default UploadBanner;
