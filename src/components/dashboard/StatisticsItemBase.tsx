import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";

type StatisticsItemProps = {
  title: string;
  quantity: number;
  BodyContent?: React.ReactElement;
};

export default function StatisticsItemBase({
  title,
  quantity,
  BodyContent,
}: StatisticsItemProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "120px",
        borderRadius: "5px",
        border: "2px solid skyblue",
        bgcolor: "#f7fdfe",
        p: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h3" fontWeight={600}>
          {title}:
        </Typography>
        <Typography variant="h3" fontWeight={600}>
          {quantity}
        </Typography>
      </Stack>
      <Box sx={{ overflow: "auto", height: "100px" }}>{BodyContent}</Box>
    </Paper>
  );
}
