import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Chip} from "@heroui/chip";
import { TABLE_DATA_5 } from "@/data/data";
import { TableRowGenelInfoData } from "@/types";


export default function MyGenelInfoTable() {
  const [data, setData] = useState<TableRowGenelInfoData[]>(TABLE_DATA_5);


  const columns = [
    "Kod",
    "Adı",
    "Üretici",
    "Üretici Kodu",
    "OEM No",
    "İzmir",
    "Ankara",
    "İstanbul",
    "1. Sanayi",
    "TED",
    "Perakende Fiyatı (KDV Hariç)",
    "Havale Fiyatı (KDV Hariç)",
    "K.K. Tek Çekim (KDV Hariç)",
    "K.K. Taksitli (KDV Hariç)",
    "KDV Hariç Fiyatı",
    "Perakende Fiyatı (KDV Dahil)",
    "Havale Fiyatı (KDV Dahil)",
    "K.K. Tek Çekim (KDV Dahil)",
    "K.K. Taksitli (KDV Dahil)",
    "KDV Dahil Fiyatı",
    "Birim",
    "Parça Aile Adı",
    "Parça Tipi Adı",
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
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.manufacturer}</TableCell>
            <TableCell>{row.manufacturer_code || "—"}</TableCell>
            <TableCell>{row.oem_no || "—"}</TableCell>
            <TableCell>
              <Chip color={row.izmir ? "success" : "danger"}>
                {row.izmir ? "Var" : "Yok"}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip color={row.ankara ? "success" : "danger"}>
                {row.ankara ? "Var" : "Yok"}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip color={row.istanbul ? "success" : "danger"}>
                {row.istanbul ? "Var" : "Yok"}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip color={row.first_industry ? "success" : "danger"}>
                {row.first_industry ? "Var" : "Yok"}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip color={row.ted ? "success" : "danger"}>
                {row.ted ? "Var" : "Yok"}
              </Chip>
            </TableCell>
            <TableCell>{row.retail_price_excluding_vat}</TableCell>
            <TableCell>{row.wire_transfer_price_excluding_vat}</TableCell>
            <TableCell>{row.credit_card_single_price_excluding_vat}</TableCell>
            <TableCell>{row.credit_card_installment_price_excluding_vat}</TableCell>
            <TableCell>{row.price_excluding_vat}</TableCell>
            <TableCell>{row.retail_price_including_vat}</TableCell>
            <TableCell>{row.wire_transfer_price_including_vat}</TableCell>
            <TableCell>{row.credit_card_single_price_including_vat}</TableCell>
            <TableCell>{row.credit_card_installment_price_including_vat}</TableCell>
            <TableCell>{row.price_including_vat}</TableCell>
            <TableCell>{row.unit}</TableCell>
            <TableCell>{row.part_family_name}</TableCell>
            <TableCell>{row.part_type_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
