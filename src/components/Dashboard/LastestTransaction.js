import React, { useState } from 'react';
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
import moment from 'moment';

const useStyles = makeStyles({
  tableContainer: {
    height: '65vh',
  },
  table: {
    width: '100%',
  },
});

export default function BasicTable(props) {
  const classes = useStyles();

  let rows = props.data;

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Box p={2}>
        <Typography color='primary' variant='h5'>
          10 การสุ่มล่าสุด
        </Typography>
      </Box>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align='left'>ชื่อกิจกรรม</TableCell>
            <TableCell align='left'>ชื่อเต็ม</TableCell>
            <TableCell align='left'>เบอร์โทร</TableCell>
            <TableCell align='left'>รางวัล</TableCell>
            <TableCell align='left'>เวลา</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell align='left'>{index + 1}</TableCell>
                <TableCell align='left'>{row.event.name}</TableCell>
                <TableCell align='left'>{row.user.fullname}</TableCell>
                <TableCell align='left'>{row.user.phone}</TableCell>
                <TableCell align='left'>{row.prize.name}</TableCell>
                <TableCell align='left'>
                  {moment(row.createdAt).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
