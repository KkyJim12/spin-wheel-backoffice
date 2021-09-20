import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import axios from 'axios';

const columns = [
  { id: 'sort', label: 'ลำดับ' },
  { id: 'fullname', label: 'ชื่อเต็ม', minWidth: 170 },
  { id: 'phone', label: 'เบอร์โทร', minWidth: 100 },
  { id: 'username', label: 'ไอดี', minWidth: 100 },
  { id: 'created_date', label: 'วันที่สมัคร', minWidth: 100 },
  { id: 'manage', label: 'จัดการ', minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100vh',
  },
});

const UserDataTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/users'
      );
      console.log(response);
      setRows(response.data.data);
    } catch (error) {}
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + '/api/v1/users/' + id);
      getUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.code}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.fullname}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                      {moment(row.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        href={`user/${row.id}/edit`}
                        aria-label='edit'
                        size='small'
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteUser(row.id)}
                        aria-label='delete'
                        size='small'
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserDataTable;
