import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import AppRouter from "./components/AppRouter.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./main.jsx";
import {check} from "./http/userApi.jsx";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)
    check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
        if (data.role === "ADMIN") user.setIsAdmin(true)
    }).catch(e => e).finally(() => setLoading(false))
    return <>
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    </>
})
export default App