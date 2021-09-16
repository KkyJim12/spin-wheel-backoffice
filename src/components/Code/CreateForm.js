import { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CreateForm = () => {
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

  const storeCode = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/v1/codes", {
        key: code,
      });
      history.push("/code");
    } catch (error) {
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
          <Alert variant="filled" severity="error">
            {error.key}
          </Alert>
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
              onClick={() => storeCode()}
              variant="contained"
              color="primary"
              fullWidth
            >
              เพิ่มโค๊ด
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
