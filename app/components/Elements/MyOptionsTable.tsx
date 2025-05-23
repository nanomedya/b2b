import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Button, ButtonGroup} from "@heroui/button";
import {Image} from "@heroui/image";
import {Chip} from "@heroui/chip";
import { TABLE_DATA_4 } from "@/data/data";
import { TableRowOptionsData } from "@/types";
import { ShoppingBag } from "react-feather";


export default function MyOptionsTable() {
  const [data, setData] = useState<TableRowOptionsData[]>(TABLE_DATA_4);

  const columns: any[] = [
    "Resim",
    "Kodu",
    "Adı",
    "Üretici",
    "Üretici Kodu",
    "İskonto1",
    "İskonto2",
    "KDV Dahil Fiyat",
    "Birim",
    "Parça Aile Adı",
    "Parça Tip Adı",
    "Depo Durumu",
    "Sepete Ekle",
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
              <TableCell>
                <Image width={30} height={30} src={row.image} alt="" /></TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.manufacturer}</TableCell>
              <TableCell>{row.manufacturer_code}</TableCell>
              <TableCell>{row.isk1}</TableCell>
              <TableCell>{row.isk2}</TableCell>
              <TableCell>{row.price_including_VAT}</TableCell>
              <TableCell>{row.unit}</TableCell>
              <TableCell>{row.part_family_name}</TableCell>
              <TableCell>{row.part_type_name}</TableCell>
              <TableCell>
                <Chip color={row.warehouse_status ? "success" : "danger"}>
                  {row.warehouse_status ? "Var" : "Yok"}
                </Chip>
              </TableCell>
              <TableCell className="flex justify-center">
                <Button isIconOnly color="warning">
                  <ShoppingBag />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
