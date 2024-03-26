import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserStore from "./store/UserStore.jsx";
import FlowerStore from "./store/FlowerStore.jsx";

export const Context = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Context.Provider value={{user: new UserStore(), flower: new FlowerStore()}}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Context.Provider>
)
