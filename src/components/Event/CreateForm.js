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
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreateForm = () => {
  // const [name, setName] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [prizeList, setPrizeList] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState([
    { id: uuidv4(), prizeValue: "", ratioValue: "" },
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

  useEffect(() => {
    getPrizeList();
  }, []);

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

    console.log(eventPrizeExchange);
  };

  const removeEventPrizeExchange = (id) => {
    setEventPrizeExchange((eventPrizeExchange) =>
      eventPrizeExchange.filter((item, i) => item.id !== id)
    );
  };

  const resetEventPrizeExchange = () => {
    setEventPrizeExchange([{ id: uuidv4() }]);
  };

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item md={6}>
          <Box mb={2} mr={2}>
            <Card>
              <Box p={4}>
                <Box mb={2}>
                  <TextField
                    id="standard-basic"
                    label="ชื่อกิจกกรม"
                    fullWidth
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    id="datetime-local"
                    label="วันสิ้นสุดกิจกรรม"
                    type="datetime-local"
                    defaultValue="2021-10-24T10:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Box>
          <Box mr={2}>
            <Card>
              <Box p={4}>
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <h1>ของรางวัลการสุ่ม</h1>
                  </Box>
                  <Box display="flex">
                    <Button
                      onClick={() => addEventPrizeRandom()}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      เพิ่มของรางวัล
                    </Button>
                    <Box ml={2}>
                      <Button
                        onClick={() => resetEventPrizeRandom()}
                        variant="contained"
                        color="secondary"
                        fullWidth
                      >
                        รีเซ็ต
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
                      <Box flexGrow={1}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            ของรางวัลการสุ่ม
                          </InputLabel>
                          <Select
                            id={item.id}
                            value={item.value}
                            onChange={(e) =>
                              setPrizeRandomSelect(e.target.value, item.id)
                            }
                          >
                            <MenuItem value={""}>กรุณาเลือกของรางวัล</MenuItem>
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
                      <Box ml={2} flexGrow={1}>
                        <TextField
                          id="standard-basic"
                          label="อัตราส่วนการได้"
                          fullWidth
                          onChange={(e) =>
                            setPrizeRandomRatio(e.target.value, item.id)
                          }
                        />
                      </Box>
                      <Box ml={2}>
                        <Button
                          onClick={() => removeEventPrizeRandom(item.id)}
                          variant="contained"
                          color="secondary"
                          fullWidth
                        >
                          ลบ
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
        <Grid item md={6}>
          <Box>
            <Card>
              <Box p={4}>
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <h1>ของรางวัลแลกเปลี่ยน</h1>
                  </Box>
                  <Box display="flex">
                    <Button
                      onClick={() => addEventPrizeExchange()}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      เพิ่มของรางวัล
                    </Button>
                    <Box ml={2}>
                      <Button
                        onClick={() => resetEventPrizeExchange()}
                        variant="contained"
                        color="secondary"
                        fullWidth
                      >
                        รีเซ็ต
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
                            ของรางวัลการสุ่ม
                          </InputLabel>
                          <Select
                            value={item.prizeValue}
                            onChange={(e) =>
                              setPrizeExchangePrize(e.target.value, item.id)
                            }
                          >
                            <MenuItem value={""}>กรุณาเลือกของรางวัล</MenuItem>
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
                            ประเภทเหรียญ
                          </InputLabel>
                          <Select
                            value={item.coinValue}
                            onChange={(e) =>
                              setPrizeExchangeCoin(e.target.value, item.id)
                            }
                          >
                            <MenuItem value={1}>เหรียญ B</MenuItem>
                            <MenuItem value={2}>เหรียญ C</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box ml={2}>
                        <TextField
                          id="standard-basic"
                          label="จำนวน"
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
                          label="ลิมิต"
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
                          ลบ
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
        <Fab href="/event" color="primary" variant="extended" aria-label="add">
          <AddIcon />
          สร้างกิจกรรม
        </Fab>
      </Box>
    </Box>
  );
};

export default CreateForm;
