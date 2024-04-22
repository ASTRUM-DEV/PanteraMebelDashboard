import React from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Checkbox, TableContainer, Paper
} from '@mui/material';
import Box from "@mui/material/Box";

export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  type?: "img" | "text"
}

interface CustomTableProps {
  columns: TableColumn[];
  data: any[];
  selected: number[];
  onSelectToggle: (id: number) => void;
  onSelectAll: () => void;
  onRowClick: (event: any, id: number) => void;
  isAllSelected: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
                                                   columns,
                                                   data,
                                                   selected,
                                                   onSelectToggle,
                                                   onSelectAll,
                                                   onRowClick,
                                                   isAllSelected
                                                 }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <TableCell width={"20px"}>
              <Checkbox
                checked={isAllSelected}
                onChange={onSelectAll}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.id} style={{minWidth: column.minWidth}}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              hover
              style={{ cursor: "pointer" }}
              onClick={(e) => onRowClick(e, row.id)}
              sx={{
                '&:last-of-type td, &:last-of-type th': {border: 0},
              }}
            >
              <TableCell>
                <Checkbox
                  checked={selected.indexOf(row.id) !== -1}
                  onChange={() => onSelectToggle(row.id)}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} align='left'>
                  {column.type === "img" ? (
                    <Box
                      component="img"
                      src={row[column.id]}
                      sx={{
                        height: "50px",
                      }}
                    />
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
