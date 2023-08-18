import { Box, Grid, Stack } from "@mui/material";

function ImageSlider({
  imagesUrl,
  setSelected,
  urlSelected,
}: {
  imagesUrl: string[];
  setSelected: (url: any) => void;
  urlSelected: any;
}) {
  return (
    <Stack gap={1}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          height: "600px",
          bgcolor: "#000",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img src={urlSelected} style={{ width: "100%" }} />
      </Box>
      <Grid container>
        {imagesUrl.map((url, i) => (
          <Grid item xs={3} sx={{ px: "4px" }}>
            <Box
              onClick={() => setSelected(url)}
              sx={{
                cursor: "pointer",
                border:
                  urlSelected == url ? "4px solid #0077ff" : "1px solid #ccc",
                borderRadius: "8px",
                width: "100%",
                height: "100%",
                bgcolor: "#000",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img src={url} style={{ width: "100%" }} alt="" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
export default ImageSlider;
