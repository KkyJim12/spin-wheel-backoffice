import { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/ALert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(8),
    },
  },
}));

const EditForm = () => {
  const classes = useStyles();
  let history = useHistory();
  const [name, setName] = useState('');
  const [endDate, setEndDate] = useState('2021-10-24T10:30');
  const [prizeList, setPrizeList] = useState([]);
  const [eventPrizeRandom, setEventPrizeRandom] = useState([
    { id: uuidv4(), prizeValue: '', ratioValue: '', colorValue: '' },
  ]);
  const [eventPrizeExchange, setEventPrizeExchange] = useState([
    {
      id: uuidv4(),
      prizeValue: '',
      coinValue: '',
      qtyValue: '',
      limitValue: '',
    },
  ]);

  useEffect(() => {
    getPrizeList();
    getEvent();
  }, []);
  const [error, setError] = useState([]);

  let { id } = useParams();

  const getEvent = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/events/' + id + '/edit'
      );

      let newEventPrizeRandom = response.data.data.eventPrizeRandom;

      for (let i = 0; i < newEventPrizeRandom.length; i++) {
        newEventPrizeRandom[i].prizeValue = newEventPrizeRandom[i].prizeId;
        delete newEventPrizeRandom[i].prizeId;
        newEventPrizeRandom[i].ratioValue = newEventPrizeRandom[i].randomRatio;
        delete newEventPrizeRandom[i].randomRatio;
        newEventPrizeRandom[i].colorValue = newEventPrizeRandom[i].color;
        delete newEventPrizeRandom[i].color;
      }

      setEventPrizeRandom(newEventPrizeRandom);

      let newEventPrizeExchange = response.data.data.eventPrizeExchange;

      for (let i = 0; i < newEventPrizeExchange.length; i++) {
        newEventPrizeExchange[i].prizeValue = newEventPrizeExchange[i].prizeId;
        delete newEventPrizeExchange[i].prizeId;
        newEventPrizeExchange[i].coinValue = newEventPrizeExchange[i].coinType;
        delete newEventPrizeExchange[i].coinType;
        newEventPrizeExchange[i].qtyValue = newEventPrizeExchange[i].quantity;
        delete newEventPrizeExchange[i].quantity;
        newEventPrizeExchange[i].limitValue = newEventPrizeExchange[i].limit;
        delete newEventPrizeExchange[i].limit;
      }

      setEventPrizeExchange(newEventPrizeExchange);
      setName(response.data.data.event.name);
      setEndDate(
        moment(response.data.data.event.endDate).format('YYYY-MM-DDTHH:mm:ss')
      );
      setEventPrizeExchange(response.data.data.eventPrizeExchange);
    } catch (error) {
      console.log(error.response);
    }
  };

  const setPrizeRandomColor = (value, id) => {
    for (let i = 0; i < eventPrizeRandom.length; i++) {
      if (eventPrizeRandom[i].id === id) {
        let newArr = [...eventPrizeRandom];
        newArr[i].colorValue = value;
        setEventPrizeRandom(newArr);
        break;
      }
    }
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
        process.env.REACT_APP_API_URL + '/api/v1/prize'
      );

      setPrizeList(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Event Prize Random

  const addEventPrizeRandom = () => {
    const newField = {
      id: uuidv4(),
      prizeValue: '',
      ratioValue: '',
      colorValue: '',
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
      prizeValue: '',
      coinValue: '',
      qtyValue: '',
      limitValue: '',
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

  const updateEvent = async () => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + '/api/v1/events/' + id,
        {
          name: name,
          endDate: endDate,
          eventPrizeRandom: eventPrizeRandom,
          eventPrizeExchange: eventPrizeExchange,
        }
      );

      history.push('/event');
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
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                autoHideDuration={3000}
                onClose={() => setError('')}
              >
                <Alert variant='filled' severity='error'>
                  {item.message}
                </Alert>
              </Snackbar>
            );
          })}
        </div>
      )}
      <Box mt={2}>
        <Grid container>
          <Grid item md={6}>
            <Box mb={2} mr={2}>
              <Card>
                <Box p={4}>
                  <Box mb={2}>
                    <TextField
                      id='standard-basic'
                      label='ชื่อกิจกรรม'
                      fullWidth
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      id='datetime-local'
                      label='วันสิ้นสุดกิจกรรม'
                      type='datetime-local'
                      defaultValue={endDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                    />
                  </Box>
                </Box>
              </Card>
            </Box>
            <Box mr={2}>
              <Card>
                <Box p={4}>
                  <Box display='flex' alignItems='center'>
                    <Box flexGrow={1}>
                      <h1>ของรางวัลการสุ่ม</h1>
                    </Box>
                    <Box display='flex'>
                      <Button
                        onClick={() => addEventPrizeRandom()}
                        variant='contained'
                        color='primary'
                        fullWidth
                      >
                        เพิ่มของรางวัล
                      </Button>
                      <Box ml={2}>
                        <Button
                          onClick={() => resetEventPrizeRandom()}
                          variant='contained'
                          color='secondary'
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
                        display='flex'
                        alignItems='center'
                        mb={2}
                      >
                        <Box style={{ width: 200 }} flexGrow={1}>
                          <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                              ของรางวัลการสุ่ม
                            </InputLabel>
                            <Select
                              id={item.prizeValue}
                              value={item.prizeValue}
                              onChange={(e) =>
                                setPrizeRandomSelect(e.target.value, item.id)
                              }
                            >
                              <MenuItem value={''}>
                                กรุณาเลือกของรางวัล
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
                        <Box ml={2} flexGrow={1}>
                          <TextField
                            id='standard-basic'
                            label='อัตราส่วนการได้'
                            fullWidth
                            onChange={(e) =>
                              setPrizeRandomRatio(e.target.value, item.id)
                            }
                            value={item.ratioValue}
                          />
                        </Box>
                        <Box ml={2} flexGrow={1}>
                          <TextField
                            id='standard-basic'
                            label='สีวงล้อ'
                            fullWidth
                            onChange={(e) =>
                              setPrizeRandomColor(e.target.value, item.id)
                            }
                            value={item.colorValue}
                          />
                        </Box>
                        <Box ml={2}>
                          <Button
                            onClick={() => removeEventPrizeRandom(item.id)}
                            variant='contained'
                            color='secondary'
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
                  <Box display='flex' alignItems='center'>
                    <Box flexGrow={1}>
                      <h1>ของรางวัลแลกเปลี่ยน</h1>
                    </Box>
                    <Box display='flex'>
                      <Button
                        onClick={() => addEventPrizeExchange()}
                        variant='contained'
                        color='primary'
                        fullWidth
                      >
                        เพิ่มของรางวัล
                      </Button>
                      <Box ml={2}>
                        <Button
                          onClick={() => resetEventPrizeExchange()}
                          variant='contained'
                          color='secondary'
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
                        display='flex'
                        alignItems='center'
                        mb={2}
                      >
                        <Box style={{ width: 250 }}>
                          <FormControl fullWidth>
                            <InputLabel id='demo-simple-select-label'>
                              ของรางวัลการสุ่ม
                            </InputLabel>
                            <Select
                              value={item.prizeValue}
                              onChange={(e) =>
                                setPrizeExchangePrize(e.target.value, item.id)
                              }
                            >
                              <MenuItem value={''}>
                                กรุณาเลือกของรางวัล
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
                            <InputLabel id='demo-simple-select-label'>
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
                            id='standard-basic'
                            label='จำนวน'
                            fullWidth
                            type='number'
                            onChange={(e) =>
                              setPrizeExchangeQty(e.target.value, item.id)
                            }
                            value={item.qtyValue}
                          />
                        </Box>
                        <Box ml={2} flexShrink={1}>
                          <TextField
                            id='standard-basic'
                            label='ลิมิต'
                            fullWidth
                            type='number'
                            onChange={(e) =>
                              setPrizeExchangeLimit(e.target.value, item.id)
                            }
                            value={item.limitValue}
                          />
                        </Box>
                        <Box ml={2} flexShrink={1}>
                          <Button
                            onClick={() => removeEventPrizeExchange(item.id)}
                            variant='contained'
                            color='secondary'
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
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }}
        >
          <Fab
            onClick={() => updateEvent()}
            color='secondary'
            variant='extended'
            aria-label='add'
          >
            <AddIcon />
            แก้ไขกิจกรรม
          </Fab>
        </Box>
      </Box>
    </>
  );
};

export default EditForm;
