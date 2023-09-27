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
  Checkbox,
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon
import AddIcon from "@mui/icons-material/Add";

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import CustomButton from "../../components/share/CustomButton";
import { layoutActions } from "../../store/layout/layoutSlice";
import { User } from "../../types/user";
import { userActions } from "../../store/user/userSlice";
import { organizationActions } from "../../store/organization/organizationSlice";
import { useLocation, useParams } from "react-router-dom";

export default function AddMemberTable() {
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const listValidMember = useAppSelector((state) => state.user.listValidUsers);

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listValidMember, listChecked),
    [listValidMember, listChecked]
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

  const onNext = () => {
    resetChecked();
    dispatch(layoutActions.closeModalAddMember());
    dispatch(organizationActions.getDetailOrganization(id));
    dispatch(userActions.getValidUsers());
  };

  const addMember = () => {
    const params = {
      listUser: listChecked,
      organizerId: id,
      onNext,
    };
    dispatch(organizationActions.addMember(params));
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
      id: "memberId",
      align: "left",
      disablePadding: false,
      label: "ID",
      fontSize: "15px",
    },
    {
      id: "memberName",
      align: "left",
      disablePadding: false,
      label: "Tên người dùng",
      fontSize: "15px",
    },
    {
      id: "email",
      align: "left",
      disablePadding: false,
      label: "Email",
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
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listValidMember]);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          maxHeight: "500px",
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
              handleCheckAll(listValidMember, listChecked, setListChecked)
            }
          />

          {listValidMember?.length ? (
            <TableBody>
              {listValidMember.map((item, index) => (
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
      <Stack p={1}>
        <CustomButton
          disabled={!listChecked.length}
          onClick={addMember}
          Icon={<AddIcon />}
          color="primary"
          label="Thêm"
        />
      </Stack>
    </Box>
  );
}
