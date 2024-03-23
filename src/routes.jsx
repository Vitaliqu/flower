import {
    ADMIN_ROUTE, CATALOG_ROUTE, DELIVERY_ROUTE,
    HOME_ROUTE,
    LIKED_ROUTE,
    LOGIN_ROUTE,
    NEW_ROUTE,
    POPULAR_ROUTE,
    REGISTRATION_ROUTE, REVIEWS_ROUTE
} from "./utils/consts.jsx";
import Home from "./Home/Home.jsx";
import Delivery from "./delivery/Delivery.jsx";

export const authorizedRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <></>
    },
    {
        path: LIKED_ROUTE,
        component: <></>
    }
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <div>login</div>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <>register</>
    },
    {
        path: HOME_ROUTE,
        component: <Home filter={"all"}/>
    },
    {
        path: NEW_ROUTE,
        component: <Home filter={"new"}/>
    },
    {
        path: POPULAR_ROUTE,
        component: <Home filter={"popular"}/>
    },
    {
        path: CATALOG_ROUTE,
        component: <div>catalog</div>
    },
    {
        path: DELIVERY_ROUTE,
        component: <Delivery/>
    },
    {
        path: REVIEWS_ROUTE,
        component: <div>reviews</div>
    }
]
