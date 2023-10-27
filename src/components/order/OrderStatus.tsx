import { Chip } from "@mui/material";
import { EOrderStatus } from "../../types/enums/order";

interface ChipProps {
  label: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "warning"
    | "error"
    | "success";
}

type OrderStatus = Record<EOrderStatus, ChipProps>;

const statusShow: OrderStatus = {
  [EOrderStatus.Pending]: {
    label: "Chưa xử lý",
    color: "info",
  },
  [EOrderStatus.Completed]: {
    label: "Đã hoàn thành",
    color: "success",
  },
};

const OrderStatus = ({ status }: { status: EOrderStatus }) => {
  return (
    <Chip
      sx={{
        color: "white",
        minWidth: "87px",
        maxWidth: "200px",
        textAlign: "center",
      }}
      label={statusShow[status].label}
      color={statusShow[status].color}
      size="small"
    />
  );
};

export default OrderStatus;
