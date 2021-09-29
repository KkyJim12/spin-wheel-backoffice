import { React, useState, useEffect } from 'react';
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
import axios from 'axios';
import moment from 'moment';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const columns = [
  { id: 'sort', label: 'ลำดับ', minWidth: 170 },
  { id: 'id', label: 'ไอดี', minWidth: 170 },
  { id: 'name', label: 'ชื่อกิจกรรม', minWidth: 170 },
  { id: 'createdAt', label: 'วันที่สร้าง', minWidth: 100 },
  { id: 'endDate', label: 'วันสิ้นสุดกิจกรรม', minWidth: 100 },
  { id: 'status', label: 'สถานะ', minWidth: 100 },
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

const EventDataTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/api/v1/events'
    );
    console.log(response);
    setRows(response.data.data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + '/api/v1/events/' + deleteId
      );
      closeDeleteModal();
      getEvent();
    } catch (error) {
      setError(true);
    }
  };

  const openDeleteModal = async (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = async () => {
    setDeleteId('');
    setDeleteModal(false);
  };

  return (
    <>
      {openDeleteModal && (
        <Dialog
          open={deleteModal}
          onClose={() => closeDeleteModal()}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <Box p={3}>
            <DialogTitle id='alert-dialog-title'>ยืนยันการลบ</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => deleteEvent()}
                color='secondary'
                variant='contained'
                autoFocus
              >
                ยืนยัน
              </Button>
              <Button
                onClick={() => closeDeleteModal()}
                color='primary'
                variant='outlined'
              >
                ยกเลิก
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      )}
      {error && (
        <Snackbar
          open={true}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={3000}
          onClose={() => setError('')}
        >
          <Alert variant='filled' severity='error'>
            มี Transaction ค้างอยู่
          </Alert>
        </Snackbar>
      )}
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
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {moment(row.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(row.endDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>ปกติ</TableCell>
                      <TableCell>
                        <IconButton
                          href={`event/${row.id}/edit`}
                          aria-label='edit'
                          size='small'
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => openDeleteModal(row.id)}
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
    </>
  );
};

export default EventDataTable;
