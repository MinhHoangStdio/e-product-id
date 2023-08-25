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
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
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
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Please enter name"),
        selectedUser: yup
          .number()
          .min(1, "Please choose a user")
          .required("Please choose a user"),
      })
    ),
  });

  useEffect(() => {
    dispatch(userActions.getValidUsers());
  }, [dispatch]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const members = formState.members as number[];
    if (selectedUser && !members.includes(parseInt(selectedUser))) {
      members.push(parseInt(selectedUser));
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
      <Heading title="Create a new organization" />
      <TextField
        id="name"
        label="Organization Name"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        variant="outlined"
        select
        id="selectedUser"
        label="Owner"
        value={selectedUser}
        InputLabelProps={{ shrink: !!selectedUser }}
        onChange={(e: any) => {
          setSelectedUser(e.target.value);
          setValue(
            "selectedUser",
            e.target.value === -1 ? null : e.target.value
          );
        }}
      >
        <MenuItem value={-1}>None</MenuItem>
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
        label="Members"
        SelectProps={{
          multiple: true,
          value: formState.members,
          onChange: handleFieldChange,
        }}
      >
        {userList.map((user: User, key: any) => (
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
      title="Create a new organization"
      actionLabel="Create"
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateOrganizationModal;
