const LoginPage = () => import("~/views/Login/LoginPage.vue")

/* eslint-disable indent */
export const routes: Array<object | any> = [
    {
        name: "Login",
        path: "/",
        component: LoginPage
    }
]
/* eslint-enable indent*/