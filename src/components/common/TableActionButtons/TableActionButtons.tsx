import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type TableActionButtonsProps = {
  editLink: string;
  onDelete: () => void;
  disableDelete?: boolean;
};

const TableActionButtons = ({
  editLink,
  onDelete,
  disableDelete,
}: TableActionButtonsProps) => (
  <>
    <Button
      component={Link}
      to={editLink}
      variant="outlined"
      size="small"
      sx={{ mr: 1 }}
    >
      Edit
    </Button>
    <Button
      variant="outlined"
      size="small"
      color="error"
      onClick={onDelete}
      disabled={disableDelete}
    >
      Delete
    </Button>
  </>
);

export default TableActionButtons;
