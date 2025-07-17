
// src/types.ts


export type  InfoProps = {
  title: string,
  code: string,  
  unit_of_purchased: number,  
  unit_price_excluding_vat: number,  
  unit_price_including_vat: number,
  currency: string
}

export type  PriceExclVatProps = {
  title: string,
  value: number,
  retail_price_vat_included: number,  
  eft_price_vat_included: number,  
  kk_single_payment_vat_included: number,  
  kk_installments_payment_vat_included: number,
  currency: string
}

export type  InvoiceProps = {
  id: number;
  date: string; // Tarih formatı için ISO kullanımı önerilir.
  document: string;
  piece: number; // Adet bilgisi (ör: 4.00)
  unit: string; // Birim türü (ör: AD)
  unitPrice: number; // Birim fiyat
  total: number; // Toplam fiyat
  isk1: number; // 1. İskonto oranı
  isk2: number; // 2. İskonto oranı
  isk3: number; // 3. İskonto oranı
  isk4: number; // 4. İskonto oranı
  kdvTotal: number; // KDV toplamı
  netPrice: number; // Net fiyat
  netKdvPrice: number; // Net fiyat + KDV
  netAmount: number; // Net tutar
  netAmountKdv: number; // Net tutar + KDV
  foreign: string; // Döviz türü (ör: TL)
}


export type RowsProps = {
  id: number;
  image: string;
  info: InfoProps;
  detail: InvoiceProps[];
  city: string;
  barcode: string;
  name: string;
  manufacturer: string;
  oemNo: string;
  campaign: string;
  izmir: boolean;
  ankara: boolean;
  istanbul: boolean;
  firstIndustry: boolean;
  discount: string;
  list_price: string;
  list_price_tl: string;
  priceExclVat: PriceExclVatProps;
  priceInclVat: string;
  totalVat: string;
  stock_quantity: number,
  quantity: number;
}
export type ColumnsProps = {
  key: any;
  name: String;
  sortable: boolean
}

export interface TableRowData {
  id: number;
  date: string;
  document: string;
  piece: number;
  unit: string;
  unitPrice: number;
  total: number;
  isk1: number;
  isk2: number;
  isk3: number;
  isk4: number;
  kdvTotal: number;
  netPrice: number;
  netKdvPrice: number;
  netAmount: number;
  netAmountKdv: number;
  foreign: string;
}

export interface TableRowOptionsData {
  id: number; // Satır ID'si
  image: string; // Görsel yolu
  code: string; // Ürün kodu
  name: string; // Ürün adı
  manufacturer: string; // Üretici firma adı
  manufacturer_code: string; // Üretici kodu
  isk1: string; // İlk iskontolu fiyat
  isk2: string; // İkinci iskontolu fiyat
  price_including_VAT: string; // KDV dahil fiyat
  unit: string; // Birim (örneğin: AD)
  part_family_name: string; // Parça ailesi adı
  part_type_name: string; // Parça tipi adı
  warehouse_status: boolean; // Depo durumu (true/false)
  basket: number; // Sepetteki miktar
}

export interface TableRowOemRowData {
  code: string
}

export interface TableRowCarsRowData {
  name: string
}


export interface TableRowGenelInfoData {
  code: string;
  name: string;
  manufacturer: string;
  manufacturer_code?: string;
  oem_no?: string;
  izmir: boolean;
  ankara: boolean;
  istanbul: boolean;
  first_industry: boolean;
  ted: boolean;
  retail_price_excluding_vat: string;
  wire_transfer_price_excluding_vat: string;
  credit_card_single_price_excluding_vat: string;
  credit_card_installment_price_excluding_vat: string;
  price_excluding_vat: string;
  retail_price_including_vat: string;
  wire_transfer_price_including_vat: string;
  credit_card_single_price_including_vat: string;
  credit_card_installment_price_including_vat: string;
  price_including_vat: string;
  unit: string;
  part_family_name: string;
  part_type_name: string;
}


export type BasketItem = {
  productId: number;
  productVariantId: number;
  sellerId: number;
  quantity: number;
  title: string;
  price: string;
  name: string;
  image: string;
  currency: string;
  variantId: number | null;
}

export type RatingProps = {
  rate: number;
  count: number;
}

export type FavoriteProps = {
  id: number;
  title: string;
  date: string;
}

export type Currencies = {
  value: string;
  currency: string;
  updated_at: string;
}

export type OrdersProps = {
  customer_name: string;
  customer_surname: string;
  customer_telephone: string;
  order_city: string;
  order_cargo: string;
  order_price: string;
  order_status: string;
  order_no: string;
  order_type: string;
  order_date: string;
  id: string;

};

export type OrderProps = {
  customer_name: string;
  customer_surname: string;
  customer_telephone: string;
  order_city: string;
  order_cargo: string;
  order_price: string;
  order_status: string;
  order_no: string;
  order_type: string;
  order_date: string;
  id: string;

};



export type StoriesProps = {
  title: string;
  url: string;
  image: string;
  statu: boolean;
  order_id: number;
};

export type SliderProps = { 
  image: string;
  statu: boolean;
  order_id: number;
};


export type NewsProps = { 
  image: string;
  title: string;
  description: string;
  statu: boolean;
  created_at: string;
  order_id: number;
};


export type Channel = {
  id: number;
  title: string;
  description: string;
  isLocalMarket: boolean;
};

export type BasketState = {
  items: any[];
  totalItems: number;
  totalPrice: number;
};

export type Category = {
  id: number;
  title: string;
  price: string;
  description: string;
  parentId: number;
  image: string;
  children?: Category[];
  totalProductsCount: number;
  [key: string]: any;
}
 