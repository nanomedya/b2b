import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { TABLE_DATA_6 } from "@/data/data";
import { TableRowOemRowData } from "@/types";


export default function MyOemTable() {
  const [data, setData] = useState<TableRowOemRowData[]>(TABLE_DATA_6);


  const columns = [
    "ID",
    "Alan-1",
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
            <TableCell>{row.code}</TableCell> 
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
