import cors from "@fastify/cors"
import Fastify from "fastify"
import { appRoutes } from "./lib/routes"

const PORT = 3333
const app = Fastify()

app.register(cors, {})
app.register(appRoutes)

app
  .listen({
    host: "192.168.1.16",
    port: PORT,
  })
  .then(() => console.log(`HTTP Server running on port ${PORT}`))
