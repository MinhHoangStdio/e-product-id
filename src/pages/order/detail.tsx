import { Typography, Grid, Box, Stack, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { orderActions } from "../../store/order/orderSlice";
import { EOrderStatus } from "../../types/enums/order";
import TextDetail from "../../components/order/TextDetail";
import LoadingPage from "../../components/LoadingPage";
import OrderStatus from "../../components/order/OrderStatus";
import LinkTextDetail from "../../components/order/LinkTextDetail";
import noImg from "../../assets/emptyData/no-picture.png";
import { formatVNDCurrency } from "../../utils/formatCurrency";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loadingDetailOrder, detailOrder } = useAppSelector(
    (state) => state.order
  );
  const order = detailOrder;
  const product = order?.product;
  const consignment = order?.consignment;

  useEffect(() => {
    dispatch(orderActions.getDetailOrder(id));
  }, [dispatch, id]);

  return (
    <>
      {(loadingDetailOrder && <LoadingPage />) ||
        (!loadingDetailOrder && order?.name ? (
          <>
            <Grid
              sx={{ width: "100%", marginLeft: "-25px" }}
              p={2}
              container
              columnSpacing={5}
            >
              <Grid item xs={12} mb={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Stack direction="row" spacing={1}>
                    <Typography variant="h3" sx={{ fontWeight: 500 }}>
                      Chi tiết đơn hàng
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={5}>
                <Box
                  p={3}
                  sx={{ border: "1px solid #e4d3d3", borderRadius: "10px" }}
                  minHeight={"550px"}
                >
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      Thông tin khách hàng
                    </Typography>
                  </Stack>
                  <Stack spacing={2} sx={{ mt: 3 }}>
                    <TextDetail label="Tên khách hàng" value={order.name} />
                    <TextDetail
                      label="Số điện thoại"
                      value={order.phone_number}
                    />
                    <TextDetail label="Địa chỉ" value={order.address} />
                    <TextDetail
                      label="Thời gian tạo"
                      value={order.created_at}
                    />
                    <TextDetail label="Ghi chú" value={order?.note || ""} />
                    <Divider />
                    <TextDetail
                      label="Số lượng"
                      value={(order?.amount || "0") as string}
                    />
                    <TextDetail
                      label="Đơn giá"
                      value={
                        formatVNDCurrency(order?.product?.unit_price || 0) +
                        ((order?.product?.unit &&
                          " / " + order?.product?.unit) ||
                          "")
                      }
                    />
                    <TextDetail
                      label="Thành tiền"
                      value={formatVNDCurrency(
                        (order?.amount || 0) * (order?.product?.unit_price || 0)
                      )}
                    />
                    <Divider />
                    <Stack direction="row" alignItems="center" spacing={3}>
                      <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        Trạng thái đơn hàng
                      </Typography>
                    </Stack>
                    <Stack
                      mt={2}
                      direction="row"
                      alignItems="center"
                      spacing={0}
                    >
                      <OrderStatus status={order.status as EOrderStatus} />
                    </Stack>
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={7}>
                <Box
                  sx={{ border: "1px solid #e4d3d3", borderRadius: "10px" }}
                  p={3}
                  minHeight={"550px"}
                >
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      Thông tin sản phẩm
                    </Typography>
                  </Stack>

                  {product && (
                    <Box
                      mt={3}
                      sx={{
                        border: "1px solid #eaeaea",
                        borderRadius: "8px",
                        height: "300px",
                        bgcolor: "#fff",
                        width: "80%",
                        backgroundImage: product?.images?.[0]
                          ? `url(${product?.images?.[0]})`
                          : `url(${noImg})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        overflow: "hidden",
                      }}
                    ></Box>
                  )}

                  <Stack spacing={2} sx={{ mt: 3 }}>
                    {product && (
                      <LinkTextDetail
                        label="Tên sản phẩm"
                        value={order?.product?.name || ""}
                        link={`/products/${product?.id}`}
                      />
                    )}

                    {consignment && (
                      <LinkTextDetail
                        label="Tên lô hàng"
                        value={consignment?.name || ""}
                        link={`/consignments/${consignment?.id}`}
                      />
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
            Không tìm thấy đơn hàng
          </Typography>
        ))}
    </>
  );
};

export default OrderDetail;
