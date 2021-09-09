import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Chip from "@material-ui/core/Chip";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const columns = [
  { id: "code", label: "รหัส", minWidth: 170 },
  { id: "status", label: "สถานะ", minWidth: 100 },
  { id: "created_at", label: "สร้างเมื่อ", minWidth: 100 },
  { id: "manage", label: "จัดการ", minWidth: 100 },
];

function createData(id, code, status, created_at) {
  let manage = (
    <>
      <IconButton href={`code/${id}/edit`} aria-label="edit" size="small">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" size="small">
        <DeleteIcon />
      </IconButton>
    </>
  );

  if (status === true) {
    status = <Chip label="ถูกใช้งานแล้ว" color="secondary" />;
  } else {
    status = <Chip label="สามารถใช้งานได้" color="primary" />;
  }

  return { code, status, created_at, manage };
}

const rows = [
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
  createData(1, "12345abcdef", true, "20/09/2021"),
  createData(1, "12345abcdef", false, "20/09/2021"),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100vh",
  },
});

const CodeDataTable = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
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

export default CodeDataTable;
