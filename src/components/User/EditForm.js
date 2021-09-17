import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router';

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
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/users/' + id + '/edit'
      );
      console.log(response);
      setFullname(response.data.data.fullname);
      setPhone(response.data.data.phone);
      setPassword(response.data.data.password);
    } catch (error) {
      console.log(error.response);
    }
  };

  const generatePassword = () => {
    const genCodeNow = () => {
      return Math.random().toString(36).substr(2, 12);
    };

    let a = genCodeNow();
    let b = genCodeNow();
    let c = genCodeNow();

    let randomCode = `${a}-${b}-${c}`;

    setPassword(randomCode);
  };

  const updateUser = async () => {
    try {
      await axios.put(process.env.REACT_APP_API_URL + '/api/v1/users/' + id, {
        fullname: fullname,
        phone: phone,
        password: password,
      });

      history.push('/user');
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
      <Card>
        <Box p={4}>
          <Box mb={2}>
            <TextField
              id='standard-basic'
              label='ชื่อจริง-นามสกุล'
              fullWidth
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
          </Box>
          <Box mb={2}>
            <TextField
              id='standard-basic'
              label='เบอร์โทร'
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </Box>
          <Box mb={2} display='flex'>
            <Box flexGrow={1} mr={2}>
              <TextField
                id='standard-basic'
                label='รหัสผ่าน'
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Box>

            <Button
              onClick={() => generatePassword()}
              variant='contained'
              color='secondary'
            >
              สร้างรหัสผ่านอัตโนมัติ
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => updateUser()}
              variant='contained'
              color='primary'
              fullWidth
            >
              เพิ่มสมาชิก
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default EditForm;
