import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseModal from "../BaseModal";
import Heading from "../../Heading";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { categoryActions } from "../../../store/category/categorySlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { useEffect, useState } from "react";

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
  const listAllCategories = useAppSelector(
    (state) => state.category.allListCategories
  );
  const [parentIdLabel, setParentIdLabel] = useState<any>(null);
  const typeModal = categorySelected.name ? "edit" : "create";
  const onCloseModal = () => {
    dispatch(layoutActions.closeModal());
    dispatch(categoryActions.resetSelectedCategory());
    setParentIdLabel(null);
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
        name: yup.string().required("Vui lòng nhập tên danh mục"),
      })
    ),
  });

  useEffect(() => {
    if (categorySelected.name) {
      setValue("name", categorySelected.name);
      setValue("parent_id", categorySelected.parent_id);
      setParentIdLabel(categorySelected.parent_id);
    }
  }, [categorySelected, setValue]);

  useEffect(() => {
    dispatch(categoryActions.getAllListCategories());
  }, []);

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
          typeModal == "create" ? "Tạo mới danh mục" : "Chỉnh sửa danh mục"
        }
      />
      <TextField
        id="name"
        label="Tên"
        inputProps={{ ...register("name") }}
        error={!!errors.name?.message}
        required
        helperText={errors.name?.message}
      />
      {/* <TextField
        id="parent_id"
        label="Parent ID"
        inputProps={{ ...register("parent_id") }}
        error={!!errors.parent_id?.message}
        required
        helperText={errors.parent_id?.message}
      /> */}

      <TextField
        variant="outlined"
        select
        id="parent_id"
        label="Danh mục cha"
        value={parentIdLabel}
        InputLabelProps={{ shrink: !!parentIdLabel }}
        onChange={(e: any) => {
          setParentIdLabel(e.target.value);
          if (e.target.value === -1) {
            setValue("parent_id", null);
          } else {
            setValue("parent_id", e.target.value);
          }
        }}
      >
        <MenuItem value={-1}>None</MenuItem>
        {listAllCategories.map((cate) => (
          <MenuItem key={cate.id} value={cate.id}>
            {cate.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );

  return (
    <BaseModal
      disabled={
        typeModal == "create" ? loadingCreateCategory : loadingEditCategory
      }
      isOpen={isOpenModal}
      title={
        typeModal == "create"
          ? "Tạo mới một danh mục"
          : "Chỉnh sửa một danh mục"
      }
      actionLabel={typeModal == "create" ? "Tạo" : "Chỉnh sửa"}
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default CreateAndEditCategoryModal;
