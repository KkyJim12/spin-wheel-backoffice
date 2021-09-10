import { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

const PrizeToExchange = () => {
  const prizeToExchange = (
    <Box display="flex" alignItems="center" mb={2}>
      <Box flexGrow={1}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            ของรางวัลการสุ่ม
          </InputLabel>
          <Select value={30}>
            <MenuItem value={10}>Ronaldo</MenuItem>
            <MenuItem value={20}>Messi</MenuItem>
            <MenuItem value={30}>Neymar</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box ml={2} flexGrow={1}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">ปรเภทเหรียญ</InputLabel>
          <Select value={30}>
            <MenuItem value={20}>เหรียญ B</MenuItem>
            <MenuItem value={30}>เหรียญ C</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box ml={2} flexGrow={1}>
        <TextField id="standard-basic" label="จำนวน" fullWidth />
      </Box>
      <Box ml={2} flexGrow={1}>
        <TextField id="standard-basic" label="ลิมิต" fullWidth />
      </Box>
      <Box ml={2}>
        <Button variant="contained" color="secondary" fullWidth>
          ลบ
        </Button>
      </Box>
    </Box>
  );

  const [prizeToExchangeCount, setprizeToExchangeCount] = useState([
    prizeToExchange,
  ]);
  const addPrizeToExchange = () => {
    setprizeToExchangeCount((prizeToExchangeCount) => [
      ...prizeToExchangeCount,
      prizeToExchange,
    ]);
  };

  const resetPrizeToExchange = () => {
    setprizeToExchangeCount((prizeToExchangeCount) => [prizeToExchange]);
  };

  return (
    <Card>
      <Box p={4}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <h1>ของรางวัลการแลก</h1>
          </Box>
          <Box display="flex">
            <Button
              onClick={() => addPrizeToExchange()}
              variant="contained"
              color="primary"
              fullWidth
            >
              เพิ่มของรางวัลการแลก
            </Button>
            <Box ml={2}>
              <Button
                onClick={() => resetPrizeToExchange()}
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
        <Box>{prizeToExchangeCount}</Box>
      </Box>
    </Card>
  );
};

export default PrizeToExchange;
