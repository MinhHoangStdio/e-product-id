import { Box, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { totalPagePagination } from "../../utils/pagination";
import { orderActions } from "../../store/order/orderSlice";
import CustomButton from "../../components/share/CustomButton";
import { EOrderStatus } from "../../types/enums/order";
import OrderTable from "./table";
import { EPagination } from "../../types/enums/pagination";

const Order = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState("");
  const [params, setParams] = useState<{
    limit: number;
    page: number;
  }>({ limit: EPagination.Limit, page: 1 });
  const [orderStatusLabel, setOrderStatus] = useState("");
  const [listStatus] = useState([
    { label: "Chưa xử lý", value: EOrderStatus.Pending },
    { label: "Đã hoàn thành", value: EOrderStatus.Completed },
  ]);

  const resetParams = useCallback(() => {
    setParams({ limit: EPagination.Limit, page: 1 });
    setOrderStatus("");
  }, []);

  const { pagination } = useAppSelector((state) => state.order);
  const handleFilter = (value: string) => {
    setType(value);
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    dispatch(orderActions.getListOrder(params));
  }, [dispatch, params]);

  return (
    <>
      <Box
        sx={{
          padding: "20px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            sx={{ minWidth: "220px" }}
            variant="outlined"
            select
            id="order-status"
            label="Trạng thái"
            value={orderStatusLabel}
            InputLabelProps={{ shrink: !!orderStatusLabel }}
            onChange={(e: any) => {
              setParams((prevState) => ({
                ...prevState,
                status: e.target.value,
                page: 1,
              }));
              setOrderStatus(e.target.value);
            }}
          >
            {listStatus.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </TextField>
          <CustomButton
            color="error"
            onClick={resetParams}
            label="Xóa bộ lọc"
            disabled={!orderStatusLabel}
          />
        </Stack>
      </Box>
      <OrderTable />
      <Stack sx={{ py: "20px" }}>
        <Pagination
          count={pagination ? totalPagePagination(pagination) : 1}
          page={pagination?.page || 1}
          onChange={handlePagination}
        />
      </Stack>
    </>
  );
};

export default Order;
