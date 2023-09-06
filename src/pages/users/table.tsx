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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { modalActions } from "../../store/modal/modalSlice";
import { ParamsModalConfirm } from "../../types/modal";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import { User } from "../../types/user";
import { userActions } from "../../store/user/userSlice";
import history from "../../routes/history";

export default function UserTable() {
  const dispatch = useAppDispatch();
  const listUsers = useAppSelector((state) => state.user.listUsers);

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listUsers, listChecked),
    [listUsers, listChecked]
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

  const confirmBlockOrUnblock = (data: User) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắn muốn {data.is_active ? "chặn" : "bỏ chặn"} người dùng
          <b> "{data.name}"</b> không?
        </span>
      ),
      onAction: () =>
        data.is_active
          ? dispatch(userActions.blockUser(data.id))
          : dispatch(userActions.unblockUser(data.id)),
      buttonText: "Đồng ý",
    };
    dispatch(modalActions.showModal(params));
  };

  const headCells: HeadCell[] = [
    {
      id: "checkbox",
      align: "left",
      disablePadding: false,
      label: "",
      width: "40px",
    },
    {
      id: "userId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "userName",
      align: "left",
      disablePadding: false,
      label: "Tên người dùng",
      fontSize: "15px",
    },
    {
      id: "userEmail",
      align: "left",
      disablePadding: false,
      label: "Email",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "Hành động",
      fontSize: "15px",
    },
  ];

  function Row({ row }: { row: User }) {
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
            {row.email}
          </TableCell>

          <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    history.push("/users/" + row.id);
                  }}
                  color="secondary"
                >
                  <InfoIcon fontSize="medium" />
                </IconButton>
                {row.is_active ? (
                  <IconButton
                    sx={{ marginLeft: "0px" }}
                    aria-label="block"
                    onClick={(e) => {
                      dispatch(() => confirmBlockOrUnblock(row));
                    }}
                    color="error"
                  >
                    <RemoveCircleOutlineIcon fontSize="medium" />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ marginLeft: "0px" }}
                    aria-label="unblock"
                    onClick={(e) => {
                      dispatch(() => confirmBlockOrUnblock(row));
                    }}
                    color="success"
                  >
                    <CheckCircleOutlineIcon fontSize="medium" />
                  </IconButton>
                )}
              </Stack>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listUsers]);

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
              handleCheckAll(listUsers, listChecked, setListChecked)
            }
          />

          {listUsers.length ? (
            <TableBody>
              {listUsers.map((item, index) => (
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
