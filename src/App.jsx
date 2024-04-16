import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import AppRouter from "./components/AppRouter.jsx";
import {Context} from "./main.jsx";
import {check} from "./http/userApi.jsx";
import {fetchCategory, fetchFlower} from "./http/flowerApi.jsx";


const App = observer(() => {
    const {flower} = useContext(Context)
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {

                const url = new URL(location)
                const filterValue = url.searchParams.get('sort') || "isNew"
                const page = url.searchParams.get('page') || 1

                await flower.setFilter(filterValue)
                const urlId = url.searchParams.get('category')

                if (urlId) flower.setCurrentCategory(parseInt(urlId))
                else flower.setCurrentCategory(undefined)

                const categories = await fetchCategory()


                await flower.setPage(parseInt(page))
                await flower.setCategories(categories)
                const flowers = await fetchFlower(flower.currentCategory, flower.page, flower.limit, flower.filter)
                await flower.setFlowers(flowers.rows)
                const checkData = await check();
                user.setUser(true);
                user.setIsAuth(true);
                if (checkData.role === "ADMIN") user.setIsAdmin(true);
            } catch (error) {
            } finally {
                setLoading(false)
            }
        };

        fetchData();

    }, [useParams()]); // Add dependencies if needed
    if (loading) return <></>;
    return (
        <>
            <BrowserRouter scrollToTop={true}>
                <Header/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </>
    );
});

export default App;
