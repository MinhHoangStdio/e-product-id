import { useState, useEffect, useMemo } from "react";
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
  Checkbox,
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon
import InfoIcon from "@mui/icons-material/Info";

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import history from "../../routes/history";
import { Consignment } from "../../types/consignments";

export default function OrganizationTable() {
  const dispatch = useAppDispatch();
  const listConsignments = useAppSelector(
    (state) => state.consignment.listConsignments
  );

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listConsignments, listChecked),
    [listConsignments, listChecked]
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

  // const confirmDelete = (data: User) => {
  //   const params: ParamsModalConfirm = {
  //     title: "Confirm",
  //     content: (
  //       <span>
  //         Do you want to delete a user <b>"{data.name}"</b>?
  //       </span>
  //     ),
  //     onAction: () => dispatch(userActions.removeUser(data.id)), // fix
  //     buttonText: "Delete",
  //   };
  //   dispatch(modalActions.showModal(params));
  // };

  const headCells: HeadCell[] = [
    {
      id: "checkbox",
      align: "left",
      disablePadding: false,
      label: "",
      width: "40px",
    },
    {
      id: "consignmentId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "consignmentName",
      align: "left",
      disablePadding: false,
      label: "Consignment Name",
      fontSize: "15px",
    },
    {
      id: "amount",
      align: "left",
      disablePadding: false,
      label: "Amount",
      fontSize: "15px",
    },
    {
      id: "status",
      align: "left",
      disablePadding: false,
      label: "Status",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "Actions",
      fontSize: "15px",
    },
  ];

  function Row({ row }: { row: Consignment }) {
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
              minWidth: 150,
              maxWidth: 150,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.amount}
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
            {row?.is_sold_out ? "Sold out" : "In stock"}
          </TableCell>

          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    history.push("/consignments/" + row.id);
                  }}
                  color="secondary"
                >
                  <InfoIcon fontSize="medium" />
                </IconButton>
                {/* <IconButton
                  sx={{ marginLeft: "0px" }}
                  aria-label="delete"
                  onClick={(e) => {
                    dispatch(() => confirmDelete(row));
                  }}
                  color="error"
                >
                  <CancelIcon fontSize="medium" />
                </IconButton> */}
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listConsignments]);

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
              handleCheckAll(listConsignments, listChecked, setListChecked)
            }
          />

          {listConsignments.length ? (
            <TableBody>
              {listConsignments.map((item, index) => (
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
