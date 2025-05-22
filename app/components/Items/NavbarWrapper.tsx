"use client";

import React, { useEffect, useState } from "react";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@heroui/dropdown";
import {User} from "@heroui/user";
import {
  CreditCard,
  FileText,
  Heart,
  List,
  PhoneCall,
  ShoppingCart,
} from "react-feather";

import { useAuth } from "@/context/AuthContext";
import Logo, { Logo2 } from "@/app/components/Items/Logo";
import Basket from "./Basket";
import Notifications from "./Notifications";
import { logout } from "@/api/services/authService";

export default function NavbarWrapper(): JSX.Element {
  const { user, token, setLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Ürünler", href: "/" },
    { label: "Siparişler", href: "/", icon: <List /> },
    { label: "Cari Hesap", href: "/" },
    { label: "Ödeme Yap", href: "/", icon: <CreditCard /> },
    { label: "Sepetim", href: "/", icon: <ShoppingCart /> },
  ];

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout(token);
      if (response.statu) setLogout();
    } catch (error) {
      console.error("Sunucu hatası:", error);
    }
  };

  const renderNavItem = (href: string, Icon: React.ReactNode, label: string) => (
    <NavbarItem className="hidden lg:flex">
      <Link color="foreground" href={href} className="flex flex-col items-center">
        {Icon}
        <span className="text-sm font-normal">{label}</span>
      </Link>
    </NavbarItem>
  );

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      height={80}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="pr-3 gap-10" justify="center">
        <NavbarBrand className="mr-10">
          <Link href="/">{isDarkMode ? <Logo2 className="h-14" /> : <Logo className="h-14" />}</Link>
        </NavbarBrand>

        {token && user && (
          <>
            {renderNavItem("/orders", <ShoppingCart />, "Siparişler")}
            {renderNavItem("/cari", <FileText />, "Cari Hesap")}
            {renderNavItem("/", <PhoneCall />, "İletişim")}
          </>
        )}
      </NavbarContent>

      <NavbarContent className="items-center gap-10" justify="end">
        {token && user && (
          <>
            <Basket />
            {renderNavItem("/pay", <CreditCard />, "Ödeme Yap")}
            <NavbarItem className="hidden lg:flex">
              <Notifications />
            </NavbarItem>
            {renderNavItem("/favorites", <Heart />, "Favoriler")}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="flex items-center gap-2 cursor-pointer dark:text-white">
                  <User
                    name={user.name}
                    description={user.email}
                    avatarProps={{
                      src: "https://i.pravatar.cc/150?img=8",
                      isBordered: true,
                      as: "button",
                      color: "warning",
                      className: "transition-transform",
                    }}
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile"><Link className="w-full"
              href="/profile" color="foreground"
              >Profilim</Link></DropdownItem>
                <DropdownItem key="announcements">
                <Link className="w-full"
              href="/announcements" color="foreground"
              >Duyurular</Link>
                </DropdownItem>
                <DropdownItem key="help">
                <Link className="w-full"
              href="/help" color="foreground"
              >Yardım & Geri Bildirim</Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress ={handleLogout}>
                  Güvenli Çıkış
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color={index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}