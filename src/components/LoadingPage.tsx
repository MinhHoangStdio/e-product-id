import { CircularProgress, Stack } from "@mui/material";

const LoadingPage = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "90vh" }}
    >
      <CircularProgress color="secondary" />
    </Stack>
  );
};

export default LoadingPage;
