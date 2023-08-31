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
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { totalPagePagination } from "../../utils/pagination";
import CustomButton from "../../components/share/CustomButton";
import { EPagination } from "../../types/enums/pagination";
import OrganizationTable from "./table";
import { consignmentActions } from "../../store/consignment/consignmentSlice";

const Consignments = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [params, setParams] = useState({ limit: EPagination.Limit, page: 1 });
  const { pagination, loadingListConsignments } = useAppSelector(
    (state) => state.consignment
  );

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const handleFilter = (value: string) => {
    setType(value);
  };

  const handlePagination = (e: any, value: number) => {
    setParams((prevState) => {
      return { ...prevState, page: value };
    });
  };

  useEffect(() => {
    dispatch(consignmentActions.getListConsignments(params));
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* <FormControl sx={{ width: { xs: "100%", md: 200 } }}>
            <OutlinedInput
              color="secondary"
              id="header-search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              placeholder="Tên lô hàng"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          <FormControl
            sx={{ width: { xs: "100%", md: 150 }, marginLeft: "15px" }}
          >
            <InputLabel color="secondary" id="demo-simple-select-label">
              Loại
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={(e) => handleFilter(e.target.value)}
              label="Type"
              defaultValue="ALL_STATUS"
              color="secondary"
            >
              <MenuItem value="ALL_STATUS">Tất cả</MenuItem>
            </Select>
          </FormControl> */}
        </Box>

        {/* <CustomButton
          color="primary"
          label=" Tạo mới"
          onClick={() => {
            // dispatch(layoutActions.openModalOrganization());
          }}
        /> */}
      </Box>
      <OrganizationTable />
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

export default Consignments;
