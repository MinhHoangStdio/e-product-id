import { useState, useEffect } from "react";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Stack,
  SortDirection,
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { categoryActions } from "../../store/category/categorySlice";
import { Category } from "../../types/categories";

export default function CategoriesTable() {
  const dispatch = useAppDispatch();
  const listCategories = useAppSelector(
    (state) => state.category.listCategories
  );

  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");

  const headCells: HeadCell[] = [
    {
      id: "categoryId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "categoryName",
      align: "left",
      disablePadding: false,
      label: "Name",
      fontSize: "15px",
    },
    {
      id: "rootCategoryId",
      align: "left",
      disablePadding: false,
      label: "Root Category ID",
      fontSize: "15px",
    },
    {
      id: "product quantity",
      align: "left",
      disablePadding: false,
      label: "Product quantity",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "left",
      disablePadding: false,
      label: "Actions",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: Category }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell align="left" className="table-cell">
            {row.id}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.name}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.parent_id}
          </TableCell>

          <TableCell
            align="left"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.parent_id}
          </TableCell>

          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" spacing={1}>
                <IconButton
                  aria-label="edit"
                  onClick={(e) => {
                    console.log({ row });
                  }}
                  color="secondary"
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
                <IconButton
                  sx={{ marginLeft: "0px" }}
                  onClick={(e) => {
                    console.log({ row });
                  }}
                  aria-label="delete"
                  color="error"
                >
                  <CancelIcon fontSize="medium" />
                </IconButton>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    dispatch(categoryActions.getListCategories({}));
  }, [dispatch]);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead
            headCells={headCells}
            order={order as SortDirection | undefined}
            orderBy={orderBy}
          />

          {listCategories.length ? (
            <TableBody>
              {listCategories.map((item, index) => (
                <Row key={index} row={item} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <Empty title="No data" height="400px" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}