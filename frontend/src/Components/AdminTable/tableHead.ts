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
    id: "quantity",
    numeric: false,
    disablePadding: true,
    label: "Quantity",
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
