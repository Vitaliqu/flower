import {Route, Routes, Navigate} from "react-router-dom"
import {authorizedRoutes, fetchRoutes} from "../routes.jsx";
import {publicRoutes} from "../routes.jsx";
import {HOME_ROUTE} from "../utils/consts.jsx";
import UserStore from "../store/UserStore.jsx";
import {useContext} from "react";
import {Context} from "../main.jsx";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user._isAuth && authorizedRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>)}
            {publicRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>)}
            {fetchRoutes.map(({path, component}) =>
                <Route key={path} path={path} element={component}/>)}
            <Route path="*" element={<Navigate to={HOME_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;