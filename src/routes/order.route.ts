import { Router } from "express";
import { orderController } from "../controllers/order.controller";

export const orderRoutes = Router()

orderRoutes.get('/', orderController.getOrders)
orderRoutes.post('/', orderController.createOrders)
orderRoutes.put('/:orderId', orderController.updateOrder)
orderRoutes.delete('/:orderId', orderController.deleteOrder)