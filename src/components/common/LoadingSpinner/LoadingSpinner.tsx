import { Box, CircularProgress } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <CircularProgress data-testid="loading-spinner" />
    </Box>
  );
}

export default LoadingSpinner;
