import { useState } from "react";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const CreateForm = () => {
  const [code, setCode] = useState("");
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

  return (
    <>
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
            <Button variant="contained" color="primary" fullWidth href="/code">
              เพิ่มโค๊ด
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
