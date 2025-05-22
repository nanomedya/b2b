import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { TABLE_DATA_8 } from "@/data/data";
import { TableRowCarsRowData } from "@/types";


export default function MyBrandsTable() {
  const [data, setData] = useState<TableRowCarsRowData[]>(TABLE_DATA_8);


  const columns = [
    "ID",
    "Araçlar",
  ];
   

  return (
    <Table 
    className="dark:text-white" aria-label="Product Table">
      <TableHeader>
        {columns.map((column, index) => (
          <TableColumn key={index}>{column}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell> 
            <TableCell>{row.name}</TableCell> 
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
