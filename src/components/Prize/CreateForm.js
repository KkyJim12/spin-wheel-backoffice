import { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(8),
    },
  },
}));

const CreateForm = () => {
  const classes = useStyles();

  let history = useHistory();

  const handleUpload = () => {
    document.getElementById("hideUploadButton").click();
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");

  const uploadImage = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data);

      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/images",
        formData
      );

      setImage(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addPrize = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/v1/prize", {
        name: name,
        detail: detail,
        image: image,
      });

      history.push("/prize");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.errors);
    }
  };

  return (
    <>
      {error && (
        <div className={classes.root}>
          {error.map((item, index) => {
            return (
              <Snackbar
                key={index}
                open={true}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                autoHideDuration={3000}
                onClose={() => setError("")}
              >
                <Alert variant="filled" severity="error">
                  {item.message}
                </Alert>
              </Snackbar>
            );
          })}
        </div>
      )}
      <Card>
        <Box p={4}>
          <Box mb={2}>
            <TextField
              id="standard-basic"
              variant="outlined"
              label="ชื่อของรางวัล"
              fullWidth
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              onChange={(e) => {
                setDetail(e.target.value);
              }}
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
              name="image"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </Box>
          <Box>
            <Button
              onClick={() => addPrize()}
              variant="contained"
              color="primary"
              fullWidth
            >
              เพิ่มของรางวัล
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
