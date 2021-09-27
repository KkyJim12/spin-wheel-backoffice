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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import PrizeImage from "assets/Image/item.jpg";
import moment from "moment";

const columns = [
  { id: "id", label: "ลำดับ", minWidth: 25 },
  { id: "image", label: "รูป", minWidth: 100 },
  { id: "name", label: "ชื่อของรางวัล", minWidth: 100 },
  { id: "created_at", label: "สร้างเมื่อ", minWidth: 100 },
  { id: "manage", label: "จัดการ", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100vh",
  },
});

const PrizeDataTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPrize();
  }, []);

  const getPrize = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/v1/prize"
      );
      setRows(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const deletePrize = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_API_URL + "/api/v1/prize/" + id);

      getPrize();
    } catch (error) {
      setError(true);
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
    <>
      {error && (
        <Snackbar
          open={true}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration={3000}
          onClose={() => setError("")}
        >
          <Alert variant="filled" severity="error">
            มี Transaction ค้างอยู่
          </Alert>
        </Snackbar>
      )}
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
                      <TableCell>
                        <img
                          src={
                            row.image
                              ? process.env.REACT_APP_API_URL +
                                "/uploads/image/" +
                                row.image
                              : PrizeImage
                          }
                          alt="prize"
                          style={{ width: 100, height: 100 }}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        {moment(row.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          href={`prize/${row.id}/edit`}
                          aria-label="edit"
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deletePrize(row.id)}
                          aria-label="delete"
                          size="small"
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
          component="div"
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

export default PrizeDataTable;
