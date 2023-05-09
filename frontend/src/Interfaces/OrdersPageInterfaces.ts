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
