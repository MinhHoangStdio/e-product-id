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
import InfoIcon from '@mui/icons-material/Info';

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { productActions } from "../../store/product/productSlice";
import { DetailProduct } from "../../types/products";
import history from "../../routes/history";

export default function ProductsTable() {
  const dispatch = useAppDispatch();
  const listProducts = useAppSelector(
    (state) => state.product.listProducts
  );

  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");

  const headCells: HeadCell[] = [
    {
      id: "productId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "productName",
      align: "left",
      disablePadding: false,
      label: "Name",
      fontSize: "15px",
    },
    {
      id: "price",
      align: "left",
      disablePadding: false,
      label: "Price",
      fontSize: "15px",
    },
    {
      id: "categoryName",
      align: "left",
      disablePadding: false,
      label: "Category Name",
      fontSize: "15px",
    },
    {
      id: "description",
      align: "left",
      disablePadding: false,
      label: "Description",
      fontSize: "15px",
    },
    {
      id: "approvalStatus",
      align: "left",
      disablePadding: false,
      label: "Approval Status",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "left",
      disablePadding: false,
      label: "",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: DetailProduct }) {
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
            {
              row.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }
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
            {row.category.name}
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
            {row.description}
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
            {row.approval_status}
          </TableCell>

          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row">
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    history.push('/products/' + row.id)
                  }}
                  color="secondary"
                >
                  <InfoIcon fontSize="medium" />
                </IconButton>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    dispatch(productActions.getListProducts({}));
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

          {listProducts.length ? (
            <TableBody>
              {listProducts.map((item, index) => (
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
