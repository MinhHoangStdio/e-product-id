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
} from "@mui/material";
import OrderTableHead from "../../components/table/OrderTableHead";

// icon

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { checkAllCondition, handleCheckAll } from "../../utils/table";
import { User } from "../../types/user";

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
      label: "Name",
      fontSize: "15px",
    },
    {
      id: "userEmail",
      align: "left",
      disablePadding: false,
      label: "Email",
      fontSize: "15px",
    },
    // {
    //   id: "action",
    //   align: "center",
    //   disablePadding: false,
    //   label: "Actions",
    //   fontSize: "15px",
    // },
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

          {/* <TableCell align="left" className="table-cell">
            <Box>
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  aria-label="info"
                  onClick={() => {
                    history.push("/organizations/" + row.id);
                  }}
                  color="secondary"
                >
                  <InfoIcon fontSize="medium" />
                </IconButton>
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
              </Stack>
            </Box>
          </TableCell> */}
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
