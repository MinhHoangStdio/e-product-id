import { useEffect } from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { productActions } from "../../store/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { ParamsModalConfirm } from "../../types/modal";
import { DetailProduct } from "../../types/products";
import { modalActions } from "../../store/modal/modalSlice";

import Slider from "react-slick";// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ImageSlider({imageUrl}: {imageUrl: string[]}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function(i: any) {
      return (
        <a>
          <img style={{
            width: 'auto',
            height: '100%',
          }} src={imageUrl[i]} alt="image"/>
        </a>
      );
    },
  };
  return (
    <Slider {...settings}>
      {imageUrl.map((image, index) => (
        <div>
          <img src={image} alt="" key={index} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
        </div>
      ))}
    </Slider>
  );
}

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.product.detailProduct
  );

  const confirmApproveOrReject = (data: DetailProduct, status: string) => {
    const payload = {
      id: data.id,
      params: {
        status
      }
    }
    const isApproved = status == "approved"
    const params: ParamsModalConfirm = {
      title: "Confirm",
      content: (
        <span>
          Do you want to {isApproved ? "approve" : "reject"} a product <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () => dispatch(isApproved ? productActions.approveProduct(payload) : productActions.rejectProduct(payload)),
      buttonText: isApproved ? "Approve" : "Reject",
    };
    dispatch(modalActions.showModal(params));
  };

  useEffect(() => {
    dispatch(productActions.getDetailProduct(id));
  }, [dispatch]);

  return product && (
    <>
      <Grid container padding={4} columnSpacing={4}>
        <Grid sx={{
          '.slick-dots li': {
            width: '50px',
            height: '50px'
          },
          '.slick-dots': {
            bottom: '-61px'
          }
        }} item xs={4}> 
          <ImageSlider imageUrl={product?.images || []}/>
        </Grid>
        <Grid item xs={8}>
          <Box>
            {
              product.approval_status == "requesting" && (
                <Box display={"flex"} gap={1} flexDirection={"column"} marginBottom={"20px"}>
                  <Typography variant="h4" color={"red"}>{"This product has submitted a request for approval but has not been approved yet."}</Typography>
                  <div>
                    <Button variant="outlined" size="small" color="secondary" 
                      onClick={(e) => {
                        dispatch(() => confirmApproveOrReject(product, "approved"));
                      }}
                    >
                      {"Approve"}
                    </Button>
                    <Button variant="outlined" size="small" color="error" sx={{marginLeft: "15px"}}
                      onClick={(e) => {
                        dispatch(() => confirmApproveOrReject(product, "reject"));
                      }}
                    >
                      {"Reject"}
                    </Button> 
                  </div>
                </Box>
              )
            }
            <Typography variant="h2">{product.name}</Typography>
            <Typography variant="h3">{
              product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }</Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "20px" }}>
              Product name: {product.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>Organizer: {product.organizer.name}</Typography>
            <Typography sx={{ fontSize: "16px" }}>Category: {product.category.name}</Typography>
            <Typography sx={{ fontSize: "16px" }}>Approval status: {product.approval_status}</Typography>
            <Typography sx={{ fontSize: "16px" }}>
              Description: {product.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  ) || <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>Product not found.</Typography>;
}

export default ProductDetail;
