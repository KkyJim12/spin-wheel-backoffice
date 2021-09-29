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

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const columns = [
  { id: 'num', label: 'ลำดับ', minWidth: 170 },
  { id: 'code', label: 'รหัส', minWidth: 170 },
  { id: 'status', label: 'สถานะ', minWidth: 100 },
  { id: 'createdAt', label: 'สร้างเมื่อ', minWidth: 100 },
  { id: 'expireDate', label: 'วันหมดอายุ', minWidth: 100 },
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

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

      setRows(response.data.data);
    } catch (error) {
      console.log(error.response);
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

  const deleteCode = async () => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL + '/api/v1/codes/' + deleteId
      );
      closeDeleteModal();
      getCodes();
    } catch (error) {
      console.log(error.response);
    }
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
                onClick={() => deleteCode()}
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
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.key}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.isUsed ? 'ใช้แล้ว' : 'ยังไม่ได้ใช้'}
                          color={row.isUsed ? 'secondary' : 'primary'}
                        />
                      </TableCell>
                      <TableCell>
                        {moment(row.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(row.expireDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          href={`code/${row.id}/edit`}
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

export default CodeDataTable;
