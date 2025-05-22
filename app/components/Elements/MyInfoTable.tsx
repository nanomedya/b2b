import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import { TABLE_DATA_3 } from "@/data/data";
import { TableRowData } from "@/types";
 

export default function MyInfoTable() {
  const [data, setData] = useState<TableRowData[]>(TABLE_DATA_3);

  const columns: string[] = [
    "Tarih",
    "Belge No",
    "Miktar",
    "Birim",
    "Birim Fiyat",
    "Toplam",
    "Isk.1",
    "Isk.2",
    "Isk.3",
    "Isk.4",
    "KDV Tutar",
    "Net Fiyat",
    "Net KDV Fiyat",
    "Net Tutar",
    "Net Tutar KDV",
    "Döviz",
  ];

  return (
    <div>
      <Table
      className="dark:text-white"
        aria-label="Product Table"
      >
        <TableHeader>
          {columns.map((column, index) => (
            <TableColumn key={index}>{column}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.document}</TableCell>
              <TableCell>{row.piece}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>{row.isk1}</TableCell>
              <TableCell>{row.isk2}</TableCell>
              <TableCell>{row.isk3}</TableCell>
              <TableCell>{row.isk4}</TableCell>
              <TableCell>{row.kdvTotal}</TableCell>
              <TableCell>{row.netPrice}</TableCell>
              <TableCell>{row.netKdvPrice}</TableCell>
              <TableCell>{row.netAmount}</TableCell>
              <TableCell>{row.netAmountKdv}</TableCell>
              <TableCell>{row.foreign}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
