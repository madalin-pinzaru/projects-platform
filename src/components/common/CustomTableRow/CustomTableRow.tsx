import { TableRow, TableCell } from "@mui/material";
import type { ReactNode } from "react";

type EntityTableRowProps = {
  cells: ReactNode[];
  actions?: ReactNode;
};

const CustomTableRow = ({ cells, actions }: EntityTableRowProps) => (
  <TableRow>
    {cells.map((cell, index) => (
      <TableCell key={index}>{cell}</TableCell>
    ))}
    {actions && <TableCell>{actions}</TableCell>}
  </TableRow>
);

export default CustomTableRow;
