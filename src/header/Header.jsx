import useMediaQuery from "../Usemedia.jsx"
import styles from "./Header.module.css"
import glass from "../assets/glass.png"
import account from "../assets/account.png"
import x from "../assets/x.svg"
import hamburger from "../assets/hamburger.png"
import phone from "../assets/phone.svg"
import faceBook from "../assets/facebook.svg"
import DropDown from "../dropdown/dropDown.jsx";
import React, {useContext, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    CATALOG_ROUTE,
    DELIVERY_ROUTE,
    HOME_ROUTE, LIKED_ROUTE,
    NEW_ROUTE,
    POPULAR_ROUTE,
    REGISTRATION_ROUTE,
    REVIEWS_ROUTE
} from "../utils/consts.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";
import {ClickAwayListener} from "@mui/base";
import {catalogNavigate} from "../catalogNavigate.jsx";


const Header = observer(() => {
    const navigate = useNavigate()
    const isTablet = useMediaQuery("(max-width:992px)")
    const [isOpened, setIsOpened] = useState(false)
    const [openedCategories, setOpenedCategories] = useState(false)
    const activeStyle = {color: "#79A03FFF"};
    const path = useLocation().pathname;
    const {user} = useContext(Context)
    const {flower} = useContext(Context)
    const Item = ({path, label, active}) => (
        <p onClick={() => {
            navigate(path)
            window.scroll(0, 0)

        }} style={active ? {...activeStyle} : {}}>
            {label}
        </p>);
    if (flower.loading) return <></>
    return (
        <>        <ClickAwayListener onClickAway={() => {
            setOpenedCategories(false)
            setIsOpened(false)
        }}>
            <div className={styles.header}>
                <div className={styles.infoWrapper}>
                    <p className={styles.phone}><img src={phone} alt={phone}/>+380-686-880-627</p>
                    <p className={styles.faceBook}><img src={faceBook} alt={faceBook}/><a
                        href="https://www.facebook.com/groups/246459866644485/?locale=ru_RU" target={"_blank"}></a>Офіційна
                        группа</p>
                </div>
                <div className={styles.searchBar}>
                    {isTablet &&
                        <div className={styles.hamburgerMenu}>
                            <DropDown openedCategories={openedCategories} setOpenedCategories={setOpenedCategories}
                                      isOpened={isOpened} setIsOpened={setIsOpened}/>
                            <img className={styles.hamburger}
                                 style={isOpened ? {opacity: "0", transform: "rotateZ(90deg)"} : {}}
                                 onClick={() => setIsOpened(true)} src={hamburger} alt="hamburger"/>
                            <img className={styles.x}
                                 style={isOpened ? {opacity: "1", transform: "rotateZ(90deg)"} : {}}
                                 onClick={() => {
                                     setOpenedCategories(false)
                                     setIsOpened(!isOpened)
                                 }} src={x} alt="hamburger"/>
                        </div>}
                    <div className={styles.logoText} onClick={() => navigate(HOME_ROUTE)}>
                        <p>
                            <span style={{color: "#4F4038"}}>Flower</span>
                            <span style={{color: "#79A03F", letterSpacing: "-2px"}}> O`N</span>
                        </p>
                        <p className={styles.gardenCenter}>Садовий центр</p>
                    </div>
                    {!isTablet && <div className={styles.navigationPanel}>
                        <Item path={HOME_ROUTE} label="Головна"
                              active={path === HOME_ROUTE || path === NEW_ROUTE || path === POPULAR_ROUTE}/>
                        <p onClick={() => {
                            setOpenedCategories(false)
                            catalogNavigate(flower, navigate, flower.page)
                            window.scroll(0, 0)
                        }}
                           style={path.includes(CATALOG_ROUTE) ? activeStyle : {}}>Каталог
                        </p>
                        <Item path={DELIVERY_ROUTE} label="Доставка" active={path.includes(DELIVERY_ROUTE)}/>
                        <span onClick={() => window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: "smooth"
                        })}>
                            Детальніше
                        </span>
                    </div>}
                    <div className={styles.rightPart}>
                        <div className={styles.glass}><img src={glass} alt="glass"/></div>
                        <div className={styles.account}
                             onClick={() => user._isAuth ? navigate(LIKED_ROUTE) : navigate(REGISTRATION_ROUTE)}><img
                            src={account} alt="account"/></div>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
        </>)
})
export default Header