import { prisma } from "../../src/lib/prisma"

describe("Order Test", () => {


    it("should create an order", async () => {

        const newOrder = {
            name: "Pão",
            description: "teste",
            category: "comida"
        }

        const addOrder = await prisma.order.create({
            data: {
                name: newOrder.name,
                description: newOrder.description,
                category: newOrder.category
            }
        })

        expect(addOrder.name).toBe(newOrder.name)
    })


})