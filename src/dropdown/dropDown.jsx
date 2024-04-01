import styles from './dropDown.module.css'
import {Link, useLocation, useNavigate} from "react-router-dom"
import {CATALOG_ROUTE, DELIVERY_ROUTE, HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE, REVIEWS_ROUTE} from "../utils/consts.jsx";
import useMediaQuery from "../Usemedia.jsx";
import {useContext, useState} from "react";
import {Context} from "../main.jsx";
import {fetchFlower} from "../http/flowerApi.jsx";

const DropDown = (state) => {
    const navigate = useNavigate()
    const path = useLocation().pathname;
    const {flower} = useContext(Context)
    const isMin = useMediaQuery("(max-width:420px)")
    const activeStyle = {backgroundColor: "#79A03F", color: "white"};
    const {isOpened, setIsOpened} = state;
    const [openedCategories, setOpenedCategories] = useState(false)
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
    const renderCategory = (element, id) => (
        <li style={encodeURIComponent(element.name) === path.split("/")[2] ? {color: "#79A03FFF"} : {}} key={id}
            className={styles.category} onClick={() => {
            setOpenedCategories(false)
            flower.setCurrentCategory(element.id)
            fetchFlower(flower.currentCategory, 1, 3).then(data => {
                flower.setFlowers(data.rows)
            })
            closeMenu()
            navigate(CATALOG_ROUTE + "/" + element.name)
            setTimeout(() => window.scrollTo({
                top: 0,
                behavior: "smooth"
            }), 50)
        }}>{element.name}</li>);

    const selectCategory = () => {
        return <>
            <div className={styles.categories}>
                <li className={styles.category}
                    onClick={() => {
                        flower.setCurrentCategory(null)
                        setOpenedCategories(false)
                        fetchFlower(null, 1, flower.totalCount).then(data => {
                            flower.setFlowers(data.rows)
                            flower.setTotalCount(data.count)
                        })
                        closeMenu()
                        navigate(CATALOG_ROUTE)
                        setTimeout(() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        }), 50)
                    }}
                    style={path === CATALOG_ROUTE ? {color: "#79A03FFF"} : {}}>
                    Всі
                </li>
                {flower.categories.map(renderCategory)}</div>
        </>

    }
    const Item = ({path, label, active}) => (
        <li className={styles.navigate} style={active ? {...activeStyle} : {}} onClick={() => {
            setOpenedCategories(false)
            closeMenu()
        }}>
            <Link to={path}/>{label}
        </li>
    );

    return <>
        <div className={styles.dropDownMenu}
             style={isOpened ? isMin ? {width: "140px"} : {width: "200px"} : {}}>
            {openedCategories && selectCategory()}
            <ul className={styles.dropDownList}>
                <Item path={HOME_ROUTE} label="Головна"
                      active={path === HOME_ROUTE || path === NEW_ROUTE || path === POPULAR_ROUTE}/>
                <Item path={CATALOG_ROUTE} label="Каталог" active={path.includes(CATALOG_ROUTE)}/>
                {path.includes(CATALOG_ROUTE) &&
                    <li style={openedCategories ? activeStyle : {}} className={styles.navigate} onClick={() => {
                        setOpenedCategories(!openedCategories)
                    }}>Категорії</li>}
                <Item path={DELIVERY_ROUTE} label="Доставка" active={path.includes(DELIVERY_ROUTE)}
                      onClick={closeMenu}/>
                <li className={styles.navigate} onClick={scrollToFooter}>
                    Детальніше
                </li>
            </ul>
        </div>
    </>
}

export default DropDown