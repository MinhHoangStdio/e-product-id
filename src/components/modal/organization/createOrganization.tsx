import { SubmitHandler, useForm } from "react-hook-form";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { organizationActions } from "../../../store/organization/organizationSlice";
import { MenuItem, TextField } from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { useEffect, useState } from "react";
import { userActions } from "../../../store/user/userSlice";
import { User } from "../../../types/user";

interface FieldValues {
  name: string;
  selectedUser: number;
}

const CreateOrganizationModal = () => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector((state) => state.user.listValidUsers);
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenModalOrganization
  );
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    members: [],
  });

  const handleFieldChange = (event: any) => {
    setFormState((formState) => ({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  const onCloseModal = () => {
    dispatch(layoutActions.closeModalOrganization());
    reset();
    setSelectedUser(null);
    setFormState({ members: [] });
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Vui lòng nhập vào tên tổ chức"),
        selectedUser: yup
          .number()
          .min(1, "Vui lòng chọn một chủ sở hữu")
          .required("Vui lòng chọn một chủ sở hữu"),
      })
    ),
  });

  useEffect(() => {
    if (isOpenModal) {
      dispatch(userActions.getValidUsers());
    }
  }, [dispatch, isOpenModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const members = formState.members as number[];
    if (selectedUser && !members.includes(selectedUser)) {
      members.push(selectedUser);
    }
    const payload = {
      name: data.name,
      owner_id: selectedUser,
      members: members,
      onReset() {
        reset();
        onCloseModal();
      },
    };
    dispatch(organizationActions.createOrganization(payload));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Tạo mới một tổ chức" />
      <TextField
        id="name"
        label="Tên tổ chức"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        variant="outlined"
        select
        id="selectedUser"
        label="Chủ sở hữu"
        value={selectedUser}
        error={!!errors.selectedUser?.message}
        helperText={errors.selectedUser?.message}
        InputLabelProps={{ shrink: !!selectedUser }}
        onChange={(e: any) => {
          clearErrors("selectedUser");
          setSelectedUser(e.target.value);
          setFormState({ members: [] });
          setValue(
            "selectedUser",
            e.target.value === -1 ? null : e.target.value
          );
        }}
      >
        {userList.map((user: any) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        name="members"
        id="members"
        variant="outlined"
        label="Thành viên"
        SelectProps={{
          multiple: true,
          value: formState.members,
          onChange: handleFieldChange,
        }}
      >
        {userList
          .filter((user) => user.id !== (selectedUser as number))
          .map((user: User, key: any) => (
            <MenuItem value={user.id} key={key}>
              {user.name}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpenModal}
      title="Tạo mới một tổ chức"
      actionLabel="Tạo mới"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateOrganizationModal;
