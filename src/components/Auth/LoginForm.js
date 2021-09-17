import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const LoginForm = () => {
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/v1/auth/login',
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem('token', response.data.data.token);

      history.push('/dashboard');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Card style={{ background: 'rgba(255,255,255, 0.8)' }}>
      <Box p={3}>
        {error && <Alert severity='error'>{error.message}</Alert>}
        <h1>เข้าสู่ระบบ</h1>
        <form noValidate autoComplete='off'>
          <Box pb={2}>
            <TextField
              fullWidth
              id='standard-basic'
              label='ไอดี'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Box>
          <Box pb={3}>
            <TextField
              type='text'
              fullWidth
              id='standard-basic'
              label='รหัสผ่าน'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Box>
          <Box>
            <Button
              onClick={() => login()}
              fullWidth
              variant='contained'
              color='primary'
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};

export default LoginForm;
