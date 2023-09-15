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
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

// empty
import Empty from "../../components/table/Empty";
import { HeadCell } from "../../types/table";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { categoryActions } from "../../store/category/categorySlice";
import { Category } from "../../types/categories";
import { modalActions } from "../../store/modal/modalSlice";
import { ParamsModalConfirm } from "../../types/modal";
import { checkAllCondition, handleCheckAll } from "../../utils/table";

export default function CategoriesTable() {
  const dispatch = useAppDispatch();
  const listCategories = useAppSelector(
    (state) => state.category.listCategories
  );

  const [listChecked, setListChecked] = useState<any[]>([]);
  const isCheckAll = useMemo(
    () => checkAllCondition(listCategories, listChecked),
    [listCategories, listChecked]
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

  const confirmDelete = (data: Category) => {
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắc muốn xóa danh mục này không <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () => dispatch(categoryActions.removeCategory(data.id)),
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
      label: "Tên danh mục",
      fontSize: "15px",
    },
    {
      id: "rootCategoryId",
      align: "left",
      disablePadding: false,
      label: "Danh mục cha",
      fontSize: "15px",
    },
    {
      id: "product quantity",
      align: "left",
      disablePadding: false,
      label: "Số lượng sản phẩm",
      fontSize: "15px",
    },
    {
      id: "action",
      align: "center",
      disablePadding: false,
      label: "Hành động",
      fontSize: "15px",
      paddingLeft: "25px",
    },
  ];

  function Row({ row }: { row: Category }) {
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
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  aria-label="edit"
                  onClick={(e) => {
                    dispatch(categoryActions.selectedCategory(row));
                  }}
                  color="secondary"
                >
                  <EditIcon fontSize="medium" />
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
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  useEffect(() => {
    resetChecked();
  }, [listCategories]);

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
              handleCheckAll(listCategories, listChecked, setListChecked)
            }
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
