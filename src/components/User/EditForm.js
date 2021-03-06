import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { DialogActions, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { Dialog, DialogTitle } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CopyIcon from "@material-ui/icons/FileCopy";
import { isMobile } from "react-device-detect";

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
  let history = useHistory();
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/users/" + id + "/edit"
      );
      console.log(response);
      setFullname(response.data.data.fullname);
      setPhone(response.data.data.phone);
    } catch (error) {
      console.log(error.response);
    }
  };

  const generatePassword = () => {
    const genCodeNow = () => {
      return Math.random().toString(36).substr(2, 12);
    };

    let a = genCodeNow();

    let randomCode = `${a}`;

    setPassword(randomCode);
    setOpen(true);
  };

  const updateUser = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + "/api/v1/users/" + id, {
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

  // Handle Modal
  const [open, setOpen] = useState(false);

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

      {/* Modal */}
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Box mr={1}>????????????????????????????????????:</Box> <Box mr={1}>{password}</Box>{" "}
            <IconButton
              color="primary"
              aria-label="Copy password"
              onClick={() => {
                navigator.clipboard.writeText(password);
              }}
            >
              <CopyIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="primary"
          >
            ????????????
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Modal */}
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
              onClick={() => updateUser()}
              variant="contained"
              color="secondary"
              fullWidth
            >
              ??????????????????????????????????????????
            </Button>
          </Box>
        </Box>
      </Card>
      {/* Modal */}
    </>
  );
};

export default EditForm;
