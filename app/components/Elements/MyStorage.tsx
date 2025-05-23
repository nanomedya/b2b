import React from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";
import {Input} from "@heroui/input";
import {Select, SelectSection, SelectItem} from "@heroui/select";
import Link from 'next/link';

const MyStorage = ({ title, brut, iskonto, toplam, kdv, genelToplam, sevkiyatOptions, sevkiyatNote, isActive }: any) => {
    return (
        <Card shadow='none' className="rounded-2xl mb-3">
            <CardHeader className="bg-gray-200 py-2 px-4 rounded-t-2xl">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            </CardHeader>
            <CardBody className="p-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Brüt:</span>
                    <span className="font-medium">{brut}₺</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>İskonto:</span>
                    <span className="font-medium">{iskonto}₺</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Toplam:</span>
                    <span className="font-medium">{toplam}₺</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>KDV:</span>
                    <span className="font-medium">{kdv}₺</span>
                </div>
                <div className="flex justify-between text-gray-800 font-bold">
                    <span>G.Toplam:</span>
                    <span>{genelToplam}₺</span>
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">
                    Sevkiyat:
                    <Select
                        label="Seçiniz"
                        className="max-w-xs"
                    >
                        {sevkiyatOptions.map((option: any) => (
                        <SelectItem key={option.value}>
                            {option.label}
                        </SelectItem>
                        ))}
                    </Select>
                    </label>


                    {sevkiyatNote && (
                        <p className="text-sm text-gray-500 mt-1">{sevkiyatNote}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="siparisMesaji" className="block text-gray-600 mb-1">
                    Sipariş Mesajı:
                    </label>
                    <Input
                    id="siparisMesaji"
                    placeholder="Sipariş mesajınızı giriniz..."
                    className="w-full"
                    />

                </div>
            </CardBody>
            <CardFooter className="p-4 flex justify-center">
                <Button as={Link} href="/payment" color="warning" fullWidth isDisabled={isActive}>
                  Siparişi Tamamla
                </Button>

            </CardFooter>
        </Card>
    );
};

export default MyStorage