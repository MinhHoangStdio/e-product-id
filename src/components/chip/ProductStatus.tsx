import { Chip } from "@mui/material";
import { EApprovalStatus } from "../../types/enums/product";

interface ChipProps {
  label: string;
  color: "primary" | "secondary" | "info" | "warning" | "error" | "success";
}

type ProductStatus = Record<EApprovalStatus, ChipProps>;

const statusShow: ProductStatus = {
  [EApprovalStatus.Approve]: {
    label: "Đã xác nhận",
    color: "success",
  },
  [EApprovalStatus.Reject]: {
    label: "Đã từ chối",
    color: "error",
  },
  [EApprovalStatus.Pending]: {
    label: "Chưa yêu cầu",
    color: "secondary",
  },
  [EApprovalStatus.Requesting]: {
    label: "Chờ duyệt",
    color: "warning",
  },
};

const ProductStatus = ({ status }: { status: EApprovalStatus }) => {
  return (
    <Chip
      sx={{ color: "white", width: "89px", textAlign: "center" }}
      label={statusShow[status].label}
      color={statusShow[status].color}
      size="small"
    />
  );
};

export default ProductStatus;
