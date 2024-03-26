import styles from './catalog.module.css';
import grid from '../assets/grid.svg';
import wideGrid from '../assets/widegrid.svg';
import heart from '../assets/heart.png';
import {flowers_category, flowers} from "../database.js";
import {useState} from "react";
import dropDown from "../assets/dropdown.png";
import {Link, useLocation} from "react-router-dom";
import {CATALOG_ROUTE} from "../utils/consts.jsx";

const Catalog = () => {
    const path = useLocation().pathname;
    const [filter, setFilter] = useState(localStorage.getItem('filter') === null ? "Новинки" : localStorage.getItem('filter'))
    const [isOpened, setOpened] = useState(false)
    const renderCategory = (element, id) => (
        <li style={encodeURIComponent(element.name) === path.split("/")[2] ? {color: "#79A03FFF"} : {}} key={id}
            className={styles.category}>
            <Link to={`/catalog/${element.name}`} onClick={() => setTimeout(() => window.scrollTo({
                top: 0,
                behavior: "smooth"
            }),50)}/>
            {element.name}</li>
    );
    const filteredArray = (array, filter) => {
        array = array.slice()
        switch (filter) {
            case "Новинки":
                return array.sort((a, b) => b.new - a.new);
            case "Популярні":
                return array.sort((a, b) => a.popular - b.popular);
            case "Назва, А-Я":
                return array.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
            case "Назва, Я-А":
                return array.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
            case "Ціна, найдорожчі":
                return array.sort((a, b) => b.price - a.price);
            case "Ціна, найдешевші":
                return array.sort((a, b) => a.price - b.price);
            default:
                return array;
        }
    }

    const renderSortTypes = () => (
        <>
            {["Новинки", "Популярні", "Назва, А-Я", "Назва, Я-А", "Ціна, найдорожчі", "Ціна, найдешевші"].map((item) => (
                <li key={item} className={styles.filterType}
                    style={filter === item ? {color: "#79A03FFF"} : {}} onClick={() => {
                    localStorage.setItem('filter', item)
                    setFilter(item)
                }}>{item}</li>
            ))}
        </>
    );

    const renderFlowerCard = (element, id) => (
        <div className={styles.flowerCard} key={id}>
            <div className={styles.imageHolder}>
                <img className={styles.cardImage} src={element.image} alt="img"/>
                {element.new && <div className={styles.new}>Новинка</div>}
            </div>
            <p className={styles.flowerName}>{element.name}</p>
            <div className={styles.cardDescription}>
                <div className={styles.priceWrapper}>
                    <p className={styles.price}>{element.price.toLocaleString().replaceAll(",", " ")}</p>
                    <p className={styles.currency}>₴</p>
                </div>
                <img className={styles.heart} src={heart} alt=""/>
            </div>
        </div>
    );

    return (
        <div className={styles.catalog}>
            <ul className={styles.categorySelect}>
                <li className={styles.category}
                    style={path === CATALOG_ROUTE ? {color: "#79A03FFF"} : {}}>Всі
                    <Link to={CATALOG_ROUTE}/>
                </li>
                {flowers_category.map(renderCategory)}
            </ul>
            <div className={styles.flowersWrapper}>
                <p className={styles.categoryLabel}>Магнолії</p>
                <div className={styles.sortMenu}>
                    <div className={styles.gridLayout}>
                        <img className={styles.grid} src={grid} alt=""/>
                        <img className={styles.wideGrid} src={wideGrid} alt=""/>
                    </div>
                    <div className={styles.sortWrapper} onClick={() => {
                        setOpened(!isOpened)
                    }}>
                        <p className={styles.sortText}> Відсортувати за:</p>
                        <div className={styles.sortDropdown}>
                            <p className={styles.currentFilter}>{filter}</p>
                            <img src={dropDown} alt=""/>
                            <ul style={isOpened ? {height: "19rem"} : {}} className={styles.sortTypes}>
                                {renderSortTypes()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.flowersGrid}>
                    {filteredArray(flowers, filter).filter(element => {
                        if (path === CATALOG_ROUTE) return element;
                        return encodeURIComponent(element.category) === path.split("/")[2];
                    }).map(renderFlowerCard)}
                </div>
                <div className={styles.pageSelect}>12134567</div>
            </div>
        </div>
    );
};

export default Catalog;
