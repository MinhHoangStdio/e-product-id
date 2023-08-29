import { useEffect, useState } from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { productActions } from "../../store/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { ParamsModalConfirm } from "../../types/modal";
import { DetailProduct } from "../../types/products";
import { modalActions } from "../../store/modal/modalSlice";
import ImageSlider from "../../components/ImageSlider";
import { EApprovalRequest, EApprovalStatus } from "../../types/enums/product";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.detailProduct);
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const confirmApproveOrReject = (data: DetailProduct, status: string) => {
    const payload = {
      id: data.id,
      params: {
        status,
      },
    };
    const isApproved = status == EApprovalRequest.Approve;
    const params: ParamsModalConfirm = {
      title: "Xác nhận",
      content: (
        <span>
          Bạn có chắc chắn muốn {isApproved ? "xác nhận" : "từ chối"} phê duyệt
          sản phẩm ngày không <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () =>
        dispatch(
          isApproved
            ? productActions.approveProduct(payload)
            : productActions.rejectProduct(payload)
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
        <Grid item xs={4}>
          <ImageSlider
            imagesUrl={product?.images || []}
            urlSelected={urlSelected}
            setSelected={setUrlSelected}
          />
        </Grid>
        <Grid item xs={8}>
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
                        confirmApproveOrReject(
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
                        confirmApproveOrReject(product, EApprovalRequest.Reject)
                      );
                    }}
                  >
                    {"Từ chối"}
                  </Button>
                </div>
              </Box>
            )}
            <Typography variant="h2">{product.name}</Typography>
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
              <b>Trạng thái phê duyệt:</b> {product.approval_status}
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
              )}
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
