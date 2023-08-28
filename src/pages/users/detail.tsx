import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { Box, Typography } from "@mui/material";
import { userActions } from "../../store/user/userSlice";
import { useEffect } from "react";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userDetail);

  useEffect(() => {
    dispatch(userActions.getDetailUser(id));
  }, [dispatch, id]);

  return user ? (
    <Box p={4}>
      <Typography variant="h2">Thông tin người dùng</Typography>
      <Typography sx={{ fontSize: "16px", mt: 1 }}>
        <b>Tên người dùng:</b> {user.name}
      </Typography>
      <Typography sx={{ fontSize: "16px", mt: 1 }}>
        <b>Email:</b> {user.email}
      </Typography>
    </Box>
  ) : (
    <></>
  );
};

export default UserDetail;
