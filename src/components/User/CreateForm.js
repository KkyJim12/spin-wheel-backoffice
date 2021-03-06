import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";

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
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const generatePassword = () => {
    const genCodeNow = () => {
      return Math.random().toString(36).substr(2, 12);
    };

    let a = genCodeNow();

    let randomCode = `${a}`;

    setPassword(randomCode);
  };

  const addUser = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/v1/users", {
        fullname: fullname,
        phone: phone,
        password: password,
      });

      history.push("/user");
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
              label="????????????????????????-?????????????????????"
              fullWidth
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
          </Box>
          <Box mb={2}>
            <TextField
              id="standard-basic"
              label="????????????????????????"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              inputProps={{ maxlength: 10 }}
            />
          </Box>
          <Box
            mb={2}
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
          >
            <Box flexGrow={1} mr={isMobile ? 0 : 2}>
              <TextField
                id="standard-basic"
                label="????????????????????????"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Box>

            <Box mt={isMobile ? 2 : 0}>
              <Button
                size="large"
                onClick={() => generatePassword()}
                variant="contained"
                color="secondary"
              >
                ??????????????????????????????????????????????????????????????????
              </Button>
            </Box>
          </Box>

          <Box>
            <Button
              onClick={() => addUser()}
              variant="contained"
              color="primary"
              fullWidth
            >
              ?????????????????????????????????
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
