import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Stack,
  SortDirection,
  Typography,
  Checkbox,
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import { Order } from "../../types/order";
import OrderStatus from "../../components/order/OrderStatus";
import { Link } from "react-router-dom";

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const listOrders = useAppSelector((state) => state.order.listOrders);

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listOrders || [], listChecked),
    [listOrders, listChecked]
  );
  const handleChecked = (e: any) => {
    const id = Number(e.target.value);
    const tmpList = [...listChecked];
    //check xem id đã tồn tại trong listChecked chưa, nếu có sẽ trả về giá trị >-1
    const index = tmpList.indexOf(id);
    //handle toggle selected
    if (index > -1) {
      tmpList.splice(index, 1);
    } else {
      tmpList.push(id);
    }
    setListChecked(tmpList);
  };
  const resetChecked = () => {
    setListChecked([]);
  };

  const [order] = useState("asc");
  const [orderBy] = useState("trackingNo");

  const headCells: HeadCell[] = [
    {
      id: "checkbox",
      align: "left",
      disablePadding: false,
      label: "",
      width: "40px",
    },
    {
      id: "orderId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "customerName",
      align: "left",
      disablePadding: false,
      label: "Tên khách hàng",
      fontSize: "15px",
    },
    {
      id: "productName",
      align: "left",
      disablePadding: false,
      label: "Tên sản phẩm",
      fontSize: "15px",
    },
    {
      id: "consignmentName",
      align: "left",
      disablePadding: false,
      label: "Tên lô hàng",
      fontSize: "15px",
    },
    {
      id: "status",
      align: "center",
      disablePadding: false,
      label: "Trạng thái",
      fontSize: "15px",
    },
    {
      id: "createdTime",
      align: "center",
      disablePadding: false,
      label: "Thời gian tạo",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: Order }) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row" align="left">
            <Checkbox
              color="secondary"
              value={row?.id}
              checked={listChecked?.includes(row?.id)}
              onChange={handleChecked}
            />
          </TableCell>

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
            {row?.product?.name}
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
            {row?.consignment?.name}
          </TableCell>
          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <OrderStatus status={row.status} />
          </TableCell>

          <TableCell
            align="center"
            className="table-cell"
            sx={{
              minWidth: 200,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.created_at}
          </TableCell>

          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" justifyContent="center">
                <Link to={`/orders/${row.id}`}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#00B3D5",
                      mt: 1,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Chi tiết
                  </Typography>
                </Link>
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listOrders]);

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
            checked={isCheckAll}
            handleCheckAll={() =>
              handleCheckAll(listOrders || [], listChecked, setListChecked)
            }
          />

          {listOrders?.length ? (
            <TableBody>
              {listOrders.map((item, index) => (
                <Row key={index} row={item} />
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} scope="full" align="center">
                  <Empty title="Không có dữ liệu" height="400px" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
