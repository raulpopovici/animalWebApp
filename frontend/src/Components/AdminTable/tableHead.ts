export const productsTablehead = [
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "price",
    numeric: false,
    disablePadding: true,
    label: "Price",
  },
  {
    id: "animalType",
    numeric: true,
    disablePadding: false,
    label: "Animal Type",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "Product Weight",
    numeric: true,
    disablePadding: false,
    label: "Product Weight",
  },
  {
    id: "valueSold",
    numeric: true,
    disablePadding: false,
    label: "Total Sold",
  },
];

export const usersTablehead = [
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "phonenumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "city",
    numeric: true,
    disablePadding: false,
    label: "City",
  },
  {
    id: "country",
    numeric: true,
    disablePadding: false,
    label: "Country",
  },
];

export const ordersTablehead = [
  {
    id: "orderID",
    numeric: true,
    disablePadding: false,
    label: "Order ID",
  },
  {
    id: "Subtotal",
    numeric: false,
    disablePadding: true,
    label: "Subtotal",
  },
  {
    id: "Total",
    numeric: false,
    disablePadding: true,
    label: "Total",
  },
  {
    id: "Created At",
    numeric: true,
    disablePadding: false,
    label: "Created At",
  },
];

export interface orderRows {
  orderID: string;
  Subtotal: number;
  Total: number;
  CreatedAt: string;
}

export interface productRows {
  quantity: number;
  id: string;
  name: string;
  price: number;
  animalType: string;
  brand: string;
  productWeight: number;
}

export interface userRows {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}
