


import React from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Button, ButtonGroup} from "@heroui/button";

import { Copy } from "react-feather";





interface Item {
  title: string,
  description?: string
  image?: string
}

interface BankItemProps {
  items: Item[];
}

const Banks: React.FC<BankItemProps> = ({
  items = [],
}) => {

  return (

    <div className="w-full relative bg-white dark:bg-transparent rounded-xl shadow p-3 overflow-x-auto whitespace-nowrap">


      <Table aria-label="bank accounts list table" shadow="none" className="w-full">
        <TableHeader>
          <TableColumn>Banka</TableColumn>
          <TableColumn>Şube</TableColumn>
          <TableColumn>Şube Kodu</TableColumn>
          <TableColumn>Hesap No</TableColumn>
          <TableColumn>IBAN Numarası</TableColumn>
          <TableColumn>Kopyala</TableColumn>
        </TableHeader>
        <TableBody>

          {items.map((item, key) => (

            <TableRow key={key}>
              <TableCell>	{item.title} </TableCell>
              <TableCell>	BEYKENT TİCARİ </TableCell>
              <TableCell>	1604 </TableCell>
              <TableCell>	6299877 </TableCell>
              <TableCell>		TR30 0006 2001 6040 0006 2998 77 </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  onPress={() => {
                    const iban = "TR30 0006 2001 6040 0006 2998 77"; // Kopyalanacak IBAN
                    navigator.clipboard
                      .writeText(iban)
                      .then(() => alert("IBAN başarıyla kopyalandı!"))
                      .catch((err) => alert("IBAN kopyalanamadı: " + err.message));
                  }}
                >
                  <Copy />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


    </div>




  )
}

export default Banks