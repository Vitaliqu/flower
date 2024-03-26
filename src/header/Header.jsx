import useMediaQuery from "../Usemedia.jsx"
import styles from "./Header.module.css"
import glass from "../assets/glass.png"
import account from "../assets/account.png"
import x from "../assets/x.svg"
import hamburger from "../assets/hamburger.png"
import phone from "../assets/phone.svg"
import faceBook from "../assets/facebook.svg"
import DropDown from "../dropdown/dropDown.jsx";
import {useContext, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {CATALOG_ROUTE, DELIVERY_ROUTE, HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REVIEWS_ROUTE} from "../utils/consts.jsx";
import {Context} from "../main.jsx";


const Header = () => {
    const isTablet = useMediaQuery("(max-width:992px)")
    const [isOpened, setIsOpened] = useState(false)
    const activeStyle = {color: "#79A03FFF"};
    const path = useLocation().pathname;
    const {user} = useContext(Context)
    const Item = ({path, label, active}) => (
        <p style={active ? {...activeStyle} : {}}>
            <Link to={path} onClick={() => setTimeout(() => window.scrollTo({
                top: 0,
                behavior: "smooth"
            }), 50)}/>{label}
        </p>);

    return (
        <>
            <div className={styles.header}>
                <div className={styles.infoWrapper}>
                    <p className={styles.phone}><img src={phone} alt={phone}/>+380-123-456-789</p>
                    <p className={styles.faceBook}><img src={faceBook} alt={faceBook}/>Офіційна группа</p>
                </div>
                <div className={styles.searchBar}>
                    {isTablet &&
                        <div className={styles.hamburgerMenu}>
                            <DropDown isOpened={isOpened} setIsOpened={setIsOpened}/>
                            <img className={styles.hamburger}
                                 style={isOpened ? {opacity: "0", transform: "rotateZ(180deg)"} : {}}
                                 onClick={() => setIsOpened(!isOpened)} src={hamburger} alt="hamburger"/>
                            <img className={styles.x}
                                 style={isOpened ? {opacity: "1", transform: "rotateZ(180deg)"} : {}}
                                 onClick={() => setIsOpened(!isOpened)} src={x} alt="hamburger"/>
                        </div>}
                    <div className={styles.logoText}>
                        <p>
                            <span style={{color: "#4F4038"}}>Flower</span>
                            <span style={{color: "#79A03F", letterSpacing: "-2px"}}> O`N</span>
                        </p>
                        <p className={styles.gardenCenter}>Садовий центр</p>
                    </div>
                    {!isTablet && <div className={styles.navigationPanel}>
                        <Item path={HOME_ROUTE} label="Головна"
                              active={path === HOME_ROUTE || path === NEW_ROUTE || path === POPULAR_ROUTE}/>
                        <Item path={CATALOG_ROUTE} label="Каталог" active={path.includes(CATALOG_ROUTE)}/>
                        <Item path={DELIVERY_ROUTE} label="Доставка" active={path.includes(DELIVERY_ROUTE)}/>
                        {/*<Item path={REVIEWS_ROUTE} label="Відгуки" active={path.includes(REVIEWS_ROUTE)}/>*/}
                        <span onClick={() => window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: "smooth"
                        })}>
                            Детальніше
                        </span>
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