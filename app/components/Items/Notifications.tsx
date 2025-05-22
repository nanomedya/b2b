"use client";

import { useState } from "react";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";
import {Badge} from "@heroui/badge";
import { Bell } from "react-feather";
import moment from "moment";
import "moment/locale/tr";

const notifications = [
    { id: 1, message: "Yeni mesajın var!", readed: false, date: new Date() },
    { id: 2, message: "Siparişin onaylandı.", readed: true, date: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 3, message: "Profilin güncellendi.", readed: true, date: new Date(Date.now() - 1000 * 60 * 60 * 24) },
];


export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false);

    // Okunan ve okunmayanları ayır
    const unreadCount = notifications.filter((n) => !n.readed).length;

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-end">
            <PopoverTrigger>
                <div className="relative cursor-pointer">
                    <Badge content={unreadCount} color="warning">
                    <div className="flex flex-col justify-center items-center">
                        <Bell className="w-6 h-6 text-gray-700 hover:text-black transition-all" />
                        <span className="text-sm font-normal">Bildirimler</span>
                    </div>
                    </Badge>
                </div>
            </PopoverTrigger>

            <PopoverContent className="w-72 bg-white p-3 shadow-lg rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Bildirimler</h3>
                {notifications.length > 0 ? (
                    <ul className="space-y-2 mt-2 w-full">
                        {notifications.map((notif) => (
                            <li
                                key={notif.id}
                                className={`p-2 text-sm rounded-md flex justify-between items-center 
                  ${notif.readed ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-700 font-semibold"}`}
                            >
                                <div>
                                    <p>{notif.message}</p>
                                    <span className="text-xs text-gray-400">
                                        {moment(notif.date).fromNow()}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 mt-2">Hiç bildirimin yok.</p>
                )}
            </PopoverContent>
        </Popover>
    );
}