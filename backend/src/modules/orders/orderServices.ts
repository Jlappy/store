import { IOrder } from "./orderInterface";
import { OrderModel } from "./orderModel";

const createANewOrder = async (orderData: IOrder) => {
 return await OrderModel.create(orderData)
};

const getAllOrdersFromDB = async (query: string | undefined) => {
const filter = query ? {email: query} : {};
return await OrderModel.find(filter)
}
export const OrderServices = {
    createANewOrder,
    getAllOrdersFromDB
}