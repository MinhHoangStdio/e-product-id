import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import CategoriesTable from "./table";
import { SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/store";
import { layoutActions } from "../../store/layout/layoutSlice";
import { categoryActions } from "../../store/category/categorySlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [params, setParams] = useState({ limit: 15, page: 1 });
  const handleSearch = (value: string) => {
    setSearch(value);
  };
  const handleFilter = (value: string) => {
    setType(value);
  };

  useEffect(() => {
    dispatch(categoryActions.getListCategories(params));
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
          <FormControl sx={{ width: { xs: "100%", md: 200 } }}>
            <OutlinedInput
              color="secondary"
              id="header-search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              placeholder="Category name"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          <FormControl
            sx={{ width: { xs: "100%", md: 150 }, marginLeft: "15px" }}
          >
            <InputLabel color="secondary" id="demo-simple-select-label">
              Type
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
              <MenuItem value="ALL_STATUS">All</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl
            sx={{ width: { xs: "100%", md: 150 }, marginLeft: "15px" }}
          >
            <InputLabel
              size="normal"
              color="secondary"
              id="demo-simple-select-label"
            >
              {t("Leave Type")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={(e) => handleFilter("type.in", e.target.value)}
              label={t("Leave Type")}
              defaultValue="ALL_TYPE"
              color="secondary"
            >
              <MenuItem value={"ALL_TYPE"}>{t("All")}</MenuItem>
              {LEAVE_TYPE?.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {t(upperCaseFirstCharacter(item))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ width: { xs: "100%", md: 170 }, marginLeft: "15px" }}
            size="small"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                open={openFrom}
                closeOnSelect={true}
                label={t("From")}
                value={startDate || null}
                name="startDate"
                onChange={(e) => {
                  handleFilter(
                    "startDate.greaterThanOrEqual",
                    formatDateMaterialForFilter(e)
                  );
                }}
                onError={(newError) => setFromError(newError)}
                renderInput={(params) => (
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenTo(false);
                      setOpenFrom(true);
                    }}
                    color="secondary"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                      sx: { cursor: "pointer" },
                    }}
                    helperText={
                      fromError ? t("Please follow the format dd/mm/yyyy") : ""
                    }
                  />
                )}
                inputFormat="DD/MM/YYYY"
                style={{ maxHeight: "70%" }}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl
            sx={{ width: { xs: "100%", md: 170 }, marginLeft: "15px" }}
            size="small"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                open={openTo}
                closeOnSelect={true}
                label={t("To")}
                value={endDate || null}
                name="endDate"
                onError={(newError) => setToError(newError)}
                onChange={(e) => {
                  handleFilter(
                    "endDate.lessThanOrEqual",
                    formatDateMaterialForFilter(e)
                  );
                  setOpenTo(false);
                }}
                minDate={startDate}
                renderInput={(params) => (
                  <TextField
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenTo(true);
                      setOpenFrom(false);
                    }}
                    color="secondary"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                      sx: { cursor: "pointer" },
                    }}
                    helperText={
                      toError === "invalidDate"
                        ? t("Please follow the format dd/mm/yyyy")
                        : toError === "minDate"
                        ? t("Please choose valid time")
                        : ""
                    }
                  />
                )}
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </FormControl>
          <Box>
            <Button
              sx={{
                width: { xs: "100%", md: 100 },
                marginLeft: "15px",
                height: "50px",
              }}
              size="large"
              variant="contained"
              onClick={(e) => {
                handleClearFilter();
              }}
              color="secondary"
            >
              {t("Clear")}
            </Button>
          </Box> */}
        </Box>
        <Button
          onClick={() => {
            dispatch(layoutActions.openModal());
          }}
          variant="contained"
          size="large"
          color="secondary"
        >
          Create a new category
        </Button>
      </Box>
      <CategoriesTable />
      {/* <Pagination count={totalPagePagination(pagination)} page={pagination?.page + 1 || 1} onChange={handlePagination} /> */}
      <Stack sx={{ py: "20px" }}>
        <Pagination count={10} page={1} />
      </Stack>
    </>
  );
};

export default Categories;
