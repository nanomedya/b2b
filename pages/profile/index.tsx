"use client";
import React, { useState } from "react";
import * as Yup from "yup";

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@heroui/table";
import {Input} from "@heroui/input";
import {Switch} from "@heroui/switch";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import {Button, ButtonGroup} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { useAuth } from "@/context/AuthContext";
import { update } from "@/api/services/authService";
import { updateSchema } from "@/api/utils/validation";
import { useMyAlert } from "@/context/MyAlertContext";
import PageLoader from "@/app/components/Items/PageLoader";
import { Lock, LogOut, Shield, Smartphone, UserCheck } from "react-feather";

export default function Profile(): JSX.Element {
  const { showAlert } = useMyAlert();
  const { token, user, loading, setUser } = useAuth();


  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sessions = [
    { id: 1, device: "MacBook Pro", browser: "Chrome", ip: "192.168.1.1", date: "2 saat önce" },
    { id: 2, device: "iPhone 13", browser: "Safari", ip: "192.168.1.2", date: "Dün" },
  ];


  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });


  const [errors, setErrors] = useState({
    email: "",
    name: "",
  });





  const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFormData({ ...formData, name: value });
  }


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });
  }



  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();



    setErrors({ email: "", name: "" });
    setIsLoading(true);

    try {
      await updateSchema.validate(formData, { abortEarly: false });
      const response = await update(token, formData);
      if (response.statu) {
        setUser(response.user);
      } else {
        showAlert("Opss..", response.message);
      }
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: any = {
          email: "",
          name: ""
        };

        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message; // Hata mesajını ilgili alana ata
          }
        });

        setErrors(validationErrors); // Hata mesajlarını state'e ata
      } else {
        console.error("Sunucu hatası:", error);
        showAlert("Sunucu Hatası", error);
      }
    } finally {
      setIsLoading(false);
    }
  };




  if (loading) {
    return <PageLoader />
  }
  return (
    <GuestLayout>
      <NavbarWrapper />



      <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
        <div className="relative w-full h-full  my-10">

          <div className="mx-auto container">
            <form onSubmit={handleSubmit} className="flex flex-wrap flex-col gap-3">
              <Card className="w-full lg:max-w-4xl mx-auto relative">

                <CardHeader className="text-lg font-semibold flex items-center gap-2">
                  <UserCheck size={20} /> Profil Ayarları
                </CardHeader>

                <CardBody>
                  <div className="relative flex flex-wrap flex-col gap-2 justify-center items-center">
                    <Avatar src="/static/profil.png" className="my-2 text-large object-contain" style={{width:"200px",height:"200px"}} isBordered color="warning" />
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="font-normal">{user.email}</p>

                    <div className="form_wrapper relative">


                      <div className="flex items-start gap-3">
                        <div>
                          <Input
                            name="name"
                            label="Adınız"
                            defaultValue={user.name}
                            variant="bordered"
                            onChange={handleName}
                            placeholder="Adınızı girin"
                          />
                          {errors.name && (
                            <span className="text-sm text-red-500">{errors.name}</span>
                          )}

                        </div>
                        <div>
                          <Input
                            name="email"
                            label="Email"
                            defaultValue={user.email}
                            variant="bordered"
                            onChange={handleEmail}
                            placeholder="Email adresinizi girin"
                          />
                          {errors.email && (
                            <span className="text-sm text-red-500">{errors.email}</span>
                          )}
                        </div>
                      </div>




                    </div>
                  </div>
                </CardBody>
                <CardFooter className="justify-end">
                  <Button
                    className="bg-black/80 text-white"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Lütfen Bekleyin..." : "Kaydet"}
                  </Button>
                </CardFooter>

              </Card>
            </form>
          </div>



          <div className="mx-auto container mt-6 px-4 lg:px-0 flex flex-col gap-5">

            {/* 2 Faktörlü Doğrulama */}
            {/*<Card className="w-full lg:max-w-4xl mx-auto">
              <CardHeader className="text-lg font-semibold flex items-center gap-2">
                <Shield size={20} /> 2 Faktörlü Doğrulama
              </CardHeader>
              <CardBody className="space-y-3">
                <Switch isSelected={is2FAEnabled} onValueChange={setIs2FAEnabled}>
                  {is2FAEnabled ? "Aktif" : "Pasif"}
                </Switch>
                {is2FAEnabled && (
                  <Button className="bg-blue-600 text-white w-full">
                    <Lock size={18} className="mr-2" /> Doğrulama Kodu Gönder
                  </Button>
                )}
              </CardBody>
            </Card>
*/}
            {/* Oturum Yönetimi */}
            {/*
            <Card className="w-full lg:max-w-4xl mx-auto">
              <CardHeader className="text-lg font-semibold flex items-center gap-2">
                <Smartphone size={20} /> Oturum Yönetimi
              </CardHeader>
              <CardBody>
                <Table>
                  <TableHeader>
                    <TableColumn>Cihaz</TableColumn>
                    <TableColumn>Tarayıcı</TableColumn>
                    <TableColumn>IP Adresi</TableColumn>
                    <TableColumn>Tarih</TableColumn>
                    <TableColumn>.</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.device}</TableCell>
                        <TableCell>{session.browser}</TableCell>
                        <TableCell>{session.ip}</TableCell>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-red-600 text-white">
                            <LogOut size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
            */}
          </div>


        </div>
      </div>

    </GuestLayout>
  );
}
