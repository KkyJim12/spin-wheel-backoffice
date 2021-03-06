import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import moment from "moment";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/ALert";
import { makeStyles } from "@material-ui/core/styles";
import { ColorPicker, createColor } from "material-ui-color";
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
  let initDate = moment().add(5, "days").format("YYYY-MM-DD");
  const [name, setName] = useState("");
  const [endDate, setEndDate] = useState(initDate);
  const [prizeList, setPrizeList] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState([
    {
      id: uuidv4(),
      prizeValue: "",
      ratioValue: "",
      colorValue: "black",
    },
  ]);
  const [eventPrizeExchange, setEventPrizeExchange] = useState([
    {
      id: uuidv4(),
      prizeValue: "",
      coinValue: "",
      qtyValue: "",
      limitValue: "",
    },
  ]);
  const [error, setError] = useState([]);

  useEffect(() => {
    getPrizeList();
  }, []);

  const setPrizeRandomColor = (value, id) => {
    for (let i = 0; i < eventPrizeRandom.length; i++) {
      if (eventPrizeRandom[i].id === id) {
        let newArr = [...eventPrizeRandom];
        newArr[i].colorValue = value;
        setEventPrizeRandom(newArr);
        break;
      }
    }
    console.log(eventPrizeRandom);
  };

  const setPrizeRandomSelect = (value, id) => {
    for (let i = 0; i < eventPrizeRandom.length; i++) {
      if (eventPrizeRandom[i].id === id) {
        let newArr = [...eventPrizeRandom];
        newArr[i].prizeValue = value;
        setEventPrizeRandom(newArr);
        break;
      }
    }
  };

  const setPrizeRandomRatio = (value, id) => {
    for (let i = 0; i < eventPrizeRandom.length; i++) {
      if (eventPrizeRandom[i].id === id) {
        let newArr = [...eventPrizeRandom];
        newArr[i].ratioValue = value;
        setEventPrizeRandom(newArr);
        break;
      }
    }
  };

  const getPrizeList = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/prize"
      );

      setPrizeList(response.data.data);
      console.log(prizeList);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Event Prize Random

  const addEventPrizeRandom = () => {
    const newField = {
      id: uuidv4(),
      prizeValue: "",
      ratioValue: "",
      colorValue: "black",
    };
    setEventPrizeRandom((eventPrizeRandom) => [...eventPrizeRandom, newField]);
  };

  const removeEventPrizeRandom = (id) => {
    setEventPrizeRandom((eventPrizeRandom) =>
      eventPrizeRandom.filter((item, i) => item.id !== id)
    );
  };

  const resetEventPrizeRandom = () => {
    setEventPrizeRandom([{ id: uuidv4() }]);
  };

  // Event Prize Exchange

  const setPrizeExchangePrize = (value, id) => {
    for (let i = 0; i < eventPrizeExchange.length; i++) {
      if (eventPrizeExchange[i].id === id) {
        let newArr = [...eventPrizeExchange];
        newArr[i].prizeValue = value;
        setEventPrizeExchange(newArr);
        break;
      }
    }
  };

  const setPrizeExchangeCoin = (value, id) => {
    for (let i = 0; i < eventPrizeExchange.length; i++) {
      if (eventPrizeExchange[i].id === id) {
        let newArr = [...eventPrizeExchange];
        newArr[i].coinValue = value;
        setEventPrizeExchange(newArr);
        break;
      }
    }
  };

  const setPrizeExchangeQty = (value, id) => {
    for (let i = 0; i < eventPrizeExchange.length; i++) {
      if (eventPrizeExchange[i].id === id) {
        let newArr = [...eventPrizeExchange];
        newArr[i].qtyValue = value;
        setEventPrizeExchange(newArr);
        break;
      }
    }
  };

  const setPrizeExchangeLimit = (value, id) => {
    for (let i = 0; i < eventPrizeExchange.length; i++) {
      if (eventPrizeExchange[i].id === id) {
        let newArr = [...eventPrizeExchange];
        newArr[i].limitValue = value;
        setEventPrizeExchange(newArr);
        break;
      }
    }
  };

  const addEventPrizeExchange = () => {
    const newField = {
      id: uuidv4(),
      prizeValue: "",
      coinValue: "",
      qtyValue: "",
      limitValue: "",
    };
    setEventPrizeExchange((eventPrizeExchange) => [
      ...eventPrizeExchange,
      newField,
    ]);
  };

  const removeEventPrizeExchange = (id) => {
    setEventPrizeExchange((eventPrizeExchange) =>
      eventPrizeExchange.filter((item, i) => item.id !== id)
    );
  };

  const resetEventPrizeExchange = () => {
    setEventPrizeExchange([{ id: uuidv4() }]);
  };

  const addEvent = async () => {
    try {
      console.log(eventPrizeRandom);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/v1/events",
        {
          name: name,
          endDate: endDate,
          eventPrizeRandom: eventPrizeRandom,
          eventPrizeExchange: eventPrizeExchange,
        }
      );

      history.push("/event");
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
      <Box mt={2}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Box mb={2} mr={2}>
              <Card>
                <Box p={4}>
                  <Box mb={2}>
                    <TextField
                      id="standard-basic"
                      label="?????????????????????????????????"
                      fullWidth
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      id="datetime-local"
                      label="???????????????????????????????????????????????????"
                      type="date"
                      defaultValue={endDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Box>
                </Box>
              </Card>
            </Box>
            <Box mr={2} mb={3}>
              <Card>
                <Box p={4}>
                  <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                      <h1>????????????????????????????????????????????????</h1>
                    </Box>
                    <Box display="flex">
                      <Button
                        onClick={() => addEventPrizeRandom()}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        ??????????????????????????????????????????
                      </Button>
                      <Box ml={2}>
                        <Button
                          onClick={() => resetEventPrizeRandom()}
                          variant="contained"
                          color="secondary"
                          fullWidth
                        >
                          ??????????????????
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  <Box my={3}>
                    <Divider />
                  </Box>
                  {/*  */}
                  {eventPrizeRandom.map((item, index) => {
                    return (
                      <Box
                        key={item.id}
                        display="flex"
                        alignItems="center"
                        mb={2}
                      >
                        <Box style={{ width: 200 }} flexGrow={1}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              ????????????????????????????????????????????????
                            </InputLabel>
                            <Select
                              id={item.id}
                              value={item.value}
                              onChange={(e) =>
                                setPrizeRandomSelect(e.target.value, item.id)
                              }
                            >
                              <MenuItem value={""}>
                                ?????????????????????????????????????????????????????????
                              </MenuItem>
                              {prizeList.map((item, index) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box ml={2}>
                          <TextField
                            id="standard-basic"
                            label="?????????????????????????????????????????????"
                            fullWidth
                            onChange={(e) =>
                              setPrizeRandomRatio(e.target.value, item.id)
                            }
                            type="number"
                          />
                        </Box>
                        <Box alignSelf="end">%</Box>
                        <Box alignSelf="end" ml={2}>
                          <ColorPicker
                            value={item.colorValue}
                            onChange={(value) => {
                              setPrizeRandomColor("#" + value.hex, item.id);
                            }}
                            hideTextfield
                          />
                        </Box>
                        <Box ml={2}>
                          <Button
                            onClick={() => removeEventPrizeRandom(item.id)}
                            variant="contained"
                            color="secondary"
                            fullWidth
                          >
                            ??????
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}

                  {/*  */}
                </Box>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box>
              <Card>
                <Box p={4}>
                  <Box display="flex" mt={isMobile ? 2 : 0} alignItems="center">
                    <Box flexGrow={1}>
                      <h1>?????????????????????????????????????????????????????????</h1>
                    </Box>
                    <Box display="flex">
                      <Button
                        onClick={() => addEventPrizeExchange()}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        ??????????????????????????????????????????
                      </Button>
                      <Box ml={2}>
                        <Button
                          onClick={() => resetEventPrizeExchange()}
                          variant="contained"
                          color="secondary"
                          fullWidth
                        >
                          ??????????????????
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  <Box my={3}>
                    <Divider />
                  </Box>
                  {/*  */}
                  {eventPrizeExchange.map((item, index) => {
                    return (
                      <Box
                        key={item.id}
                        display="flex"
                        alignItems="center"
                        mb={2}
                      >
                        <Box style={{ width: 250 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              ????????????????????????????????????????????????
                            </InputLabel>
                            <Select
                              value={item.prizeValue}
                              onChange={(e) =>
                                setPrizeExchangePrize(e.target.value, item.id)
                              }
                            >
                              <MenuItem value={""}>
                                ?????????????????????????????????????????????????????????
                              </MenuItem>
                              {prizeList.map((item, index) => {
                                return (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box ml={2} style={{ width: 250 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              ????????????????????????????????????
                            </InputLabel>
                            <Select
                              value={item.coinValue}
                              onChange={(e) =>
                                setPrizeExchangeCoin(e.target.value, item.id)
                              }
                            >
                              <MenuItem value={1}>?????????????????????????????????</MenuItem>
                              <MenuItem value={2}>???????????????????????????</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box ml={2}>
                          <TextField
                            id="standard-basic"
                            label="???????????????"
                            fullWidth
                            type="number"
                            onChange={(e) =>
                              setPrizeExchangeQty(e.target.value, item.id)
                            }
                          />
                        </Box>
                        <Box ml={2} flexShrink={1}>
                          <TextField
                            id="standard-basic"
                            label="???????????????"
                            fullWidth
                            type="number"
                            onChange={(e) =>
                              setPrizeExchangeLimit(e.target.value, item.id)
                            }
                          />
                        </Box>
                        <Box ml={2} flexShrink={1}>
                          <Button
                            onClick={() => removeEventPrizeExchange(item.id)}
                            variant="contained"
                            color="secondary"
                            fullWidth
                          >
                            ??????
                          </Button>
                        </Box>
                      </Box>
                    );
                  })}

                  {/*  */}
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Box
          style={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
        >
          <Fab
            onClick={() => addEvent()}
            color="primary"
            variant="extended"
            aria-label="add"
          >
            ???????????????????????????????????????
          </Fab>
        </Box>
      </Box>
    </>
  );
};

export default CreateForm;
