import styles from './catalog.module.css';
import grid from '../assets/grid.svg';
import wideGrid from '../assets/widegrid.svg';
import heart from '../assets/heart.png';
import {flowers_category, flowers} from "../database.js";
import {useState} from "react";
import dropDown from "../assets/dropdown.png";

const Catalog = () => {
    const [filter, setFilter] = useState("Новинки")
    const [isOpened, setOpened] = useState(false)
    const renderCategory = (element, id) => (
        <li key={id} className={styles.category}>
            {element.name}
        </li>
    );

    const renderSortTypes = () => (
        <>
            {["Новинки", "Популярні", "Назва, А-Я", "Назва, Я-А", "Ціна, найдорожчі", "Ціна, найдешевші"].map((item) => (
                <li key={item} className={styles.filterType}
                    style={filter === item ? {color: "#79A03FFF"} : {}} onClick={() => setFilter(item)}>{item}</li>
            ))}
        </>
    );

    const renderFlowerCard = (element, id) => (
        <div className={styles.flowerCard} key={id}>
            <div className={styles.imageHolder}>
                <img className={styles.cardImage} src={element.image} alt="img"/>
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
        <div className={styles.catalogWrapper}>
            <div className={styles.catalog}>
                <div className={styles.horizontalWrapper}>
                    <div className={styles.categorySelect}>
                        <li className={styles.category}>Всі</li>
                        {flowers_category.map(renderCategory)}
                    </div>
                    <div className={styles.flowersWrapper}>
                        <p className={styles.categoryLabel}>Магнолії</p>
                        <div className={styles.sortMenu}>
                            <div className={styles.gridLayout}>
                                <img className={styles.grid} src={grid} alt=""/>
                                <img className={styles.wideGrid} src={wideGrid} alt=""/>
                            </div>
                            <div className={styles.sortWrapper} onClick={() => {
                                setOpened(!isOpened)
                                console.log(isOpened)
                            }}>
                                <p className={styles.sortText}> Відсортувати за:</p>
                                <div className={styles.sortDropdown}>
                                    <p className={styles.currentFilter}>{filter}</p>
                                    <img src={dropDown} alt=""/>
                                    <ul style={isOpened ? {height: "20rem"} : {}} className={styles.sortTypes}>
                                        {renderSortTypes()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flowersGrid}>
                            {flowers.map(renderFlowerCard)}
                        </div>
                    </div>
                </div>
                <div className={styles.pageSelect}>12134567</div>
            </div>
        </div>
    );
};

export default Catalog;
