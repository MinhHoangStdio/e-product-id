import { useEffect, useState } from "react";
import { Typography, Grid, Box, Button, Stack, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { productActions } from "../../store/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { ParamsModalConfirm } from "../../types/modal";
import { DetailProduct } from "../../types/products";
import { modalActions } from "../../store/modal/modalSlice";
import ImageSlider from "../../components/ImageSlider";
import { EApprovalRequest, EApprovalStatus } from "../../types/enums/product";
import ProductStatus from "../../components/chip/ProductStatus";
import TextDetail from "../../components/TextDetail";
import { toUpperFirstLetter } from "../../utils/string/toUpperFirstLetter";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.detailProduct);
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const confirmApproveOrRejectorBan = (data: DetailProduct, status: string) => {
    const payload = {
      id: data.id,
      params: {
        status,
      },
    };
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắn muốn{" "}
          {status == EApprovalRequest.Approve
            ? "phê duyệt"
            : status == EApprovalRequest.Reject
            ? "từ chối phê duyệt"
            : "chặn"}{" "}
          sản phẩm <b>"{data.name}"</b> không ?
        </span>
      ),
      onAction: () =>
        dispatch(
          status == EApprovalRequest.Approve
            ? productActions.approveProduct(payload)
            : status == EApprovalRequest.Reject
            ? productActions.rejectProduct(payload)
            : productActions.banProduct(payload)
        ),
      buttonText: "Xác nhận",
    };
    dispatch(modalActions.showModal(params));
  };

  useEffect(() => {
    dispatch(productActions.getDetailProduct(id));
  }, [dispatch]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [product]);

  return (
    (product && (
      <Grid sx={{ width: "100%" }} p={4} container columnSpacing={4}>
        <Grid item xs={6}>
          <ImageSlider
            imagesUrl={product?.images || []}
            urlSelected={urlSelected}
            setSelected={setUrlSelected}
          />
        </Grid>
        <Grid item xs={6}>
          <Box>
            {product.approval_status == EApprovalStatus.Requesting && (
              <Box
                display={"flex"}
                gap={1}
                flexDirection={"column"}
                marginBottom={"20px"}
              >
                <Typography variant="h4" color={"red"}>
                  {"Sản phẩm này đang chờ phê duyệt."}
                </Typography>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={(e) => {
                      dispatch(() =>
                        confirmApproveOrRejectorBan(
                          product,
                          EApprovalRequest.Approve
                        )
                      );
                    }}
                  >
                    {"Phê duyệt"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ marginLeft: "15px" }}
                    onClick={(e) => {
                      dispatch(() =>
                        confirmApproveOrRejectorBan(
                          product,
                          EApprovalRequest.Reject
                        )
                      );
                    }}
                  >
                    {"Từ chối"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ marginLeft: "15px" }}
                    onClick={(e) => {
                      dispatch(() =>
                        confirmApproveOrRejectorBan(
                          product,
                          EApprovalRequest.Ban
                        )
                      );
                    }}
                  >
                    {"Chặn"}
                  </Button>
                </div>
              </Box>
            )}
            {/* <Typography variant="h2">{product.name}</Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "20px" }}>
              <b>Tên sản phẩm:</b> {product.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              <b>Tổ chức:</b> {product?.organization?.name}
            </Typography>
            {product?.category && (
              <Typography sx={{ fontSize: "16px" }}>
                <b>Danh mục:</b> {product?.category?.name}
              </Typography>
            )}
            <Typography sx={{ fontSize: "16px" }}>
              <b>Trạng thái phê duyệt:</b>{" "}
              <ProductStatus status={product.approval_status} />
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              <b>Mô tả:</b> <br />
              {product?.description}
            </Typography>
            {product?.payload &&
              Object.entries(product.payload).map(
                ([key, value]: [string, any]) => (
                  <Typography sx={{ fontSize: "16px" }} key={key}>
                    <b>{key}:</b> {value}
                  </Typography>
                )
              )} */}
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <TextDetail label="Tổ chức" value={product?.organization?.name} />

              <TextDetail label="Mô tả sản phẩm" value={product?.description} />
              <TextDetail
                label="Lượt xem"
                value={(product?.view_count || "0") as string}
              />
              <Divider />
              <Stack spacing={1}>
                <Stack spacing={1}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 500, color: "#4b4b4b" }}
                  >
                    Trạng thái sản phẩm
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#767676" }}>
                    <ProductStatus status={product.approval_status} />
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 500, color: "#4b4b4b" }}
                >
                  Chi tiết
                </Typography>
                <Typography variant="h6" sx={{ color: "#767676" }}>
                  <b>Danh mục:</b>{" "}
                  {product?.category?.name
                    ? product?.category?.name
                    : "Chưa xác định"}
                </Typography>
                {product?.payload &&
                  Object.entries(product.payload).map(
                    ([key, value]: [string, any]) => (
                      <Typography
                        key={key}
                        variant="h6"
                        sx={{ color: "#767676" }}
                      >
                        <b>{`${toUpperFirstLetter(key)}: `}:</b> {value}
                      </Typography>
                    )
                  )}
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    )) || (
      <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
        Không tìm thấy sản phẩm
      </Typography>
    )
  );
};

export default ProductDetail;
