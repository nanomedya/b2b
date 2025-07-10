"use client"

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";


import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";
import {Accordion, AccordionItem} from "@heroui/accordion";
import {Textarea, Input } from "@heroui/input";
import { HelpCircle, FileText } from 'react-feather';
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/app/components/Items/PageLoader";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import StoriesBox from "@/app/components/Items/StoriesBox";

const Help = () => {
    const { user, loading } = useAuth();

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    if (loading) {
        return (
            <div><PageLoader /></div>
        )
    }

    return (
        <GuestLayout>
            <NavbarWrapper />


            <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
                <div className="relative w-full h-full my-10">
                    <div className="mx-auto container">

                        <MyBreadCrumbs items={[{ title: "Yardım & Geri Bildirim" }]} />

                        <div className="mt-4"><StoriesBox /></div>


                        <Card className="mt-5">
                            <CardHeader><FileText size={24} className="mr-2" /> SSS Dokümanı</CardHeader>
                            <CardBody>

                                <div className="space-y-4">

                                    <Accordion>
                                        <AccordionItem key="1" aria-label="Soru 1" title="Soru 1">
                                            {defaultContent}
                                        </AccordionItem>
                                        <AccordionItem key="2" aria-label="Soru 2" title="Soru 2">
                                            {defaultContent}
                                        </AccordionItem>
                                        <AccordionItem key="3" aria-label="Soru 3" title="Soru 3">
                                            {defaultContent}
                                        </AccordionItem>
                                    </Accordion>

                                    {/* Diğer sorular buraya eklenebilir */}
                                </div>
                            </CardBody>
                        </Card>


                        <Card className="mt-4">
                            <CardHeader><HelpCircle size={24} className="mr-2" /> Öneri ve Şikayet Formu</CardHeader>
                            <CardBody>

                                <form>
                                    <div className="mb-4">
                                        <Input
                                            aria-label="Ad"
                                            fullWidth
                                            placeholder="Adınız"
                                            readOnly
                                            defaultValue={user.name}
                                            className="mb-3"
                                        />
                                        <Input
                                            aria-label="E-posta"
                                            fullWidth
                                            readOnly
                                            defaultValue={user.email}
                                            placeholder="E-posta adresiniz"
                                            type="email"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Textarea
                                            aria-label="Mesaj"
                                            fullWidth
                                            isRequired
                                            placeholder="Öneri ya da şikayetinizi buraya yazın"
                                            rows={6}
                                        />
                                    </div>

                                    <div className="text-center">
                                        <Button color="primary" size="lg" type="submit">
                                            Gönder
                                        </Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>


                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Help;
