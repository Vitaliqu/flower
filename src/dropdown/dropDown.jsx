import styles from './dropDown.module.css'
import {Link, useLocation} from "react-router-dom"
import {CATALOG_ROUTE, DELIVERY_ROUTE, HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REVIEWS_ROUTE} from "../utils/consts.jsx";

const DropDown = (state) => {

    const path = useLocation().pathname;
    const activeStyle = {backgroundColor: "#79A03F", color: "white"};
    const {isOpened, setIsOpened} = state;
    const scrollToFooter = () => {
        setIsOpened(false);
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    };

    const closeMenu = () => {
        setIsOpened(false)
        setTimeout(() => window.scrollTo({
            top: 0,
            behavior: "smooth"
        }), 20)

    };
    const Item = ({path, label, active, onClick}) => (
        <li className={styles.navigate} style={active ? {...activeStyle} : {}} onClick={onClick}>
            <Link to={path}/>{label}
        </li>
    );

    return <div className={styles.dropDownMenu}
                style={isOpened ? {width: "200px"} : {}}>
        <ul className={styles.dropDownList}>
            <Item path={HOME_ROUTE} label="Головна"
                  active={path === HOME_ROUTE || path === NEW_ROUTE || path === POPULAR_ROUTE} onClick={closeMenu}/>
            <Item path={CATALOG_ROUTE} label="Каталог" active={path.includes(CATALOG_ROUTE)} onClick={closeMenu}/>
            <Item path={DELIVERY_ROUTE} label="Доставка" active={path.includes(DELIVERY_ROUTE)} onClick={closeMenu}/>
            {/*<Item path={REVIEWS_ROUTE} label="Відгуки" active={path.includes(REVIEWS_ROUTE)} onClick={closeMenu}/>*/}
            <li className={styles.navigate} onClick={scrollToFooter}>
                Детальніше
            </li>
        </ul>
    </div>
}

export default DropDown