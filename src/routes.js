import Admin from "./pages/Admin";
import { USER_ROUTE, HISTORY_ROUTE, MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, COMPARISON_ROUTE} from "./utils/const";
import Auth from "./pages/Auth";
import Main from './components/Main/Main'
import User from './components/User/User'
import PriceComparison from "./components/PriceComparison/PriceComparison";
import ChartsUser from "./components/Charts/ChartsUser";

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: User
    },
    {
        path: HISTORY_ROUTE,
        Component: ChartsUser
    },

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: COMPARISON_ROUTE,
        Component: PriceComparison
    },
]