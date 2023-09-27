import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { layoutActions } from "../../store/layout/layoutSlice";
import { Stack, Typography } from "@mui/material";
import { userActions } from "../../store/user/userSlice";
import AddMemberTable from "../../pages/organization/AddMemberTable";

const titleModal = {
  fontSize: "20px",
  fontWeight: "bold",
  padding: "10px 24px !important",
  borderBottom: "1px solid #ccc",
};
const contentModal = {
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
};

export default function AddMember() {
  const dispatch = useAppDispatch();
  const isOpenModal = useAppSelector(
    (state) => state.layout.isOpenModalAddMember
  );

  const handleClose = () => {
    dispatch(layoutActions.closeModalAddMember());
  };

  useEffect(() => {
    if (isOpenModal) {
      dispatch(userActions.getValidUsers());
    }
  }, [dispatch, isOpenModal]);

  return (
    <Dialog
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={titleModal}>
        <Stack>
          Thêm thành viên
          <Typography sx={{ color: "#898989", fontSize: 12 }}>
            Chọn thành viên bạn muốn thêm vào tổ chức
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent sx={contentModal}>
        <AddMemberTable />
      </DialogContent>
    </Dialog>
  );
}
