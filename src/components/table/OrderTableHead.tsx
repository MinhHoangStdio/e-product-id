import { TableCell, TableHead, TableRow } from "@mui/material";
import { IOrderTableHead } from "../../types/table";

const OrderTableHead = ({ headCells, order, orderBy }: IOrderTableHead) => {
  return (
    <TableHead>
      <TableRow>
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell?.id}
            align={headCell?.align}
            padding={headCell?.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id && order ? order : false}
            sx={{
              width: headCell?.width || "auto",
              fontSize: headCell?.fontSize,
              paddingLeft: headCell?.paddingLeft,
            }}
          >
            {headCell?.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default OrderTableHead;
