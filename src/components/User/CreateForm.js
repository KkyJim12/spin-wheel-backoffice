import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const CreateForm = () => {
  return (
    <>
      <Card>
        <Box p={4}>
          <Box mb={2}>
            <TextField id='standard-basic' label='ชื่อจริง-นามสกุล' fullWidth />
          </Box>
          <Box mb={2}>
            <TextField id='standard-basic' label='อีเมลล์' fullWidth />
          </Box>
          <Box mb={2}>
            <TextField id='standard-basic' label='รหัสผ่าน' fullWidth />
          </Box>
          <Box mb={2}>
            <TextField id='standard-basic' label='ยืนยันรหัสผ่าน' fullWidth />
          </Box>
          <Box mb={2}>
            <TextField id='standard-basic' label='ยืนยันรหัสผ่าน' fullWidth />
          </Box>
          <Box>
            <Button variant='contained' color='primary' fullWidth>
              เพิ่มสมาชิก
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CreateForm;
