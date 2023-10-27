import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
type ILinkTextDetail = { label: string; value: string; link: string };

const LinkTextDetail = ({ label, value, link }: ILinkTextDetail) => {
  const [isDetailText, setIsDetailText] = useState(false);
  const toggleDetailText = () => {
    setIsDetailText(!isDetailText);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h4" sx={{ fontWeight: 500, color: "#4b4b4b" }}>
        {label}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#767676",
          textDecoration: "underline",
          "&:hover": {
            color: "#0da0db",
            textDecoration: "none",
          },
        }}
      >
        <Link to={link}>
          {value.length > 500
            ? !isDetailText
              ? `${value.slice(0, 500)} `
              : `${value} `
            : value}
        </Link>

        {value.length > 500 && (
          <Typography
            variant="h6"
            sx={{
              color: "#363636",
              cursor: "pointer",
              "&:hover": { color: "#00B3D5", textDecoration: "underline" },
              display: "inline-block",
            }}
            onClick={toggleDetailText}
          >
            {isDetailText ? `(ẩn bớt)` : `(...xem thêm)`}
          </Typography>
        )}
      </Typography>
    </Stack>
  );
};

export default LinkTextDetail;
