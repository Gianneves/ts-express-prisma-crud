import type { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export const orderController = {
    getOrders: async (req: Request, res: Response) => {
        try {
            const orders = await prisma.order.findMany({})

            if (!orders) return res.status(404).json({ success: false, message: "Orders not found" })

            return res.status(200).json({ success: true, orders })
        } catch (error) {
            console.error("internal server error while fetching orders")
            res.status(500).json({ message: "internal server error while fetching orders" })
        }
    },

    createOrders: async (req: Request, res: Response) => {
        try {

            const { name, description, category } = req.body

            if (!name || !description) return res.status(400).json({ message: "Name and description are required!" })

            const order = await prisma.order.create({
                data: {
                    name,
                    description,
                    category
                }
            })

            res.status(201).json({ success: true, order })

        } catch (error) {
            console.error("internal server error while creating order")
            res.status(500).json({ message: "internal server error while creating order" })
        }
    },

    updateOrder: async (req: Request, res: Response) => {
        try {

            const { orderId } = req.params
            const { name, description, category } = req.body

            const order = await prisma.order.updateMany({
                where: {
                    id: orderId
                },
                data: {
                    name: name,
                    description: description,
                    category: category,
                },
            })

            if(!order) return res.status(404).json({ success: false, message: "Order not found" })

            res.status(200).json({ success: true, message: "Order updated successfully" })

        } catch (error) {
            console.error("internal server error while fetching orders")
            res.status(500).json({ message: "internal server error while updating order" })
        }
    },

    deleteOrder: async (req: Request, res: Response) => {
        try {
            const { orderId } = req.params

            const order = await prisma.order.delete({ where: { id: orderId } })

            res.status(200).json({ message: "Order deleted successfully", order })

        } catch (error) {
            console.error("internal server error while delete order")
            res.status(500).json({ message: "internal server error while deleting order" })
        }
    }
}