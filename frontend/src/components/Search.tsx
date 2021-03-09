import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  SortDirection,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import { COLUMNS } from "../constants";
import { Cloud } from "../types";
import { useStyles } from "../styles";
import SearchController from "./SearchController";

interface EnhancedTableHeader {
  order: SortDirection;
  orderBy: keyof Cloud;
  onRequestSort: (property: string) => void;
}

const Search: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<Cloud>>([]);
  const [filteredData, setFilteredData] = useState<Array<Cloud>>([]);
  const [order, setOrder] = useState<SortDirection>("asc");
  const [orderBy, setOrderBy] = useState<keyof Cloud>("cloud_name");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const classes = useStyles()();

  useEffect(() => {
    const getCloudData = async () => {
      setLoading(true);
      await axios
        .get<Array<Cloud>>("/api/clouds")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setLoading(false);
    };
    getCloudData();
  }, []);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const descendingComparator = (a: Cloud, b: Cloud, orderBy: keyof Cloud) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] < a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order: SortDirection, orderBy: keyof Cloud) => {
    return order === "desc"
      ? (a: Cloud, b: Cloud) => descendingComparator(a, b, orderBy)
      : (a: Cloud, b: Cloud) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (
    array: Array<Cloud>,
    comparator: (a: any, b: any) => any
  ): Array<Cloud> => {
    return array.sort((a, b) => {
      const order = comparator(a, b);
      if (order !== 0) return order;
      return Number(array.indexOf(a)) - Number(array.indexOf(b));
    });
  };

  const handleRequestSort = (property: keyof Cloud) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const EnhancedTableHeader: React.FC<EnhancedTableHeader> = ({
    order,
    orderBy,
    onRequestSort,
  }) => {
    const createSortHandler = (property: string) => {
      onRequestSort(property);
    };
    return (
      <TableHead className={classes.tableHead}>
        <TableRow>
          {COLUMNS.map((column) => (
            <TableCell
              key={column.id}
              align="center"
              sortDirection={orderBy === column.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={order ? order : "asc"}
                onClick={() => createSortHandler(column.id)}
              >
                <span style={{ padding: 3 }}>{column.label}</span>
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <Container>
      <SearchController data={data} setFilteredData={setFilteredData} />
      <Paper>
        {loading ? (
          <Box mt={2} p={2} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box mt={2}>
            <TableContainer>
              <Table stickyHeader aria-label="stickky-table">
                <EnhancedTableHeader
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                {filteredData && (
                  <TableBody>
                    {stableSort(filteredData, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow key={filteredData.indexOf(row)}>
                            <TableCell>{row.cloud_name}</TableCell>
                            <TableCell>{row.cloud_provider}</TableCell>
                            <TableCell>{row.cloud_description}</TableCell>
                            <TableCell align="center">
                              {row.geo_latitude}
                            </TableCell>
                            <TableCell align="center">
                              {row.geo_longitude}
                            </TableCell>
                            <TableCell align="center">
                              {row.geo_region}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {filteredData && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Search;
