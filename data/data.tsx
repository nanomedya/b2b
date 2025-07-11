const POPUPDATA = [
  { "id": 1, "date": "01.06.2020", "document": "RM4985839", "piece": 4.00, "unit": "AD", "unitPrice": 100.00, "total": 400.00, "isk1": 0.00, "isk2": 0.00, "isk3": 8.00, "isk4": 2.00, "kdvTotal": 12.00, "netPrice": 405.00, "netKdvPrice": 135.00, "netAmount": 195.00, "netAmountKdv": 195.00, "foreign": "TL" },
  { "id": 2, "date": "05.03.2023", "document": "RM5655835", "piece": 12.00, "unit": "AC", "unitPrice": 140.50, "total": 420.00, "isk1": 4.00, "isk2": 7.00, "isk3": 0.00, "isk4": 5.00, "kdvTotal": 56.00, "netPrice": 575.00, "netKdvPrice": 566.00, "netAmount": 532.00, "netAmountKdv": 155.00, "foreign": "USD" },
  { "id": 3, "date": "01.02.2024", "document": "RM4675847", "piece": 16.00, "unit": "AF", "unitPrice": 130.00, "total": 350.00, "isk1": 6.00, "isk2": 0.00, "isk3": 4.00, "isk4": 7.00, "kdvTotal": 74.00, "netPrice": 345.00, "netKdvPrice": 135.00, "netAmount": 753.00, "netAmountKdv": 185.00, "foreign": "EUR" },
]

const POPUPDATA2 = [
  { "id": 4, "date": "01.06.2020", "document": "RM4985839", "piece": 4.00, "unit": "AD", "unitPrice": 100.00, "total": 400.00, "isk1": 0.00, "isk2": 0.00, "isk3": 8.00, "isk4": 2.00, "kdvTotal": 12.00, "netPrice": 405.00, "netKdvPrice": 135.00, "netAmount": 195.00, "netAmountKdv": 195.00, "foreign": "TL" },
  { "id": 5, "date": "05.03.2023", "document": "RM5655835", "piece": 12.00, "unit": "AC", "unitPrice": 140.50, "total": 420.00, "isk1": 4.00, "isk2": 7.00, "isk3": 0.00, "isk4": 5.00, "kdvTotal": 56.00, "netPrice": 575.00, "netKdvPrice": 566.00, "netAmount": 532.00, "netAmountKdv": 155.00, "foreign": "USD" },
  { "id": 6, "date": "01.02.2024", "document": "RM4675847", "piece": 16.00, "unit": "AF", "unitPrice": 130.00, "total": 350.00, "isk1": 6.00, "isk2": 0.00, "isk3": 4.00, "isk4": 7.00, "kdvTotal": 74.00, "netPrice": 345.00, "netKdvPrice": 135.00, "netAmount": 753.00, "netAmountKdv": 185.00, "foreign": "EUR" },
]

const TABLE_DATA = {
  columns: [
    { name: "Resim", key: "image", sortable: false },
    { name: "Bilgi", key: "info", sortable: false },
    { name: "Detay", key: "detail", sortable: false },
    { name: "Şehir", key: "city", sortable: false },
    { name: "Kodu", key: "code", sortable: true },
    { name: "Adı", key: "name", sortable: true },
    { name: "Üretici", key: "manufacturer", sortable: false },
    { name: "Oem No", key: "oemNo", sortable: true },
 
    //{ name: "İstanbul", key: "istanbul", sortable: false },
    //{ name: "1. Sanayi", key: "first_industry", sortable: false },
    { name: "İskonto", key: "discount", sortable: true },
    { name: "Liste Fiyatı", key: "list_price", sortable: false },
    { name: "Liste Fiyatı TL", key: "list_price_tl", sortable: false },
    { name: "KDV Hariç", key: "price_excl_vat", sortable: false },
    { name: "KDV Dahil", key: "price_incl_vat", sortable: false },
    { name: "Tedarik", key: "merkez", sortable: false },
    { name: "Merkez", key: "ankara", sortable: false },
    { name: "Miktar", key: "quantity", sortable: false },
    { name: "İşlemler", key: "actions", sortable: false },

  ],
};



  const TABLE_DATA_3 = [
    {
      id: 1,
      date: "01.06.2020",
      document: "RM4985839",
      piece: 4,
      unit: "AD",
      unitPrice: 100,
      total: 400,
      isk1: 0,
      isk2: 0,
      isk3: 8,
      isk4: 2,
      kdvTotal: 12,
      netPrice: 405,
      netKdvPrice: 135,
      netAmount: 195,
      netAmountKdv: 195,
      foreign: "TL",
    },
    {
      id: 2,
      date: "05.03.2023",
      document: "RM5655835",
      piece: 12,
      unit: "AC",
      unitPrice: 420,
      total: 5040,
      isk1: 4,
      isk2: 7,
      isk3: 0,
      isk4: 5,
      kdvTotal: 56,
      netPrice: 575,
      netKdvPrice: 566,
      netAmount: 532,
      netAmountKdv: 155,
      foreign: "USD",
    },
    {
      id: 3,
      date: "01.02.2024",
      document: "RM4675847",
      piece: 16,
      unit: "AF",
      unitPrice: 350,
      total: 5600,
      isk1: 6,
      isk2: 0,
      isk3: 4,
      isk4: 7,
      kdvTotal: 74,
      netPrice: 345,
      netKdvPrice: 135,
      netAmount: 753,
      netAmountKdv: 185,
      foreign: "EUR",
    },
  ];
  

  const TABLE_DATA_4 = [
    {
      id: 1,
      image: "/static/items/c1.png",
      code: "CAST-5003",
      name: "Motor Yağı",
      manufacturer: "CASTROL",
      manufacturer_code: "",
      isk1: "40+2",
      isk2: "40+2",
      price_including_VAT: "40+2",
      unit: "AD",
      part_family_name: "",
      part_type_name: "",
      warehouse_status: true,
      basket: 3
    }, 
  ];
  

  const TABLE_DATA_5 = [{
    code: "495774393",
    name: "Yağ Filtresi",
    manufacturer: "MAIS",
    manufacturer_code: "",
    oem_no: "95738498",
    izmir: true,
    ankara: true,
    istanbul: true,
    first_industry: false,
    ted: true,
    retail_price_excluding_vat: "134.86 ₺",
    wire_transfer_price_excluding_vat: "134.86 ₺",
    credit_card_single_price_excluding_vat: "134.86 ₺",
    credit_card_installment_price_excluding_vat: "134.86 ₺",
    price_excluding_vat: "134.86 ₺",
    retail_price_including_vat: "134.86 ₺",
    wire_transfer_price_including_vat: "134.86 ₺",
    credit_card_single_price_including_vat: "134.86 ₺",
    credit_card_installment_price_including_vat: "134.86 ₺",
    price_including_vat: "134.86 ₺",
    unit: "AD",
    part_family_name: "Yağ filtresi",
    part_type_name: "CLI-CT54",
  }
];


const TABLE_DATA_6 = [
  {
    code: '74534533565',
  },
  {
    code: '55534533567',
  },
  {
    code: '28534533545',
  },
  {
    code: '63534533523',
  },
  {
    code: '97534533557',
  },
]

const TABLE_DATA_7 = [
  {
    name: 'Mercedes',
  },
  {
    name: 'Audi',
  },
  {
    name: 'Bmw',
  },
  {
    name: 'Seat',
  },
  {
    name: 'Skoda',
  },
]

const TABLE_DATA_8 = [
  {
    name: 'CLA',
  },
  {
    name: 'A4',
  },
  {
    name: '520D',
  },
  {
    name: 'Leon',
  },
  {
    name: 'Super B',
  },
]

export { POPUPDATA, TABLE_DATA, TABLE_DATA_3, TABLE_DATA_4, TABLE_DATA_5, TABLE_DATA_6, TABLE_DATA_7, TABLE_DATA_8 };