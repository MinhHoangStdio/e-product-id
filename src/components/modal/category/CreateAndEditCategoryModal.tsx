import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { categoryActions } from "../../../store/category/categorySlice";
import { TextField } from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { useEffect } from "react";

interface FieldValues {
  name: string;
  parent_id?: number | string | null;
}

const CreateAndEditCategoryModal = () => {
  const dispatch = useAppDispatch();
  const { loadingCreateCategory, loadingEditCategory, categorySelected } =
    useAppSelector((state) => state.category);
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenModalCategory
  );
  const typeModal = categorySelected.name ? "edit" : "create";
  const onCloseModal = () => {
    dispatch(layoutActions.closeModal());
    dispatch(categoryActions.resetSelectedCategory());
    reset();
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: categorySelected.name || "",
      parent_id: categorySelected.parent_id || null,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Insert name"),
      })
    ),
  });

  useEffect(() => {
    if (categorySelected.name) {
      setValue("name", categorySelected.name);
      setValue("parent_id", categorySelected.parent_id);
    }
  }, [categorySelected, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (typeModal == "create") {
      const payload = {
        params: data,
        onReset() {
          reset();
        },
      };
      dispatch(categoryActions.createCategory(payload));
    } else if (typeModal == "edit") {
      const payload = {
        params: data,
        id: categorySelected.id,
        onReset() {
          reset();
        },
      };
      dispatch(categoryActions.editCategory(payload));
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={
          typeModal == "create"
            ? "Create a new category"
            : "Edit a new category"
        }
      />
      <TextField
        id="name"
        label="Name"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      <TextField
        id="parent_id"
        label="Parent ID"
        inputProps={{ ...register("parent_id") }}
        error={!!errors.parent_id?.message}
        required
        helperText={errors.parent_id?.message}
      />
    </div>
  );

  return (
    <BaseModal
      disabled={
        typeModal == "create" ? loadingCreateCategory : loadingEditCategory
      }
      isOpen={isOpenModal}
      title={
        typeModal == "create" ? "Create a new category" : "Edit a category"
      }
      actionLabel={typeModal == "create" ? "Create" : "Edit"}
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateAndEditCategoryModal;
