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
            className={styles.category}
            onClick={async () => {
                setOpenedCategories(false)
                closeMenu()
                window.scrollTo({top: 0, behavior: "smooth"});
                if (!element.name) {
                    flower.setCurrentCategory(undefined);
                    const data = await fetchFlower(flower.currentCategory, flower.Page, flower.limit, flower.filter)
                    navigate(CATALOG_ROUTE + "?sort=" + flower.filter)
                    flower.setFlowers(data.rows);
                    return
                }
                flower.setCurrentCategory(element.id);

                navigate(CATALOG_ROUTE + '/?category=' + element.id + "&sort=" + flower.filter)
                const data = await fetchFlower(flower.currentCategory, flower.Page, flower.limit, flower.filter);
                flower.setFlowers(data.rows);

            }}>{element.name}</li>);

    const selectCategory = () => {
        return <>
            <div className={styles.categories}>
                <li className={styles.category}
                    onClick={async () => {
                        flower.setCurrentCategory(null)
                        setOpenedCategories(false)
                        closeMenu()
                        const data = await fetchFlower(flower.currentCategory, flower.Page, flower.limit, flower.filter);
                        flower.setFlowers(data.rows);
                        navigate(CATALOG_ROUTE + "?sort=" + flower.filter)

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
            navigate(path)
            closeMenu()
        }}>
            {label}
        </li>
    );

    return <>
        <div className={styles.dropDownMenu}
             style={isOpened ? isMin ? {width: "140px"} : {width: "200px"} : {}}>
            {openedCategories && selectCategory()}
            <ul className={styles.dropDownList}>
                <Item path={HOME_ROUTE} label="Головна"
                      active={path === HOME_ROUTE || path === NEW_ROUTE || path === POPULAR_ROUTE}/>
                <Item
                    path={flower.currentCategory ? CATALOG_ROUTE + `/?category=${flower.currentCategory}&sort=${flower.filter}` :
                        CATALOG_ROUTE + `/?sort=${flower.filter}`} label="Каталог"
                    active={path.includes(CATALOG_ROUTE)}/>
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