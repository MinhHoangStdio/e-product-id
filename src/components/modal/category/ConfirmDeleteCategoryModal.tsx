import BaseModal from "../BaseModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { categoryActions } from "../../../store/category/categorySlice";
import { layoutActions } from "../../../store/layout/layoutSlice";
import { IconButton, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ConfirmDeleteCategoryModal = () => {
  const dispatch = useAppDispatch();
  const idCategory = useAppSelector(
    (state) => state.category.idCategorySelected
  );
  const isLoading = useAppSelector(
    (state) => state.category.loadingRemoveCategory
  );
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenModalConfirm
  );
  const onCloseModal = () => {
    dispatch(layoutActions.closeModalConfirm());
    dispatch(categoryActions.resetSelectedId());
  };

  const onSubmit = () => {
    dispatch(categoryActions.removeCategory(idCategory));
  };

  const bodyContent = (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Typography>Are you sure to delete this category?</Typography>
      <IconButton color="error">
        <ErrorOutlineIcon
          sx={{
            width: 100,
            height: 100,
          }}
          fontSize="medium"
        />
      </IconButton>
    </Stack>
  );

  return (
    <BaseModal
      disabled={isLoading}
      isOpen={isOpenModal}
      title="Confirm"
      actionLabel="Delete"
      onClose={onCloseModal}
      onSubmit={onSubmit}
      body={bodyContent}
      width="350px"
    />
  );
};

export default ConfirmDeleteCategoryModal;
