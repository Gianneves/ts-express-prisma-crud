import express from "express"
import cors from "cors"
import { orderRoutes } from "./routes/order.route"

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
    res.status(200).json({ message: 'Api is healthy' })
})

app.use('/api/v1/orders/', orderRoutes);

const port = process.env.PORT

app.listen(port)