import {useState, useEffect} from "react";
import styles from "./App.module.css"
import glass from "./assets/glass.png"
import account from "./assets/account.svg"
import hamburger from "./assets/hamburger.png"
import phone from "./assets/phone.svg"

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);
    useEffect(() => {
        const matchQueryList = window.matchMedia(query);

        const handleChange = (e) => setMatches(e.matches);

        matchQueryList.addEventListener("change", handleChange);
        return () => matchQueryList.removeEventListener("change", handleChange);
    }, [query]);
    return matches;
}


const App = () => {
    const isTablet = useMediaQuery("(max-width:992px)")
    return <div className={styles.header}>
        <div className={styles.searchBar}>
            <p className={styles.phone}><img src={phone} alt={phone}/>+380-123-456-789</p>
            {isTablet && <div className={styles.dropDown}><img src={hamburger} alt="hamburger"/></div>}
            <div className={styles.logoText}>
                <p>
                    <span style={{color: "#4F4038"}}>Flower</span>
                    <span style={{color: "#79A03F", letterSpacing: "-2px"}}> O`N</span>
                </p>
                <p className={styles.gardenCenter}>Садовий центр</p>
            </div>
            {!isTablet && <div className={styles.navigationPanel}>
                <p style={{color: "#79A03F"}}>Головна</p>
                <p>Каталог</p>
                <p>Доставка</p>
                <p>Відгуки</p>
                <p>Детальніше</p>
            </div>}
            <div className={styles.rightPart}>
                <div className={styles.glass}><img src={glass} alt="glass"/></div>
                <div className={styles.account}><img src={account} alt="account"/></div>
            </div>
        </div>
    </div>
}
export default App