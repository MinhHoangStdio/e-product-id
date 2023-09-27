import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authActions } from "../../store/auth/authSlice";
import CustomButton from "../../components/share/CustomButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormValues {
  currentPwd: string;
  newPwd: string;
  confirmNewPwd: string;
}

const ChangePwd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      currentPwd: "",
      newPwd: "",
      confirmNewPwd: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        currentPwd: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
        newPwd: yup.string().required("Vui lòng nhập mật khẩu mới"),
        confirmNewPwd: yup
          .string()
          .required("Vui lòng nhập xác nhận mật khẩu mới")
          .oneOf(
            [yup.ref("newPwd")],
            "Xác nhận mật khẩu mới không khớp với mật khẩu mới"
          ),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const payload = {
      params: {
        current_password: data.currentPwd,
        password: data.newPwd,
      },
      onReset() {
        reset();
      },
    };
    dispatch(authActions.changePwd(payload));
  };

  return (
    <Grid sx={{ p: 2 }} container>
      <Grid item xs={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap="16px">
            <Typography variant="h3">Đổi mật khẩu</Typography>
            <TextField
              id="currentPwd"
              label="Mật khẩu hiện tại"
              type={showPassword ? "text" : "password"}
              inputProps={{ ...register("currentPwd") }}
              error={!!errors.currentPwd?.message}
              required
              helperText={errors.currentPwd?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />{" "}
            <TextField
              id="newPwd"
              label="Mật khẩu mới"
              type={showPassword ? "text" : "password"}
              inputProps={{ ...register("newPwd") }}
              error={!!errors.newPwd?.message}
              required
              helperText={errors.newPwd?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="confirmNewPwd"
              label="Xác nhận mật khẩu mới"
              type={showPassword ? "text" : "password"}
              inputProps={{ ...register("confirmNewPwd") }}
              error={!!errors.confirmNewPwd?.message}
              required
              helperText={errors.confirmNewPwd?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <CustomButton color="primary" label="Thay đổi" type="submit" />
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChangePwd;
