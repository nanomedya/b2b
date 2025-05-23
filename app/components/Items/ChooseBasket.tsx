"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Tooltip} from "@heroui/tooltip";
import {Switch} from "@heroui/switch";
import {Spinner} from "@heroui/spinner";
import {Input} from "@heroui/input";
import {Button, ButtonGroup} from "@heroui/button";
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter} from "@heroui/modal";
import {  Listbox,  ListboxSection,  ListboxItem} from "@heroui/listbox";


import { Check, Edit} from "react-feather";
import { AppDispatch, RootState } from "@/redux/store";
import {
    fetchCurrentBasket,
    setCurrentBasket,
    deleteBasketAsync,
    // increaseQuantity,
    // decreaseQuantity,
} from "@/redux/basketSlice"; // Aksiyonları import et
import { useAuth } from "@/context/AuthContext";
import { basketList, createBasket, setBasketNames } from "@/api/services/basketService";
import { useMyAlert } from "@/context/MyAlertContext";


const ChooseBasket: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>(); // Type dispatch here

    const [isOpen, setIsOpen] = useState(false); // Modal açık/kapalı durumu

    const { showAlert } = useMyAlert();

    const [selectedKeys, setSelectedKeys] = useState<any>(new Set());
    const [basketListData, setBasketListData] = useState<any[]>([]);
    const [isNewBasketCreate, setIsNewBasketCreate] = useState(false);
    const [isEditItems, setIsEditItems] = useState(false);
    const [allItemsLoader, setAllItemsLoader] = useState(true);
    const [openDialog, setOpenDialog] = useState<any>(null);


    const [basketName, setBasketName] = useState(""); // Sepet adı state
    const [isDefault, setIsDefault] = useState<any>(false); // Varsayılan sepet durumu

    const { token, currentBasketId, setCurrentBasketId, user } = useAuth();
    const basketState = useSelector((state: RootState) => state.basket); // Global store'dan veri alınır

    const [updatedBasketData, setUpdatedBasketData] = useState<{ id: number; name: string }[]>([]);

    const handleInputChange = (id: number, value: string) => {
        setUpdatedBasketData((prev: { id: number; name: string }[] = []) => {
            const exists = prev.find((item) => item.id === id);
            if (exists) {
                // Var olan öğeyi güncelle
                return prev.map((item) =>
                    item.id === id ? { ...item, name: value } : item
                );
            } else {
                // Yeni öğe ekle
                return [...prev, { id, name: value }];
            }
        });
    };


    const fetchBaskets = async (token: any, currentBasketId: number) => {
        try {
            const response = await basketList(token); // Sepetleri API'den çek
            const baskets = response.data;

            setBasketListData(baskets);

            // Aktif sepeti belirle
            const activeBasket =
                baskets.find((basket: any) => basket.id == currentBasketId) ||
                baskets[0]; // Hiçbir şey bulunamazsa ilk kayıt

            setSelectedKeys(new Set([activeBasket.id.toString()])); // Aktif sepeti seç

            setAllItemsLoader(false);

        } catch (error) {
            console.error("Error fetching basket list:", error);
        }
    };


    // Sepet Adını Kaydet
    const setSaveEditItems = async () => {
        try {
            if (token) {
                const response = await setBasketNames(token, updatedBasketData);
                if (response && currentBasketId) {
                    fetchBaskets(token, currentBasketId)
                    setIsEditItems(false)
                }
            }
        } catch (error) {
            console.error('API isteği sırasında hata oluştu:', error);
        }
    };


    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open && currentBasketId) {
            fetchBaskets(token, currentBasketId);
        }
    };

    useEffect(() => {
        if (token && currentBasketId) {
            dispatch(fetchCurrentBasket({ token, currentBasketId }));
        }
    }, [token, currentBasketId, dispatch]);




    const clearModalStates = () => {
        setBasketName("");
        setIsDefault(false);
        setIsNewBasketCreate(false)
        setIsOpen(false)
        setOpenDialog(null)
        setAllItemsLoader(true)
        setIsEditItems(false)
    }



    // Dialog Modal
    const handleDeleteBasket = () => {
        if (token && openDialog) {
            const dialogId = Number(openDialog.id);
            dispatch(
                deleteBasketAsync({ token, dialogId })
            ).unwrap()
                .then(() => {

                    // Varsayılan Sepeti Set et
                    setSelectedBasket(1);


                })
                .catch((error: any) => {
                    showAlert("Oppss..!", error.message);
                });
        }
    };



    const setSelectedBasket = async (id: any) => {

        try {
            if (token && id) {

                const params = { token: token, basketId: Number(id) };

                await dispatch(setCurrentBasket(params));

                setCurrentBasketId(Number(id));

                // Başarılı işlem sonrası listeyi güncelleyin
                if (currentBasketId) {
                    fetchBaskets(token, currentBasketId);
                }

                // Alanları sıfırlayın
                clearModalStates()


                showAlert('Sepet başarıyla güncellendi!', 'success');
            } else {
                console.log('parametrelerde hata oldu');
            }
        } catch (error) {
            console.error("Error setting current basket:", error);
            showAlert('Sepet güncellenirken bir hata oluştu.', 'error');
        }

    }

    const handleSelectBasket = async () => {
        if (selectedKeys.size > 0) {
            const selectedBasketId = Array.from(selectedKeys)[0]; // Seçilen sepet ID'sini al

            setSelectedBasket(selectedBasketId);
        }
    };

    const handleSubmit = async () => {
        try {
            // Sepet adı boş mu kontrol edin
            if (!basketName.trim()) {
                showAlert("Sepet adı boş olamaz.", "warning");
                return;
            }

            // API isteği gönder
            if (token) {
                const params = {
                    name: basketName.trim(),
                    is_default: isDefault,
                };
                const response = await createBasket(token, params);

                if (response?.success) {


                    const responseBasketId = response.data.id.toString();


                    if (isDefault) {

                        // Varsayılan Sepeti Set et
                        setSelectedKeys(new Set([responseBasketId]));
                        // Varsayılan Sepeti Aktif Et
                        setSelectedBasket(responseBasketId);
                    } else {
                        fetchBaskets(token, responseBasketId);
                        clearModalStates()
                    }

                    // Başarılı mesaj göstermek isterseniz
                    showAlert("Sepet başarıyla oluşturuldu.", "success");
                } else {
                    // Başarısızlık durumunda mesaj gösterin
                    showAlert(response?.message || "Sepet oluşturulamadı.", "error");
                }
            }
        } catch (error) {
            console.error("Error creating basket:", error);
            // Hata durumunda mesaj gösterin
            showAlert("Bir hata oluştu. Lütfen tekrar deneyin.", "error");
        }
    };


    return (
        <>

            <Button size="sm" onClick={() => handleOpenChange(!isOpen)}>Sepeti Değiştir</Button>

            <Modal isOpen={openDialog} hideCloseButton
            
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40  z-[99999999]",
                wrapper: " z-[999999999]", 
              }}
              
              
              >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1 text-black text-lg"> <span className="text-red-600">{openDialog.name}</span> için işlem yapılacak...</ModalHeader>
                            <ModalBody className="text-black">
                                {openDialog.items_count > 0 && (
                                    <p>Bu sepette ekli olan ({openDialog.items_count}) ürün var..</p>
                                )}
                                <p>
                                    Sepeti gerçekten silmek istediğinize emin misiniz?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={() => setOpenDialog(null)}>
                                    Hayır
                                </Button>
                                <Button color="primary" onClick={() => handleDeleteBasket()}>
                                    Evet, Sil
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>



            <Modal isOpen={isOpen} hideCloseButton
            
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40  z-[9999999]",
                wrapper: " z-[99999999]", 
              }}
              
             >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-row justify-between items-center gap-1 text-black">
                                <div className="flex flex-col">
                                    {isNewBasketCreate ? (
                                        <span>Yeni Sepet Oluştur</span>
                                    ) : (
                                        <span>{!isEditItems ? 'Sepet Seç' : 'Sepet Düzenle'}</span>
                                    )}
                                    <span className="text-sm font-normal text-gray-500">{isEditItems && 'Yalnızca size ait olan sepetlerde işlem yapabilirsiniz'}</span>
                                </div>


                                {!isEditItems && !isNewBasketCreate && (
                                    <div className="inline-flex gap-3">
                                        {basketListData.filter((x) => x.user_id == user.id).length > 0 && (
                                            <Tooltip content="Düzenle" className="bg-black text-white">
                                                <Button color="warning" onClick={() => setIsEditItems(true)}>
                                                    <Edit color="white" />
                                                </Button>
                                            </Tooltip>

                                        )}

                                        <Tooltip content="Sepeti Seç" className="bg-black text-white">
                                            <Button color="primary" onClick={handleSelectBasket}>
                                                <Check />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                )}


                            </ModalHeader>
                            <ModalBody>

                                {allItemsLoader && (
                                    <Spinner />
                                )}

                                {isNewBasketCreate ? (
                                    <div className="relative flex flex-col gap-4">
                                        <Input value={basketName}
                                            onChange={(e) => setBasketName(e.target.value)} placeholder="Sepet Adı" />
                                        <Switch isSelected={isDefault} onValueChange={setIsDefault}>Varsayılan olarak ayarla</Switch>;
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {basketListData && basketListData.length && (
                                            isEditItems ? (
                                                <div className="w-full relative">
                                                    {basketListData.filter((x) => x.user_id == user.id).map((item: any) => (

                                                        <div className="wrapper_input mb-4 border-b border-gray-200 pb-3"
                                                            key={item.id}>

                                                            <Input
                                                                onChange={(e) => handleInputChange(item.id, e.target.value)} defaultValue={item.name} placeholder="Sepet adı" className=" mb-1" />

                                                            <div className="flex w-full justify-end mt-2">
                                                                <Button color="danger" size="sm" onClick={() => setOpenDialog(item)}>Sepeti sil</Button>
                                                            </div>

                                                        </div>
                                                    ))}

                                                </div>
                                            ) : (
                                                <Listbox
                                                    disallowEmptySelection
                                                    aria-label="Single selection example"
                                                    selectedKeys={selectedKeys}
                                                    selectionMode="single"
                                                    variant="flat"
                                                    className="text-black"
                                                    onSelectionChange={setSelectedKeys}
                                                >
                                                    {basketListData.map((item: any) => (
                                                        <ListboxItem key={item.id}>
                                                            <div className="text-black font-semibold">
                                                                <span>{item.name} </span>
                                                                {item.items_count > 0 && <span className="text-sm text-gray-700 font-normal"> - Toplam ürün: {item.items_count}</span>}
                                                            </div>
                                                            <p className="text-gray-600 text-sm mt-2 px-2">{item.user ? item.user.name : 'Varsayılan'}</p>
                                                        </ListboxItem>
                                                    ))}

                                                </Listbox>

                                            )

                                        )}
                                    </div>
                                )}

                            </ModalBody>
                            <ModalFooter>

                                {isEditItems ? (
                                    <div className="inline-flex gap-3">
                                        <Button color="danger" onClick={() => setIsEditItems(false)}>
                                            Vazgeç
                                        </Button>
                                        <Button color="primary" onClick={setSaveEditItems}>
                                            Kaydet
                                        </Button>
                                    </div>
                                ) : (
                                    isNewBasketCreate ? (
                                        <div className="flex justify-between w-full">
                                            <Button color="danger" onClick={() => setIsNewBasketCreate(false)}>
                                                Vazgeç
                                            </Button>
                                            <Button
                                                color="primary"
                                                disabled={!basketName}
                                                onClick={handleSubmit}
                                            >
                                                Kaydet
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-3 justify-between w-full">
                                            <Button color="danger" onClick={() => (setIsOpen(false), setAllItemsLoader(false))}>
                                                Kapat
                                            </Button>
                                            <Button color="success" onClick={() => setIsNewBasketCreate(true)}>
                                                Yeni Sepet Oluştur
                                            </Button>
                                        </div>
                                    )
                                )}

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChooseBasket;
