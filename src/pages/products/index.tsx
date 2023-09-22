import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ProductsTable from "./table";
import { SearchOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { productActions } from "../../store/product/productSlice";
import { totalPagePagination } from "../../utils/pagination";
import { EPagination } from "../../types/enums/pagination";
import { debounceSearch } from "../../utils/debounceSearch";
import { EApprovalStatus } from "../../types/enums/product";
import CustomButton from "../../components/share/CustomButton";

const Products = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [productStatusLabel, setProductStatus] = useState("");
  const [type, setType] = useState("");
  const debounceSearchListProducts = useCallback(debounceSearch, []);
  const [listStatus] = useState([
    { label: "Đã xác nhận", value: EApprovalStatus.Approve },
    { label: "Đã chặn", value: EApprovalStatus.Ban },
    { label: "Chưa yêu cầu", value: EApprovalStatus.Pending },
    { label: "Đã từ chối", value: EApprovalStatus.Reject },
    { label: "Chờ duyệt", value: EApprovalStatus.Requesting },
  ]);
  const [params, setParams] = useState<{
    limit: number;
    page: number;
    name?: string;
    status?: string;
  }>({ limit: EPagination.Limit, page: 1 });
  const { pagination, loadingListProducts } = useAppSelector(
    (state) => state.product
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    debounceSearchListProducts(value.trim(), setParams);
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };
  const resetParams = useCallback(() => {
    setParams({ limit: EPagination.Limit, page: 1 });
    setSearch("");
    setProductStatus("");
  }, []);

  useEffect(() => {
    dispatch(productActions.getListProducts(params));
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
          <FormControl sx={{ width: { xs: "100%", md: 400 } }}>
            <OutlinedInput
              color="secondary"
              id="header-search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              placeholder="Tên sản phẩm"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          <TextField
            sx={{ minWidth: "120px" }}
            variant="outlined"
            select
            id="product-status"
            label="Trạng thái"
            value={productStatusLabel}
            InputLabelProps={{ shrink: !!productStatusLabel }}
            onChange={(e: any) => {
              setParams((prevState) => ({
                ...prevState,
                status: e.target.value,
                page: 1,
              }));
              setProductStatus(e.target.value);
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
            disabled={!search && !productStatusLabel}
          />
        </Stack>
      </Box>
      <ProductsTable />
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

export default Products;
