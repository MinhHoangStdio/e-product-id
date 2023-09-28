import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { userActions } from "../../../store/user/userSlice";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FieldValues {
  name: string;
  email: string;
  password: string;
}

const CreateUserModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { loadingCreateUser } = useAppSelector((state) => state.user);
  const isOpenModal = useAppSelector((state) => state.layout.isOpenModalUser);

  const onCloseModal = () => {
    dispatch(layoutActions.closeModalUser());
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .required("Vui lòng nhập tên người dùng")
          .min(4, "Tên người dùng phải có nhiều hơn 4 kí tự."),
        email: yup
          .string()
          .matches(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            "Email không hợp lệ"
          )
          .required("Vui lòng nhập email")
          .email("Email không hợp lệ."),
        password: yup
          .string()
          .required("Vui lòng nhập mật khẩu")
          .min(6, "Mật khẩu phải có nhiều hơn 6 kí tự."),
      })
    ),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const payload = {
      params: data,
      onReset() {
        reset();
      },
    };
    dispatch(userActions.createUser(payload));
    21;
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Tạo mới một người dùng" />
      <TextField
        id="email"
        label="Email"
        inputProps={{ ...register("email") }}
        error={!!errors.email?.message}
        required
        helperText={errors.email?.message}
      />
      <TextField
        id="name"
        label="Tên người dùng"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        id="password"
        label="Mật khẩu"
        type={showPassword ? "text" : "password"}
        inputProps={{ ...register("password") }}
        error={!!errors.password?.message}
        required
        helperText={errors.password?.message}
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
    </div>
  );

  return (
    <BaseModal
      disabled={loadingCreateUser}
      isOpen={isOpenModal}
      title="Tạo mới một người dùng"
      actionLabel="Tạo mới"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateUserModal;
