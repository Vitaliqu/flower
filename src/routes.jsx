import {
  CATALOG_ROUTE,
  DELIVERY_ROUTE,
  FULLPAGE_ROUTE,
  HOME_ROUTE,
  LIKED_ROUTE,
  LOGIN_ROUTE,
  NEW_ROUTE,
  POPULAR_ROUTE,
  REGISTRATION_ROUTE,
  REVIEWS_ROUTE,
} from "./utils/consts.jsx";
import Home from "./Home/Home.jsx";
import Delivery from "./delivery/Delivery.jsx";
import Catalog from "./catalog/Catalog.jsx";
import Registration from "./register/Register.jsx";
import Login from "./login/Login.jsx";
import Liked from "./Liked/Liked.jsx";
import { fetchCategory } from "./http/flowerApi.jsx";
import FullPage from "./fullPage/fullPage.jsx";

export const authorizedRoutes = [
  {
    path: LIKED_ROUTE,
    component: <Liked />,
  },
];
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: <Login />,
  },
  {
    path: REGISTRATION_ROUTE,
    component: <Registration />,
  },
  {
    path: HOME_ROUTE,
    component: <Home filter={"all"} />,
  },
  {
    path: NEW_ROUTE,
    component: <Home filter={"isNew"} />,
  },
  {
    path: POPULAR_ROUTE,
    component: <Home filter={"popular"} />,
  },
  {
    path: CATALOG_ROUTE,
    component: <Catalog />,
  },
  {
    path: DELIVERY_ROUTE,
    component: <Delivery />,
  },
  {
    path: CATALOG_ROUTE + "/:id",
    component: <Catalog />,
  },
  {
    path: FULLPAGE_ROUTE + "/:id",
    component: <FullPage />,
  },
];
