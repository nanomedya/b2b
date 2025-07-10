"use client"
import { useState } from "react";

import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@heroui/modal";
import {Button, ButtonGroup} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Pagination, PaginationItem, PaginationCursor} from "@heroui/pagination";

import { Bell } from "react-feather";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import GuestLayout from "@/app/components/Layouts/GuestLayout";
import Image from "next/image";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import StoriesBox from "@/app/components/Items/StoriesBox";
import PageLoader from "@/app/components/Items/PageLoader";
import { useAuth } from "@/context/AuthContext";

const announcements = [
    {
        id: 1,
        title: "Sistem Bakımı Hakkında",
        date: "10 Ekim 2024",
        summary: "Planlı sistem bakımı nedeniyle geçici erişim sorunu yaşanabilir.",
        content: "Sevgili kullanıcılarımız, 10 Ekim 2024 tarihinde 22:00 - 02:00 saatleri arasında planlı sistem bakımı yapılacaktır. Bu süreçte hizmetlerde kesintiler yaşanabilir. Anlayışınız için teşekkür ederiz.",
    },
    {
        id: 2,
        title: "Yeni Özellikler Yayında!",
        date: "5 Ekim 2024",
        summary: "Sisteme eklenen yeni özellikleri keşfedin.",
        content: "Yeni güncellemeyle birlikte kullanıcı deneyimini artırmak için birçok yeni özellik eklenmiştir. Detayları görmek için destek sayfamızı ziyaret edebilirsiniz.",
    },
    {
        id: 3,
        title: "Sistem Bakımı Hakkında",
        date: "10 Ekim 2024",
        summary: "Planlı sistem bakımı nedeniyle geçici erişim sorunu yaşanabilir.",
        content: "Sevgili kullanıcılarımız, 10 Ekim 2024 tarihinde 22:00 - 02:00 saatleri arasında planlı sistem bakımı yapılacaktır. Bu süreçte hizmetlerde kesintiler yaşanabilir. Anlayışınız için teşekkür ederiz.",
    },
    {
        id: 4,
        title: "Yeni Özellikler Yayında!",
        date: "5 Ekim 2024",
        summary: "Sisteme eklenen yeni özellikleri keşfedin.",
        content: "Yeni güncellemeyle birlikte kullanıcı deneyimini artırmak için birçok yeni özellik eklenmiştir. Detayları görmek için destek sayfamızı ziyaret edebilirsiniz.",
    },
    {
        id: 5,
        title: "Sistem Bakımı Hakkında",
        date: "10 Ekim 2024",
        summary: "Planlı sistem bakımı nedeniyle geçici erişim sorunu yaşanabilir.",
        content: "Sevgili kullanıcılarımız, 10 Ekim 2024 tarihinde 22:00 - 02:00 saatleri arasında planlı sistem bakımı yapılacaktır. Bu süreçte hizmetlerde kesintiler yaşanabilir. Anlayışınız için teşekkür ederiz.",
    },
    {
        id: 6,
        title: "Yeni Özellikler Yayında!",
        date: "5 Ekim 2024",
        summary: "Sisteme eklenen yeni özellikleri keşfedin.",
        content: "Yeni güncellemeyle birlikte kullanıcı deneyimini artırmak için birçok yeni özellik eklenmiştir. Detayları görmek için destek sayfamızı ziyaret edebilirsiniz.",
    },
];


interface selectedAnnouncementProps {
    title: string,
    date: string,
    content: string,
}

const Announcements = () => {
    const { user, loading } = useAuth();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<selectedAnnouncementProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (announcement: any) => {
        setSelectedAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAnnouncement(null);
        setIsModalOpen(false);
    };

    
    if (loading) {
        return <PageLoader />
    }


    return (

        <GuestLayout>
            <NavbarWrapper />


            <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
                <div className="relative w-full h-full my-10">
                    <div className="mx-auto container">

                        <MyBreadCrumbs items={[{ title: "Duyurular" }]} />

                        <div className="mt-4"><StoriesBox /></div>

                        {/* Duyuru Listesi */}
                        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2 mt-5">
                            {announcements.map((announcement) => (
                                <Card
                                    key={announcement.id}
                                    shadow="md"
                                    className="cursor-pointer transition hover:scale-[1.02]"

                                >
                                    <CardBody>
                                        <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
                                        <img
                                            alt="Card background"
                                            className="object-cover rounded-xl w-full"
                                            src="https://heroui.com/images/hero-card-complete.jpeg" />
                                        <p className="text-gray-600">{announcement.date}</p>
                                        <p className="my-2 text-gray-700">{announcement.summary}</p>
                                        <Button onPress={() => openModal(announcement)}>Detay</Button>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-center mt-5">
                            <div className="bg-white dark:bg-slate-700 rounded-full py-2 px-6">
                                <Pagination color="warning" initialPage={1} total={10} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
                <ModalContent className="text-black dark:text-white">
                    <ModalHeader>
                        {selectedAnnouncement?.title}
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-gray-600">{selectedAnnouncement?.date}</p>
                        <p className="mt-4 text-gray-800">{selectedAnnouncement?.content}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </GuestLayout>
    );
};

export default Announcements
