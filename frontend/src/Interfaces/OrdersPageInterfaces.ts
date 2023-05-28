import { IProduct } from "./FoodPageInterfaces";

export interface IOrder {
  id: string;
  userId: string;
  customerId: string;
  paymentId: string;
  subtotal: string;
  total: string;
  delivery_status: string;
  payment_status: string;
  createdAt: string;
  updatedAt: string;
  orderProducts: IOrderProduct[];
  shipping: {
    id: string;
    name: string;
    email: string;
    city: string;
    address1: string;
    address2?: string;
    postalCode: string;
    phoneNumber: string;
    country: string;
  };
}

export interface IOrderProduct {
  id: string;
  quantity: number;
  product: IProduct;
}

export const initialOrder: IOrder = {
  id: "",
  userId: "",
  customerId: "",
  paymentId: "",
  subtotal: "",
  total: "",
  delivery_status: "",
  payment_status: "",
  createdAt: "",
  updatedAt: "",
  orderProducts: [],
  shipping: {
    id: "",
    name: "",
    email: "",
    city: "",
    address1: "",
    address2: undefined,
    postalCode: "",
    phoneNumber: "",
    country: "",
  },
};
