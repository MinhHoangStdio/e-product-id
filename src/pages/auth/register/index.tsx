import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Heading from "../../../components/Heading";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email("Invalid email").required("Insert email"),
        password: yup.string().required("Insert password"),
        confirmPassword: yup
          .string()
          .required("Insert confirm password")
          .oneOf([yup.ref("password")], "Your passwords do not match."),
      })
    ),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <Stack direction="column" gap="16px">
      <Heading title="Welcome to this app" subtitle="Create an account!" />
      <TextField
        id="email"
        label="Email"
        inputProps={{ ...register("email") }}
        error={!!errors.email?.message}
        required
        helperText={errors.email?.message}
      />
      <TextField
        id="password"
        label="Password"
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
      />{" "}
      <TextField
        id="confirm-password"
        label="Confirm password"
        type={showPassword ? "text" : "password"}
        inputProps={{ ...register("confirmPassword") }}
        error={!!errors.confirmPassword?.message}
        required
        helperText={errors.confirmPassword?.message}
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
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Register
      </Button>
    </Stack>
  );
};

export default Register;
