import { Box, Grid, Stack } from "@mui/material";
import noImg from "../assets/emptyData/no-picture.png";

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
          border: "1px solid #f6f6f6",
          borderRadius: "8px",
          height: "400px",
          bgcolor: "#f6f6f6",
          backgroundImage: urlSelected
            ? `url(${urlSelected})`
            : `url(${noImg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      ></Box>
      <Grid container>
        {imagesUrl.length ? (
          imagesUrl.map((url, i) => (
            <Grid key={url} item xs={3} sx={{ px: "4px" }}>
              <Box
                onClick={() => setSelected(url)}
                sx={{
                  cursor: "pointer",
                  border:
                    urlSelected == url ? "4px solid #0077ff" : "1px solid #ccc",
                  borderRadius: "8px",
                  width: "100%",
                  height: "80px",
                  bgcolor: "#f6f6f6",
                  backgroundImage: urlSelected
                    ? `url(${url})`
                    : `url(${noImg})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  overflow: "hidden",
                }}
              ></Box>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Stack>
  );
}
export default ImageSlider;
