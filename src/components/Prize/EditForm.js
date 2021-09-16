import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(8),
    },
  },
}));

const EditForm = () => {
  const classes = useStyles();

  const handleUpload = () => {
    document.getElementById("hideUploadButton").click();
  };

  let history = useHistory();
  let { id } = useParams();

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

  useEffect(() => {
    getPrize();
  }, []);

  const getPrize = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/prize/" + id + "/edit"
      );
      setName(response.data.data.name);
      setDetail(response.data.data.detail);
      setImage(response.data.data.image);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updatePrize = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + "/api/v1/prize/" + id, {
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
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              onChange={(e) => setDetail(e.target.value)}
              value={detail}
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
              onClick={() => updatePrize()}
              variant="contained"
              color="secondary"
              fullWidth
            >
              แก้ไขของรางวัล
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default EditForm;
