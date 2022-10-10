import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Delete } from "@mui/icons-material";
import { AppModalService } from "../../components/AppModal";
import { useAppLanguage } from "../../hooks";
import { Avatar, Button, Grid, Typography } from "@mui/material";

const columns = [
  { id: "position", label: "Position", align: "center" },
  {
    id: "club",
    label: "Club",
    minWidth: 170,
    align: "center",
    format: (e) => {
      return (
        <Grid container sx={{ alignItems: "center" }}>
          <Avatar alt="ava" sx={{ mr: 1, width: 24, height: 24 }} src={e.logo} />
          <Typography>{e.name}</Typography>
        </Grid>
      );
    },
  },
  { id: "played", label: "Played", align: "center" },
  { id: "won", label: "Won", align: "center" },
  { id: "drawn", label: "Drawn", align: "center" },
  { id: "lost", label: "Lost", align: "center" },
  { id: "gf", label: "GF", align: "center" },
  { id: "ga", label: "GA", align: "center" },
  { id: "gd", label: "GD", align: "center" },
  { id: "points", label: "Points", align: "center" },
  {
    id: "form",
    label: "Form",
    align: "center",
    minWidth: 170,
    format: (value) => {
      return (
        <Grid container justifyContent="center">
          {value.map((item, index) => {
            let color = item == "W" ? "#13cf00" : value == "D" ? "#76766f" : "#d81920";
            return (
              <Avatar
                key={`${index}`}
                sx={{
                  width: 24,
                  height: 24,
                  m: 0.5,
                  backgroundColor: color,
                  border: `1px solid ${color}`,
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "white",
                }}>
                {item}
              </Avatar>
            );
          })}
        </Grid>
      );
    },
  },
  {
    id: "next",
    label: "Next",
    align: "center",
    format: (e) => {
      const changedName = e;
      return (
        <Grid container sx={{ justifyContent: "center" }}>
          <Avatar alt="next" sx={{ width: 24, height: 24 }} src={changedName} />
        </Grid>
      );
    },
  },
  { id: "action", label: "Action", align: "center" },
];

export default function PremierLeagueTable() {
  const { Strings } = useAppLanguage();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createData = (
    position,
    club,
    played,
    won,
    drawn,
    lost,
    gf,
    ga,
    gd,
    points,
    form,
    next
  ) => {
    return {
      position,
      club,
      played,
      won,
      drawn,
      lost,
      gf,
      ga,
      gd,
      points,
      form,
      next,
      action: (
        <Delete
          color="error"
          size="large"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            AppModalService.set({
              title: Strings.doy_you_wanna_delete_this(club.name),
              onConfirm: () => {
                AppModalService.close();
              },
            });
          }}
        />
      ),
    };
  };
  const rows = [
    createData(
      1,
      {
        logo: "https://resources.premierleague.com/premierleague/badges/25/t43@x2.png",
        name: "Manchester City",
      },
      23,
      18,
      3,
      2,
      55,
      14,
      +41,
      57,
      ["W", "W", "W", "W", "D"],
      "https://resources.premierleague.com/premierleague/badges/20/t94@x2.png"
    ),
    createData(
      2,
      {
        logo: "https://resources.premierleague.com/premierleague/badges/25/t14@x2.png",
        name: "Liverpool",
      },
      22,
      14,
      6,
      2,
      58,
      19,
      +39,
      48,
      ["D", "L", "D", "W", "W"],
      "https://resources.premierleague.com/premierleague/badges/20/t13@x2.png"
    ),
    createData(
      3,
      {
        logo: "https://resources.premierleague.com/premierleague/badges/25/t8@x2.png",
        name: "Chelsea",
      },
      24,
      13,
      8,
      3,
      48,
      18,
      +30,
      47,
      ["D", "D", "L", "D", "W"],
      "https://resources.premierleague.com/premierleague/badges/20/t31@x2.png"
    ),
    createData(
      4,
      {
        logo: "https://resources.premierleague.com/premierleague/badges/25/t1@x2.png",
        name: "Manchester United",
      },
      22,
      11,
      5,
      6,
      36,
      30,
      +6,
      38,
      ["W", "L", "D", "W", "W"],
      "https://resources.premierleague.com/premierleague/badges/20/t90@x2.png"
    ),
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                const isSticky = column.id == "club" || column.id == "position";
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      position: isSticky ? "sticky" : undefined,
                      borderRight: column.id == "club" ? "1px solid grey" : 0,
                      zIndex: isSticky ? 2 : 1,
                      background: "#fff",
                      left: 0,
                    }}>
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.position}>
                    {columns.map((column) => {
                      const isSticky = column.id == "club" || column.id == "position";
                      const value = row[column.id];
                      return (
                        <TableCell
                          style={{
                            position: isSticky ? "sticky" : undefined,
                            borderRight: column.id == "club" ? "1px solid grey" : 0,
                            background: "#fff",
                            left: 0,
                            zIndex: 1,
                          }}
                          key={column.id}
                          align={column.align}>
                          {column.format ? column.format(value, row) : value}
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
}
