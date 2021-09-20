import { useState } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(8),
    },
  },
}));

const CreateForm = () => {
  const classes = useStyles();
  let initDate = moment().add(5, 'days').format('YYYY-MM-DDTHH:mm:ss');
  const history = useHistory();
  const [code, setCode] = useState('');
  const [expireDate, setExpireDate] = useState(initDate);
  const [error, setError] = useState([]);

  const generateCode = () => {
    const genCodeNow = () => {
      return Math.random().toString(36).substr(2, 12);
    };

    let a = genCodeNow();

    let randomCode = `${a}`;

    setCode(randomCode);
  };

  const storeCode = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + '/api/v1/codes', {
        key: code,
        expireDate: expireDate,
      });
      history.push('/code');
    } catch (error) {
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

      <Card>
        <Box p={4}>
          <Box display='flex' mb={2}>
            <Box flexGrow={1} mr={2}>
              <TextField
                value={code}
                variant='outlined'
                id='outlined-basic'
                label='รหัสเติม'
                fullWidth
                onChange={(e) => setCode(e.target.value)}
              />
            </Box>
            <Button
              onClick={() => generateCode()}
              variant='contained'
              color='secondary'
            >
              สร้างรหัสอัตโนมัติ
            </Button>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              id='datetime-local'
              label='วันหมดอายุ'
              type='datetime-local'
              defaultValue={expireDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              onClick={() => storeCode()}
              variant='contained'
              color='primary'
              fullWidth
            >
              เพิ่มโค้ด
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
