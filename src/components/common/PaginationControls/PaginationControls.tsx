import { Box, Button, Typography } from "@mui/material";

type Props = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={onPrevious}
        disabled={disablePrevious}
        sx={{ mr: 1 }}
      >
        Previous
      </Button>
      <Typography variant="body1" sx={{ mx: 2 }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button variant="outlined" onClick={onNext} disabled={disableNext}>
        Next
      </Button>
    </Box>
  );
}
