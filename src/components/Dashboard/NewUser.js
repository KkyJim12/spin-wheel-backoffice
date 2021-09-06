import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  tableContainer: {
    maxHeight: '50vh',
  },
  table: {
    width: '100%',
    maxHeight: '50vh',
  },
});

const rows = [
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
  {
    fullname: 'Piyakarn Nimmakulvirut',
    email: 'jirakarnjim1@gmail.com',
    registerDate: '09/06/2021',
  },
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Box p={2}>
        <Typography color='primary' variant='h5'>
          10 สมาชิกใหม่ล่าสุด
        </Typography>
      </Box>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align='left'>ชื่อเต็ม</TableCell>
            <TableCell align='left'>อีเมลล์</TableCell>
            <TableCell align='left'>วันที่สมัคร</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align='left'>{index + 1}</TableCell>
              <TableCell align='left'>{row.fullname}</TableCell>
              <TableCell align='left'>{row.email}</TableCell>
              <TableCell align='left'>{row.registerDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
