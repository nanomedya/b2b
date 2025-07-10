"use client";
import { useState } from "react";
import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Button, ButtonGroup} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Chip} from "@heroui/chip";
import {Tabs, Tab} from "@heroui/tabs";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import StoriesBox from "@/app/components/Items/StoriesBox";
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/app/components/Items/PageLoader";

export default function CariHesap(): JSX.Element {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("faturalar");

    // Örnek Fatura Verileri
    const invoices = [
        {
            id: "INV-001",
            date: "2024-02-01",
            dueDate: "2024-02-15",
            amount: 1500,
            status: "Ödendi",
        },
        {
            id: "INV-002",
            date: "2024-02-05",
            dueDate: "2024-02-20",
            amount: 2300,
            status: "Ödenmedi",
        },
        {
            id: "INV-003",
            date: "2024-02-01",
            dueDate: "2024-02-15",
            amount: 1500,
            status: "Ödendi",
        },
        {
            id: "INV-004",
            date: "2024-02-05",
            dueDate: "2024-02-20",
            amount: 2300,
            status: "Ödenmedi",
        },
        {
            id: "INV-005",
            date: "2024-02-01",
            dueDate: "2024-02-15",
            amount: 1500,
            status: "Ödendi",
        },
        {
            id: "INV-006",
            date: "2024-02-05",
            dueDate: "2024-02-20",
            amount: 2300,
            status: "Ödenmedi",
        },
    ];

    // Kapanmamış Faturalar
    const openInvoices = [
        {
            id: "INV-003",
            date: "2024-02-10",
            dueDate: "2024-02-25",
            amount: 1200,
            status: "Beklemede",
        },
    ];

    // Borç Durumu
    const debtStatus = {
        totalDebt: 5000,
        paidAmount: 1500,
        remainingDebt: 3500,
    };

    if (loading) {
        return <PageLoader />;
    }

    return (
        <GuestLayout>
            <NavbarWrapper />

            <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
                <div className="relative w-full h-full my-10">
                    <div className="mx-auto container">
                        <MyBreadCrumbs items={[{ title: "Cari Hesap" }]} />
                        <div className="mt-4">
                            <StoriesBox />
                        </div>

                        <div className="flex w-full flex-col mt-5">
                            <Tabs size="lg" aria-label="Options">
                                <Tab key="photos" title="Faturalar">
                                    <Table>
                                        <TableHeader>
                                            <TableColumn>ID</TableColumn>
                                            <TableColumn>Tarih</TableColumn>
                                            <TableColumn>Son Ödeme</TableColumn>
                                            <TableColumn>Tutar</TableColumn>
                                            <TableColumn>Durum</TableColumn>
                                            <TableColumn>Aksiyon</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {invoices.length > 0 ? (
                                                invoices.map((item) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.id}</TableCell>
                                                        <TableCell>{item.date}</TableCell>
                                                        <TableCell>{item.dueDate}</TableCell>
                                                        <TableCell>₺{item.amount}</TableCell>
                                                        <TableCell>
                                                            <Chip variant="dot" color={item.status === "Ödenmedi" ? "danger" : "success"}>
                                                                {item.status}
                                                            </Chip>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button color="primary">Detay</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center">
                                                        Veri bulunamadı.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Tab>
                                <Tab key="music" title="Kapanmamış Faturalar">
                                    <Table>
                                        <TableHeader>
                                            <TableColumn>ID</TableColumn>
                                            <TableColumn>Tarih</TableColumn>
                                            <TableColumn>Son Ödeme</TableColumn>
                                            <TableColumn>Tutar</TableColumn>
                                            <TableColumn>Durum</TableColumn>
                                            <TableColumn>Aksiyon</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {openInvoices.length > 0 ? (
                                                openInvoices.map((item) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.id}</TableCell>
                                                        <TableCell>{item.date}</TableCell>
                                                        <TableCell>{item.dueDate}</TableCell>
                                                        <TableCell>₺{item.amount}</TableCell>
                                                        <TableCell>
                                                            <Chip variant="dot" color="warning">{item.status}</Chip>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button color="primary">Detay</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center">
                                                        Kapanmamış fatura bulunamadı.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Tab>
                                <Tab key="videos" title="Borç Durumu">
                                    <Card>
                                        <CardBody>
                                            <div className="grid grid-cols-3 gap-4">
                                                <Card>
                                                    <CardBody>
                                                        <p className="text-sm text-gray-500">Toplam Borç</p>
                                                        <p className="text-xl font-bold text-red-500">₺{debtStatus.totalDebt}</p>
                                                    </CardBody>
                                                </Card>
                                                <Card>
                                                    <CardBody>
                                                        <p className="text-sm text-gray-500">Ödenen</p>
                                                        <p className="text-xl font-bold text-green-500">₺{debtStatus.paidAmount}</p>
                                                    </CardBody>
                                                </Card>
                                                <Card>
                                                    <CardBody>
                                                        <p className="text-sm text-gray-500">Kalan Borç</p>
                                                        <p className="text-xl font-bold text-yellow-500">₺{debtStatus.remainingDebt}</p>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Tab>
                            </Tabs>
                        </div>

                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
