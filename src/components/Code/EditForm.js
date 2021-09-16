import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const EditForm = () => {
  const history = useHistory();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const generateCode = () => {
    const genCodeNow = () => {
      return Math.random().toString(36).substr(2, 12);
    };

    let a = genCodeNow();
    let b = genCodeNow();
    let c = genCodeNow();

    let randomCode = `${a}-${b}-${c}`;

    setCode(randomCode);
  };
  const { id } = useParams();

  useEffect(() => {
    getCode();
  }, []);

  const getCode = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/codes/" + id + "/edit"
      );

      setCode(response.data.data.key);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateCode = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + "/api/v1/codes/" + id, {
        key: code,
      });
      history.push("/code");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.errors[0]);
    }
  };

  return (
    <>
      {error.key && (
        <Snackbar
          open={true}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={3000}
          onClose={() => setError("")}
        >
          <Alert severity="error">{error.key}</Alert>
        </Snackbar>
      )}
      <Card>
        <Box p={4}>
          <Box display="flex" mb={2}>
            <Box flexGrow={1} mr={2}>
              <TextField
                value={code}
                variant="outlined"
                id="outlined-basic"
                label="รหัสเติม"
                fullWidth
                onChange={(e) => setCode(e.target.value)}
              />
            </Box>
            <Button
              onClick={() => generateCode()}
              variant="contained"
              color="secondary"
            >
              สร้างรหัสอัตโนมัติ
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => updateCode()}
              variant="contained"
              color="secondary"
              fullWidth
            >
              แก้ไขโค๊ด
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default EditForm;
