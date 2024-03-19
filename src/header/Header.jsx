import useMediaQuery from "../Usemedia.jsx"
import styles from "./Header.module.css"
import glass from "../assets/glass.png"
import account from "../assets/account.png"
import hamburger from "../assets/hamburger.png"
import phone from "../assets/phone.svg"
import faceBook from "../assets/facebook.svg"


const Header = () => {
    const isTablet = useMediaQuery("(max-width:992px)")
    return (
        <>
            <div className={styles.header}>
                <div className={styles.infoWrapper}>
                    <p className={styles.phone}><img src={phone} alt={phone}/>+380-123-456-789</p>
                    <p className={styles.faceBook}><img src={faceBook} alt={faceBook}/>Офіційна группа</p>
                </div>
                <div className={styles.searchBar}>
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
        </>)
}
export default Header