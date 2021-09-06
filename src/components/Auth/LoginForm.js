import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = () => {
  return (
    <Card>
      <Box p={3}>
        <h1>เข้าสู่ระบบ</h1>
        <form noValidate autoComplete='off'>
          <Box pb={2}>
            <TextField fullWidth id='standard-basic' label='อีเมลล์' />
          </Box>
          <Box pb={3}>
            <TextField fullWidth id='standard-basic' label='รหัสผ่าน' />
          </Box>
          <Box>
            <Button href="/dashboard" fullWidth variant='contained' color='primary'>
              เข้าสู่ระบบ
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
};

export default LoginForm;
