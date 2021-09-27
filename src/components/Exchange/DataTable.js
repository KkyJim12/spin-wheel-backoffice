import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import axios from "axios";

import PrizeImage from "assets/Image/item.jpg";
import moment from "moment";

const columns = [
  { id: "id", label: "ลำดับ", minWidth: 25 },
  { id: "event", label: "ชื่อกิจกรรม", minWidth: 100 },
  { id: "prize", label: "รางวัล", minWidth: 100 },
  { id: "name", label: "ชื่อผู้แลก", minWidth: 100 },
  { id: "created_at", label: "วันที่-เวลา", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100vh",
  },
});

const RandomDataTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getPrize();
  }, []);

  const getPrize = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/exchanges"
      );
      setRows(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.event.name}</TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <img
                          src={
                            row.prize.image
                              ? process.env.REACT_APP_API_URL +
                                "/uploads/image/" +
                                row.prize.image
                              : PrizeImage
                          }
                          alt="prize"
                          style={{ width: 100, height: 100 }}
                        />
                        <Box mt={2}>{row.prize.name}</Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.user.fullname}</TableCell>
                    <TableCell>
                      {moment(row.createdAt).format("DD/MM/YYYY hh:mmA")}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RandomDataTable;
