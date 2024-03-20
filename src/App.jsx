import Header from "./header/Header.jsx";
import Home from "./Home/Home.jsx"
import Footer from "./footer/Footer.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
    return <>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home filter={'all'}/>}></Route>
                <Route path="new/" element={<Home filter={'new'}/>}></Route>
                <Route path="popular/" element={<Home filter={'popular'}/>}></Route>
            </Routes>
        </BrowserRouter>
        <Footer/>
    </>
}
export default App