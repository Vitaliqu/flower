import React, { useEffect, useState } from 'react';
import { ADMIN_ROUTE, LIKED_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE, CATALOG_ROUTE, DELIVERY_ROUTE, REVIEWS_ROUTE } from "./utils/consts.jsx";
import Home from "./Home/Home.jsx";
import Delivery from "./delivery/Delivery.jsx";
import Catalog from "./catalog/Catalog.jsx";
import Registration from "./register/Register.jsx";
import Login from "./login/Login.jsx";
import Liked from "./Liked/Liked.jsx";
import { fetchCategory } from "./http/flowerApi.jsx";

export const authorizedRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <></>
    },
    {
        path: LIKED_ROUTE,
        component: <Liked/>
    }
]

export let publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        component: <Registration/>
    },
    {
        path: HOME_ROUTE,
        component: <Home filter={"all"}/>
    },
    {
        path: NEW_ROUTE,
        component: <Home filter={"isNew"}/>
    },
    {
        path: POPULAR_ROUTE,
        component: <Home filter={"popular"}/>
    },
    {
        path: CATALOG_ROUTE,
        component: <Catalog/>
    },
    {
        path: DELIVERY_ROUTE,
        component: <Delivery/>
    },
    {
        path: REVIEWS_ROUTE,
        component: <div>reviews</div>
    }
];

// Fetch categories asynchronously and update publicRoutes
(async () => {
    const categories = await fetchCategory();
    publicRoutes = [
        ...publicRoutes,
        ...categories.map(element => ({
            path: `/catalog/${element.name}`,
            component: <Catalog/>
        }))
    ];
})();
