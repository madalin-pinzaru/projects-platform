import { Box, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h6" color="error" align="center">
          {t("errorPage.title")}
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {t("errorPage.retry")}
        </Typography>
      </Paper>
    </Box>
  );
}

export default ErrorPage;
