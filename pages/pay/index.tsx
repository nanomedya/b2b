"use client"

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Tabs, Tab } from "@heroui/tabs";

import { useAuth } from "@/context/AuthContext";
import { useMyAlert } from "@/context/MyAlertContext";
import PageLoader from "@/app/components/Items/PageLoader";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import StoriesBox from "@/app/components/Items/StoriesBox";
import { useEffect, useState } from "react";
import { bankaccounts } from "@/api/services/homeServices";

type Bank = {
    name: string;
};

const staticBanks: Bank[] = [
    { name: "Ziraat Bankası" },
    { name: "Garanti BBVA" },
    { name: "İş Bankası" },
    { name: "Yapı Kredi" },
    { name: "QNB Finans" },
    { name: "Kuveyt Türk Bankası" },
];

const options: string[] = ["Tek Çekim", "2 Taksit", "3 Taksit", "4 Taksit", "5 Taksit", "10 Taksit"];

const Page: React.FC = () => {
    const { loading, token } = useAuth();
    const { showAlert } = useMyAlert();

    const [banko, setBanko] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelection = (value: string) => {
        setSelected(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const response = await bankaccounts(token);
                    const { data } = response;
                    setBanko(data);
                }
            } catch (error: any) {
                showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    // Show loader while authentication context is loading
    if (loading) {
        return <PageLoader />;
    }

    return (
        <GuestLayout>
            <NavbarWrapper />
            <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
                <div className="relative w-full h-full my-10">
                    <div className="mx-auto container">
                        <MyBreadCrumbs items={[{ title: "Ödeme Yap" }]} />
                        <div className="mt-4"><StoriesBox /></div>

                        <div className="max-w-5xl mx-auto p-4 bg-white dark:bg-slate-700 rounded-lg my-3">
                            <div className="mx-auto p-4">
                                <Tabs aria-label="Ödeme İşlemleri" fullWidth>
                                    <Tab key="online" title="Online Ödeme">
                                        <Card>
                                            <CardHeader><h2 className="text-xl font-semibold">Online Ödeme</h2></CardHeader>
                                            <CardBody>
                                                <div className="flex flex-wrap gap-2 max-w-md mx-auto">
                                                    <Input
                                                        type="text"
                                                        label="Kart Üzerindeki İsim"
                                                        placeholder="Adınızı girin"
                                                    />
                                                    <Input
                                                        type="text"
                                                        label="Kart Numarası"
                                                        placeholder="**** **** **** ****"
                                                        maxLength={19}
                                                    />
                                                    <div className="flex gap-4">
                                                        <Input
                                                            type="text"
                                                            label="Son Kullanma Tarihi"
                                                            placeholder="AA/YY"
                                                            maxLength={5}
                                                        />
                                                        <Input
                                                            type="text"
                                                            label="CVV"
                                                            placeholder="***"
                                                            maxLength={3}
                                                        />
                                                    </div>
                                                    <Button className="mt-4 w-full" color="primary">
                                                        Ödeme Yap
                                                    </Button>
                                                </div>

                                                <div className="relative mt-4">
                                                    <h3 className="text-lg font-semibold mb-4">Banka ve Taksit Seçenekleri</h3>
                                                    <Table aria-label="Banka ve taksit seçenekleri">
                                                        <TableHeader>
                                                            {staticBanks.map((bank, index) => (
                                                                <TableColumn key={`bank-${index}`}>{bank.name}</TableColumn>
                                                            ))}
                                                        </TableHeader>
                                                        <TableBody>
                                                            {options.map((option, rowIndex) => (
                                                                <TableRow key={`option-${rowIndex}`}>
                                                                    {staticBanks.map((bank, colIndex) => {
                                                                        const radioValue = `${bank.name}-${option}`;
                                                                        return (
                                                                            <TableCell key={`bank-${colIndex}-option-${rowIndex}`} className="text-center">
                                                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="installmentSelection"
                                                                                        value={radioValue}
                                                                                        checked={selected === radioValue}
                                                                                        onChange={() => handleSelection(radioValue)}
                                                                                        className="cursor-pointer"
                                                                                    />
                                                                                    <span>{option}</span>
                                                                                </label>
                                                                            </TableCell>
                                                                        );
                                                                    })}
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Tab>

                                    <Tab key="withdrawals" title="Çekim Listesi">
                                        <Card>
                                            <CardBody>
                                                <h2 className="text-xl font-semibold mb-2">Çekim Listesi</h2>
                                                <Table>
                                                    <TableHeader>
                                                        <TableColumn>Tarih</TableColumn>
                                                        <TableColumn>Tutar (₺)</TableColumn>
                                                        <TableColumn>Durum</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>10.02.2024</TableCell>
                                                            <TableCell>5,000</TableCell>
                                                            <TableCell>Onaylandı</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>05.02.2024</TableCell>
                                                            <TableCell>3,200</TableCell>
                                                            <TableCell>Bekliyor</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Tab>

                                    <Tab key="bank" title="Banka Hesap Bilgileri">
                                        {banko.map((bank: any, index: number) => (
                                            <Card key={index}>
                                                <CardBody>
                                                    <h2 className="text-xl font-semibold mb-2">Banka Hesap Bilgileri</h2>
                                                    <p><strong>Banka:</strong> {bank.bank}</p>
                                                    <p><strong>Hesap Sahibi:</strong> {bank.title}</p>
                                                    <p><strong>IBAN:</strong> {bank.iban}</p>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Page;
