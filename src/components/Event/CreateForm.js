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
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PrizeToExchange from "components/Event/PrizeToExchange";

const CreateForm = () => {
  const prizeToGet = (
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
        <TextField id="standard-basic" label="อัตราส่วนการได้" fullWidth />
      </Box>
      <Box ml={2}>
        <Button variant="contained" color="secondary" fullWidth>
          ลบ
        </Button>
      </Box>
    </Box>
  );

  const addPrizeToGet = () => {
    setPrizeToGetCount((prizeToGetCount) => [...prizeToGetCount, prizeToGet]);
  };

  const resetPrizeToGet = () => {
    setPrizeToGetCount((prizeToGetCount) => [prizeToGet]);
  };

  const [prizeToGetCount, setPrizeToGetCount] = useState([prizeToGet]);

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item md="6">
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
                      onClick={() => addPrizeToGet()}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      เพิ่มของรางวัล
                    </Button>
                    <Box ml={2}>
                      <Button
                        onClick={() => resetPrizeToGet()}
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
                <Box>
                  {prizeToGetCount.map((item, index) => {
                    return item;
                  })}
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item md="6">
          <Box>
            <PrizeToExchange />
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
