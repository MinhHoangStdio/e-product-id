import { useEffect, useState } from "react";
import { Typography, Box, Stack, Chip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { consignmentActions } from "../../store/consignment/consignmentSlice";
import { convertDateMui } from "../../utils/convertDate";

const ConsignmentDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const consignment = useAppSelector(
    (state) => state.consignment.consignmentDetail
  );
  const product = consignment?.product;
  const chains = consignment?.chains;
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  // const confirmDelete = (data: Chain) => {
  //   const params: ParamsModalConfirm = {
  //     title: "Confirm",
  //     content: (
  //       <span>
  //         Do you want to delete a chain <b>"{data.name}"</b>?
  //       </span>
  //     ),
  //     onAction: () =>
  //       dispatch(
  //         chainsActions.removeChains({ chainId: data.id, consignmentId: id })
  //       ),
  //     buttonText: "Delete",
  //   };
  //   dispatch(modalActions.showModal(params));
  // };

  useEffect(() => {
    dispatch(consignmentActions.getConsignmentDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [consignment, product]);

  return (
    <>
      {(consignment && (
        <Box p={4}>
          <Typography variant="h1">Thông tin lô hàng</Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Tên lô hàng:</b> {consignment.name}
          </Typography>
          {consignment.product && (
            <Link to={`/products/${consignment.product.id}`}>
              <Typography
                sx={{
                  fontSize: "16px",
                  mt: 1,
                  "&:hover": { color: "#00B3D5" },
                }}
              >
                <b>Tên sản phẩm:</b> {consignment.product?.name}
              </Typography>
            </Link>
          )}
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Số lượng:</b> {consignment.amount}
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Mô tả:</b> {consignment?.description}
          </Typography>
          <Typography sx={{ fontSize: "16px", mt: 1 }}>
            <b>Trạng thái:</b>{" "}
            {consignment?.is_sold_out ? "Hết hàng" : "Còn hàng"}
          </Typography>
          {consignment?.payload &&
            Object.entries(consignment.payload).map(
              ([key, value]: [string, any]) => (
                <Typography sx={{ fontSize: "16px", mt: 1 }} key={key}>
                  <b>{key}:</b> {value}
                </Typography>
              )
            )}
        </Box>
      )) || (
        <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
          Không tìm thấy lô hàng
        </Typography>
      )}
      {/* {product && (
        <Grid
          sx={{ width: "100%", alignItems: "center" }}
          p={4}
          container
          columnSpacing={4}
        >
          <Grid item xs={4}>
            <img
              src={product?.images.length && product?.images[0]}
              alt="Product image"
              style={{
                height: 400,
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography variant="h3">{product?.name}</Typography>
              <Typography sx={{ fontSize: "16px", marginTop: "20px" }}>
                <b>Product name:</b> {product?.name}
              </Typography>
              <Typography sx={{ fontSize: "16px", mt: 1 }}>
                <b>Category:</b> {product?.category.name}
              </Typography>
              <Typography sx={{ fontSize: "16px", mt: 1 }}>
                <b>Approval status:</b> {product?.approval_status}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )} */}

      {(chains?.length || "") && (
        <>
          <Typography variant="h2" pl={4}>
            Danh sách công đoạn
          </Typography>
          {chains?.map((chain, index) => (
            <Box p={4} key={index} pt={0}>
              <Stack mt={1} direction="row" gap={1} alignItems="center">
                <Typography sx={{ fontSize: "18px" }}>
                  <b>
                    {index + 1 + ". "} {chain.name}
                  </b>
                </Typography>
                {chain?.payload?.data?.date && (
                  <Chip label={convertDateMui(chain?.payload?.data?.date)} />
                )}
                {/* <CustomButton
                  label="Delete"
                  color="error"
                  onClick={() => confirmDelete(chain)}
                /> */}
              </Stack>
              <Typography sx={{ fontSize: "16px", mt: 1 }}>
                {chain.description}
              </Typography>
              {chain?.payload &&
                Object.entries(chain.payload).map(
                  ([key, value]: [string, any]) => (
                    <Typography sx={{ fontSize: "16px", mt: 1 }} key={key}>
                      <b>{key}:</b> {value}
                    </Typography>
                  )
                )}

              {(chain?.images?.length || "") && (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  gap={1}
                  alignItems="center"
                  mt={2}
                >
                  {chain.images?.map((image, index) => (
                    <img
                      src={image}
                      alt="Ảnh công đoạn"
                      style={{
                        height: 300,
                        objectFit: "cover",
                      }}
                      key={index}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default ConsignmentDetail;
