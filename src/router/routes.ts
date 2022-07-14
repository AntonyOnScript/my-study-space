const LoginPage = () => import("~/views/Login/LoginPage.vue")
const BoardsPage = () => import("~/views/Boards/BoardsPage.vue")

/* eslint-disable indent */
export const routes: Array<object | any> = [
    {
        name: "Login",
        path: "/",
        component: LoginPage
    },
    {
        name: 'Boards',
        path: '/boards',
        component: BoardsPage
    }
]
/* eslint-enable indent*/