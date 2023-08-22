import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { userActions } from "../../../store/user/userSlice";
import { TextField } from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { yupResolver } from "@hookform/resolvers/yup";

interface FieldValues {
  name: string;
  email: string;
}

const CreateUserModal = () => {
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
        name: yup.string().required("Please enter a name"),
        email: yup
          .string()
          .required("Please enter a email")
          .email("Invalid email"),
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
    console.log(payload);
    // dispatch(userActions.createUser(payload));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create a new user" />
      <TextField
        id="name"
        label="Name"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        id="email"
        label="Email"
        inputProps={{ ...register("email") }}
        error={!!errors.email?.message}
        required
        helperText={errors.email?.message}
      />
    </div>
  );

  return (
    <BaseModal
      disabled={loadingCreateUser}
      isOpen={isOpenModal}
      title="Create a new user"
      actionLabel="Create"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateUserModal;
