import React, { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { Search } from "react-feather";
import { carsGroup, storageList } from "@/data/search_data";
import { brands, warehouses  } from "@/api/services/homeServices";
import { useMyAlert } from "@/context/MyAlertContext";
import { useAuth } from "@/context/AuthContext";

export default function SearchBox({
  handleSearch,
}: {
  handleSearch: (query: string, brand: string, instock: "0" | "1", warehouse_id:string,) => void;
}): JSX.Element {
  const { user, loading, token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isStorageList, setIsStorageList] = useState(false);
  const [brandData, setBrandData] = useState<any[]>([]);
  const [warehouseData, setWarehouseData] = useState<any[]>([]);
  const [instock, setInstock] = useState<any>(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useMyAlert();

 const onSearchClick = () => {
  const params = new URLSearchParams();
  if (searchQuery) params.set("query", searchQuery);
  if (selectedBrand) params.set("brand", selectedBrand);
  if (selectedWarehouse) params.set("warehouse_id", selectedWarehouse);
  if (instock) params.set("instock", "1"); // true ise 1, değilse hiç ekleme
  else params.delete("instock");

  const url = `/search?${params.toString()}`;
  window.history.pushState({}, "", url);
    handleSearch(searchQuery, selectedBrand || "", instock, selectedWarehouse || "" );
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await brands(token);
          const response2 = await warehouses(token);
          setBrandData(response.data);
          setWarehouseData(response2.data)
        }
      } catch (error: any) {
        showAlert("Sunucu Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    const brand = params.get("brand");
    const instockParam = params.get("instock");
    const warehouse_id = params.get("warehouse_id");

    if (query) setSearchQuery(query);
    if (brand) setSelectedBrand(brand);
    if (warehouse_id) setSelectedBrand(warehouse_id);
    if (instockParam === "1" || instockParam === "0") setInstock(instockParam);
  }, [token]);

  const handleStorageSearch = (value: boolean) => {
    setIsStorageList(value);
    setSelectedWarehouse(null);
  };

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <Tabs aria-label="Search Tabs" size="lg" color="warning">
        <Tab key="tab1" title="Tümünde Ara" className="w-full max-w-screen-md">
          <div className="checks flex justify-center mb-5 items-center gap-6">
            <Checkbox
            size="lg"
            color="warning"
            onValueChange={(value) => setInstock(value ? "1" : "0")}
            >
            Stoktakiler
            </Checkbox>
           {/* <Checkbox size="lg" color="warning">Üreticide Ara</Checkbox>*/}
            <Checkbox size="lg" color="warning" onValueChange={handleStorageSearch}>
              Depolarda Ara
            </Checkbox>
          </div>

          <Input
          
            classNames={{
              base: "max-w-full h-14",
              mainWrapper: "h-full",
              input: "text-lg",
              inputWrapper: "h-full font-semibold text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            size="lg"
            placeholder="Ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchClick();
            }}
            startContent={<Search className="text-3xl text-default-400 pointer-events-none flex-shrink-0" />}
            type="text"
          />

          <div className="flex flex-wrap items-center gap-4 w-full mt-5">
            <Select
              size="lg"
              label="Marka Seç"
              className="w-48"
              value={selectedBrand ?? ""}
              onChange={(e) => {
                    const selectedId = e.target.value;
                    setSelectedBrand(selectedId); // bunu mutlaka yap
                }}
              isLoading={isLoading}
            >
              {brandData.map((item) => (
                <SelectItem key={item.id}  className="text-gray-600">
                  {item.title}
                </SelectItem>
              ))}
            </Select>
{/*
            <Select size="lg" label="Araç Grubu Seç" className="w-48">
              {carsGroup.map((item) => (
                <SelectItem key={item.key} className="text-gray-600">
                  {item.label}
                </SelectItem>
              ))}
            </Select>
*/}
            {isStorageList && (
              <Select size="lg"
              label="Depo Seç"
              className="w-48"
              value={selectedWarehouse ?? ""}
              onChange={(e) => {
                    const selectedId = e.target.value;
                    setSelectedWarehouse(selectedId); // bunu mutlaka yap
                }}
              isLoading={isLoading}
            >
                {warehouseData.map((item) => (
                <SelectItem key={item.id}  className="text-gray-600">
                  {item.name}
                </SelectItem>
              ))}
              </Select>
            )}

            <Button
              onClick={onSearchClick}
              color="warning"
              variant="solid"
              size="lg"
              className="text-white"
              startContent={<Search color="white" />}
            >
              Ara
            </Button>
          </div>
        </Tab>

       {/* <Tab key="tab2" title="Araç Seçerek Ara" className="w-full max-w-screen-md">
          <div className="grid grid-flow-row lg:grid-flow-col gap-4 w-full mt-5">
            <Select size="lg" label="Marka" className="max-w-xs">
              <SelectItem key="brand1" className="text-gray-600">Brand 1</SelectItem>
              <SelectItem key="brand2" className="text-gray-600">Brand 2</SelectItem>
              <SelectItem key="brand3" className="text-gray-600">Brand 3</SelectItem>
            </Select>

            <Select size="lg" label="Model" className="max-w-xs">
              <SelectItem key="model1" className="text-gray-600">Model 1</SelectItem>
              <SelectItem key="model2" className="text-gray-600">Model 2</SelectItem>
              <SelectItem key="model3" className="text-gray-600">Model 3</SelectItem>
            </Select>

            <Select size="lg" label="Kasa" className="max-w-xs">
              <SelectItem key="type1" className="text-gray-600">Type 1</SelectItem>
              <SelectItem key="type2" className="text-gray-600">Type 2</SelectItem>
              <SelectItem key="type3" className="text-gray-600">Type 3</SelectItem>
            </Select>

            <Select size="lg" label="Yıl" className="max-w-xs">
              <SelectItem key="2021" className="text-gray-600">2021</SelectItem>
              <SelectItem key="2022" className="text-gray-600">2022</SelectItem>
              <SelectItem key="2023" className="text-gray-600">2023</SelectItem>
            </Select>

            <Select size="lg" label="Motor Hacmi" className="max-w-xs">
              <SelectItem key="1000" className="text-gray-600">1000 cc</SelectItem>
              <SelectItem key="2000" className="text-gray-600">2000 cc</SelectItem>
              <SelectItem key="3000" className="text-gray-600">3000 cc</SelectItem>
            </Select>

            <Select size="lg" label="Beygir Gücü" className="max-w-xs">
              <SelectItem key="100" className="text-gray-600">100 HP</SelectItem>
              <SelectItem key="200" className="text-gray-600">200 HP</SelectItem>
              <SelectItem key="300" className="text-gray-600">300 HP</SelectItem>
            </Select>
          </div>

          <div className="flex justify-center w-full mt-6">
            <Button
              onClick={onSearchClick}
              color="warning"
              variant="solid"
              size="lg"
              className="text-white"
              startContent={<Search color="white" />}
            >
              Ara
            </Button>
          </div>
        </Tab>
        */}
      </Tabs>
    </div>
  );
}
