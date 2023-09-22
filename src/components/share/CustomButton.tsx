import { Button } from "@mui/material";
import { colorToken } from "../../theme/colorToken";
import { useAppSelector } from "../../hooks/store";
type ICustomButton = {
  color: "primary" | "error" | "info";
  size?: "large" | "small" | "medium";
  disabled?: boolean;
  onClick?: () => void;
  label: string;
  type?: "submit" | "button";
  Icon?: any;
};

const CustomButton = ({
  color,
  disabled,
  onClick,
  label,
  size = "large",
  type = "button",
  Icon,
}: ICustomButton) => {
  const mode = useAppSelector((state) => state.layout.theme);
  const colors = colorToken(mode);

  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: `${colors.button[color]} !important`,
        "&.Mui-disabled": {
          color: "#c0c0c0",
        },
      }}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      startIcon={Icon ? Icon : null}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
