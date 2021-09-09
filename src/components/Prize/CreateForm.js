import { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const CreateForm = () => {
  const handleUpload = () => {
    document.getElementById("hideUploadButton").click();
  };

  const [image, setImage] = useState("");

  return (
    <>
      <Card>
        <Box p={4}>
          <Box mb={2}>
            <TextField
              id="standard-basic"
              variant="outlined"
              label="ชื่อของรางวัล"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="outlined-multiline-static"
              variant="outlined"
              label="รายละเอียด"
              fullWidth
              multiline
              rows={5}
            />
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Button
              onClick={() => handleUpload()}
              variant="contained"
              color="primary"
            >
              อัพโหลดรูป
            </Button>
            <Box ml={2}>{image}</Box>
            <input
              id="hideUploadButton"
              style={{ display: "none" }}
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Box>
          <Box>
            <Button href="/prize" variant="contained" color="primary" fullWidth>
              เพิ่มของรางวัล
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
