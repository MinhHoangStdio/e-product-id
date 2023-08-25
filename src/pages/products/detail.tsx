import { useEffect, useState } from "react";
import { Typography, Grid, Box, Button, Stack } from "@mui/material";
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
      title: "Confirm",
      content: (
        <span>
          Do you want to {isApproved ? "approve" : "reject"} a product{" "}
          <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () =>
        dispatch(
          isApproved
            ? productActions.approveProduct(payload)
            : productActions.rejectProduct(payload)
        ),
      buttonText: isApproved ? "Approve" : "Reject",
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
                  {
                    "This product has submitted a request for approval but has not been approved yet."
                  }
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
                    {"Approve"}
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
                    {"Reject"}
                  </Button>
                </div>
              </Box>
            )}
            <Typography variant="h2">{product.name}</Typography>
            <Typography variant="h3">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "20px" }}>
              <b>Product name:</b> {product.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              <b>Organizer:</b> {product?.organization?.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              <b>Category:</b> {product?.category.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              <b>Approval status:</b> {product.approval_status}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              <b>Description:</b> <br />
              {product?.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )) || (
      <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
        Product not found.
      </Typography>
    )
  );
};

export default ProductDetail;
