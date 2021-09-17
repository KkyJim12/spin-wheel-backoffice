import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Chip from '@material-ui/core/Chip';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import moment from 'moment';

const columns = [
  { id: 'num', label: 'ลำดับ', minWidth: 170 },
  { id: 'code', label: 'รหัส', minWidth: 170 },
  { id: 'status', label: 'สถานะ', minWidth: 100 },
  { id: 'created_at', label: 'สร้างเมื่อ', minWidth: 100 },
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

const CodeDataTable = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getCodes();
  }, []);

  const getCodes = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + '/api/v1/codes'
      );

      console.log(response);
      setRows(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteCode = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(
        process.env.REACT_APP_API_URL + '/api/v1/codes/' + id
      );
      console.log(response);
      getCodes();
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
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.key}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.isUsed ? 'ใช้แล้ว' : 'ยังไม่ได้ใช้'}
                        color={row.isUsed ? 'secondary' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>{moment(row.createdAt).format('DD/MM/YYYY')}}</TableCell>
                    <TableCell>
                      <IconButton
                        href={`code/${row.id}/edit`}
                        aria-label='edit'
                        size='small'
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteCode(row.id)}
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

export default CodeDataTable;
