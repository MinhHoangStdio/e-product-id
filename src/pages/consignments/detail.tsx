import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Chip,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { consignmentActions } from "../../store/consignment/consignmentSlice";
import { convertDateMui } from "../../utils/convertDate";
import CustomButton from "../../components/share/CustomButton";
import { ParamsModalConfirm } from "../../types/modal";
import { Chain } from "../../types/chain";
import { modalActions } from "../../store/modal/modalSlice";
import { chainsActions } from "../../store/chains/chainsSlice";
import ImageSlider from "../../components/ImageSlider";
import TextDetail from "../../components/TextDetail";
import { toUpperFirstLetter } from "../../utils/string/toUpperFirstLetter";
import { EApprovalStatus } from "../../types/enums/product";

const ConsignmentDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const consignment = useAppSelector(
    (state) => state.consignment.consignmentDetail
  );
  const product = consignment?.product;
  const chains = consignment?.chains;
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const confirmDelete = (data: Chain) => {
    const params: ParamsModalConfirm = {
      title: "Confirm",
      content: (
        <span>
          Bạn có chắc chắn muốn xóa công đoạn <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () =>
        dispatch(
          chainsActions.removeChains({ chainId: data.id, consignmentId: id })
        ),
      buttonText: "Xác nhận",
    };
    dispatch(modalActions.showModal(params));
  };

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
      {consignment ? (
        consignment?.name ? (
          <>
            <Grid sx={{ width: "100%" }} p={2} container columnSpacing={4}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h3" sx={{ fontWeight: 500 }}>
                  Thông tin lô hàng
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ImageSlider
                  imagesUrl={[]}
                  urlSelected={urlSelected}
                  setSelected={setUrlSelected}
                />
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      {consignment.name}
                    </Typography>
                  </Stack>
                  {consignment?.product?.approval_status ==
                    EApprovalStatus.Ban && (
                    <Alert sx={{ px: 1, py: 0, mt: 1 }} severity="error">
                      Sản phẩm của lô hàng này đã bị chặn.
                    </Alert>
                  )}
                  <Stack spacing={2} sx={{ mt: 3 }}>
                    <TextDetail
                      label="Mô tả lô hàng"
                      value={consignment?.description}
                    />
                    <Divider />
                    <Stack spacing={1}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 500, color: "#4b4b4b" }}
                      >
                        Chi tiết
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#767676" }}>
                        {consignment.product ? (
                          <Link to={`/products/${consignment.product.id}`}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: "#767676",
                                mt: 1,
                                "&:hover": { color: "#00B3D5" },
                              }}
                            >
                              <b>Sản phẩm:</b> {consignment.product?.name}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#767676",
                              mt: 1,
                            }}
                          >
                            <b>Sản phẩm:</b> Chưa xác định
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#767676" }}>
                        <b>Số lượng:</b> {consignment.amount}
                      </Typography>
                      {consignment?.payload ? (
                        Object.keys(consignment?.payload).length ? (
                          Object.keys(consignment?.payload).map((key, i) => (
                            <Typography variant="h6" sx={{ color: "#767676" }}>
                              <b>{toUpperFirstLetter(key)}</b>:{" "}
                              {consignment?.payload[key]}
                            </Typography>
                          ))
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
              <Grid sx={{ mt: 4 }} item xs={12}>
                <Divider />
              </Grid>
              <Grid sx={{ mt: 4 }} item xs={12}>
                <Stack direction="row" spacing={3} alignItems="center">
                  {" "}
                  <Typography variant="h4" sx={{ fontWeight: 500 }}>
                    Danh sách công đoạn
                  </Typography>
                </Stack>
                {chains?.length ? (
                  chains?.map((chain, index) => (
                    <Box pb={2} key={index} pt={2}>
                      <Stack mt={1} direction="row" gap={1} alignItems="center">
                        <Typography variant="h5" sx={{ color: "#4b4b4b" }}>
                          <b>{chain.name}</b>
                        </Typography>
                        {chain?.date_start && (
                          <Chip
                            size="small"
                            label={convertDateMui(chain?.date_start)}
                          />
                        )}
                        <CustomButton
                          label="Delete"
                          color="error"
                          onClick={() => confirmDelete(chain)}
                        />
                      </Stack>
                      <Typography variant="h6" sx={{ mt: 1, color: "#767676" }}>
                        {chain.description}
                      </Typography>

                      {(chain?.images?.length || "") && (
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          gap={1}
                          alignItems="center"
                          mt={2}
                          flexWrap={"wrap"}
                        >
                          {chain.images?.map((image, index) => (
                            <img
                              src={image}
                              alt="Product image"
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
                  ))
                ) : (
                  <Typography variant="h6" pt={1} sx={{ color: "#767676" }}>
                    Chưa có công đoạn nào
                  </Typography>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )
      ) : (
        <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
          Không tìm thấy lô hàng
        </Typography>
      )}
    </>
  );
};

export default ConsignmentDetail;
