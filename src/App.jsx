import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import AppRouter from "./components/AppRouter.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
    return <>
        <BrowserRouter>
            <Header/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    </>
}
export default App