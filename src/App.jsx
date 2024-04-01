import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import AppRouter from "./components/AppRouter.jsx";
import { Context } from "./main.jsx";
import { check } from "./http/userApi.jsx";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data) => {
                user.setUser(true);
                user.setIsAuth(true);
                if (data.role === "ADMIN") user.setIsAdmin(true);
            })
            .catch((error) => console.error("Error:", error))
            .finally(() => setLoading(false));
    }, []); // Empty dependency array means this effect runs only once after the initial render

    return (
        <>
            <BrowserRouter>
                <Header />
                <AppRouter />
                <Footer />
            </BrowserRouter>
        </>
    );
});

export default App;
