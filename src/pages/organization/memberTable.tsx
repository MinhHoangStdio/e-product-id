import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  SortDirection,
  Checkbox,
  IconButton,
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon
import CancelIcon from "@mui/icons-material/Cancel";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import { User } from "../../types/user";
import { ParamsModalConfirm } from "../../types/modal";
import { organizationActions } from "../../store/organization/organizationSlice";
import { modalActions } from "../../store/modal/modalSlice";

export default function MemberTable() {
  const dispatch = useAppDispatch();
  const organization = useAppSelector(
    (state) => state.organization.detailOrganization
  );

  const listMembers = organization?.list_member || [];

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listMembers, listChecked),
    [listMembers, listChecked]
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

  const confirmDelete = (data: any) => {
    const payload = {
      organizerId: organization?.id,
      params: { members: [data?.id] },
    };
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc muốn xóa thành viên <b>"{data.name}"</b> khỏi tổ chức?
        </span>
      ),
      onAction: () =>
        dispatch(organizationActions.removeMemberOrganizer(payload)), // fix
      buttonText: "Xóa",
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
      id: "organizationId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "organizationName",
      align: "left",
      disablePadding: false,
      label: "Tên",
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
        <TableRow>
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

          <TableCell align="center" className="table-cell">
            {row.id == organization?.owner_id ? (
              <IconButton disabled>
                <DoDisturbIcon fontSize="medium" />
              </IconButton>
            ) : (
              <IconButton
                sx={{ marginLeft: "0px" }}
                aria-label="delete"
                onClick={(e) => {
                  dispatch(() => confirmDelete(row));
                }}
                color="error"
              >
                <CancelIcon fontSize="medium" />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listMembers]);

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
              handleCheckAll(listMembers, listChecked, setListChecked)
            }
          />

          {listMembers.length ? (
            <TableBody>
              {listMembers.map((item, index) => (
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
