"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const orderModel_1 = require("./orderModel");
const createANewOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orderModel_1.OrderModel.create(orderData);
});
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = query ? { email: query } : {};
    return yield orderModel_1.OrderModel.find(filter);
});
exports.OrderServices = {
    createANewOrder,
    getAllOrdersFromDB
};
