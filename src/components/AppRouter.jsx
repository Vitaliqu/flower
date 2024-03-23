import {Route, Routes,Navigate} from "react-router-dom"
import {authorizedRoutes} from "../routes.jsx";
import {publicRoutes} from "../routes.jsx";
import {HOME_ROUTE} from "../utils/consts.jsx";

const AppRouter = () => {
    const isAuth = false;
    return (
        <Routes>
            {isAuth && authorizedRoutes.map(({path, component}) => <Route key={path} path={path} element={component}/>)}
            {publicRoutes.map(({path, component}) => <Route key={path} path={path} element={component}/>)}
            <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;