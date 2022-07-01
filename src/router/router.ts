import { createRouter } from "vue-router"
import { createWebHistory } from "vue-router"
import type { RouterOptions } from "vue-router"
import { routes } from "./routes"

const routerOptions: RouterOptions = {
    routes,
    history: createWebHistory()
}

const router = createRouter(routerOptions)

export default router