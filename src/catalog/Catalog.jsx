import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../main.jsx";
import {fetchCategory, fetchFlower} from "../http/flowerApi.jsx";
import {CATALOG_ROUTE, HOME_ROUTE} from "../utils/consts.jsx";
import useMediaQuery from "../Usemedia.jsx";
import DeleteFlower from "../deleteFlower/deleteFlower.jsx";
import CreateFlower from "../createFlower/CreateFlower.jsx";
import EditFlower from "../editflower/editFlower.jsx";
import styles from './catalog.module.css';
import grid from '../assets/grid.svg';
import wideGrid from '../assets/widegrid.svg';
import dropDown from "../assets/dropdown.png";
import editImage from '../assets/edit.png';
import deleteImage from '../assets/delete.png';
import heart from '../assets/heart.png';
import {flow} from "mobx";

const Catalog = observer(() => {
    const [isGrid, setIsGrid] = useState(localStorage.getItem("grid") ? JSON.parse(localStorage.getItem("grid")) : true);
    const isTablet = useMediaQuery("(max-width:992px)");
    const isMobile = useMediaQuery("(max-width:768px)");
    const {flower, user} = useContext(Context);
    const navigate = useNavigate();
    const path = useLocation().pathname;

    const [filter, setFilter] = useState(localStorage.getItem("filter") ? localStorage.getItem("filter") : "Новинки");
    const [isOpened, setOpened] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);
    const [editId, setEditId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const url = new URL(location)
            const urlId = url.searchParams.get('category')
            const categories = await fetchCategory()
            if (path === "/catalog/" && !categories.map(element => `${element.id}`).includes(urlId))
                navigate(HOME_ROUTE)
            if (!flower.categories.length > 0) flower.setCategories(categories)
            if (!flower.currentCategory) {
                if (urlId) flower.setCurrentCategory(parseInt(urlId))
            }
            flower.setFilter(url.searchParams.get('sort') ? url.searchParams.get('sort') : "isNew")
            if (flower.filter === 'isNew') setFilter('Новинки')
            if (flower.filter === 'popular') setFilter('Популярні')
            if (flower.filter === 'name') setFilter('Назва, А-Я')
            if (flower.filter === 'nameBack') setFilter('Назва, Я-А')
            if (flower.filter === 'expensive') setFilter('Ціна, найдорожчі')
            if (flower.filter === 'cheap') setFilter('Ціна, найдешевші')
            if (!flower.flowers.length > 0) {
                const flowers = await fetchFlower(flower.currentCategory, flower.Page, flower.limit, flower.filter)
                flower.setFlowers(flowers.rows)
            }
        }

        fetchData();
    }, []);

    const handleFilterChange = async (filter) => {
        setFilter(filter)
        if (filter === "Новинки") {
            flower.setFilter('isNew')
        } else if (filter === "Популярні") {
            flower.setFilter('popular')
        } else if (filter === "Назва, А-Я") {
            flower.setFilter('name')
        } else if (filter === "Назва, Я-А") {
            flower.setFilter('nameBack')
        } else if (filter === "Ціна, найдорожчі") {
            flower.setFilter('expensive')
        } else if (filter === "Ціна, найдешевші") {
            flower.setFilter('cheap')
        }
        if (flower.currentCategory) navigate(CATALOG_ROUTE + `?category=${flower.currentCategory}&sort=${flower.filter}`)
        if (!flower.currentCategory) navigate(CATALOG_ROUTE + `?sort=${flower.filter}`)

        const flowers = await fetchFlower(flower.currentCategory, flower.Page, flower.limit, flower.filter)
        flower.setFlowers(flowers.rows)
    }

    const renderCategory = (element, id) => (
        <li key={id}
            className={styles.category} style={flower.currentCategory === element.id ? {color: "#79A03FFF"} : {}}
            onClick={() => handleCategoryClick(element)}>
            {element.name}
        </li>
    );

    const handleCategoryClick = async (category) => {
        window.scrollTo({top: 0, behavior: "smooth"});
        if (!category.name) {
            navigate(CATALOG_ROUTE+`?sort=${flower.filter}`)
            flower.setCurrentCategory(undefined);
            const data = await fetchFlower(flower.currentCategory, flower.Page, flower.limit, flower.filter)
            flower.setFlowers(data.rows);
            return
        }
        flower.setCurrentCategory(category.id);
        navigate(CATALOG_ROUTE + '/?category=' + category.id + "&sort=" + flower.filter)
        const data = await fetchFlower(category.id, flower.Page, flower.limit, flower.filter)
        flower.setFlowers(data.rows);
    };

    const renderSortTypes = () => (
        ["Новинки", "Популярні", "Назва, А-Я", "Назва, Я-А", "Ціна, найдорожчі", "Ціна, найдешевші"].map((item) => (
            <li key={item} className={styles.filterType} style={filter === item ? {color: "#79A03FFF"} : {}}
                onClick={() => handleFilterChange(item)}>
                {item}
            </li>
        ))
    );


    const renderFlowerCard = (element, id, isHorizontal = false) => (
        <div key={id} className={`${styles.flowerCard} ${isHorizontal ? styles.horizontalFlowerCard : ''}`}>
            <div className={styles.imageHolder}>
                {user._isAdmin && (
                    <div className={styles.categoryAdmin}>
                        <div className={styles.edit} onClick={() => handleEditClick(element.id)}><img
                            className={styles.editImage} src={editImage} alt=""/></div>
                        <div className={styles.delete} onClick={() => handleDeleteClick(element.id)}><img
                            className={styles.deleteImage} src={deleteImage} alt=""/></div>
                    </div>
                )}
                <img className={`${styles.cardImage} ${isHorizontal ? styles.horizontalCardImage : ''}`}
                     src={import.meta.env.VITE_API + "/" + element.image} alt="img"/>
                {element.isNew && <div className={styles.new}>Новинка</div>}
            </div>
            <p className={styles.flowerName}>{element.name}</p>
            <div className={styles.cardDescription}>
                <div className={styles.priceWrapper}>
                    <p className={styles.price}>{element.price.toLocaleString().replaceAll(",", " ").replaceAll(".", ",")}</p>
                    <p className={styles.currency}>₴</p>
                </div>
                <img className={styles.heart} src={heart} alt=""/>
            </div>
        </div>
    );
    const renderHorizontalFlowerCard = (element, id) => (
        <div className={styles.horizontalFlowerCard} key={id}>
            <div className={styles.horizontalImageHolder}>
                {user._isAdmin && <div className={styles.categoryAdmin}>
                    <div className={styles.edit} onClick={() => {
                        setEditId(element.id)
                        setEdit(true)
                    }}><img className={styles.editImage} src={editImage}
                            alt=""/>
                    </div>
                    <div className={styles.delete} onClick={() => {
                        setDelete(true)
                        setDeleteId(element.id)
                    }}><img className={styles.deleteImage} src={deleteImage} alt=""/></div>
                </div>}
                <img className={styles.horizontalCardImage} src={import.meta.env.VITE_API + "/" + element.image}
                     alt="img"/>
                {element.isNew && <div className={styles.new}>Новинка</div>}
            </div>
            <div className={styles.horizontalInfo}>
                <p className={styles.horizontalFlowerName}>{element.name}</p>
                <div className={styles.horizontalDescriptionWrapper}>
                    <div className={styles.flowerDescription}
                         dangerouslySetInnerHTML={{__html: element.description}}></div>
                    <div className={styles.horizontalCardDescription}>
                        <div className={styles.horizontalPriceWrapper}>
                            <p className={styles.horizontalPrice}>{element.price.toLocaleString().replaceAll(",", " ").replaceAll(".", ",")}</p>
                            <p className={styles.horizontalCurrency}>₴</p>
                        </div>
                        <img className={styles.horizontalHeart} src={heart} alt=""/>
                    </div>
                </div>

            </div>
        </div>
    );

    const handleEditClick = (id) => {
        setEditId(id);
        setEdit(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setDelete(true);
    };

    const createFlowerCard = (isHorizontal = false) => (
        <div className={`${styles.flowerCard} ${isHorizontal ? styles.horizontalFlowerCard : ''}`}>
            <div className={styles.imageHolder} onClick={() => setCreate(true)}>
                <p className={styles.createFlower}>Створити<br/>позицію</p>
            </div>
        </div>
    );

    return (
        <>
            {create && <CreateFlower setCreate={setCreate}/>}
            {edit && <EditFlower id={editId} setEdit={setEdit}/>}
            {del && <DeleteFlower id={deleteId} setDelete={setDelete}/>}
            <div className={styles.catalog}>
                <ul className={styles.categorySelect}>
                    {!isTablet && <li style={flower.currentCategory === undefined ? {color: "#79A03FFF"} : {}}
                                      onClick={() => handleCategoryClick({name: ""})}
                                      className={`${styles.category} ${path === CATALOG_ROUTE ? styles.activeCategory : ''}`}>Всі</li>}
                    {!isTablet && flower.categories.map(renderCategory)}
                </ul>
                <div className={styles.flowersWrapper}>
                    <p className={styles.categoryLabel}>{flower.categories.find(element => element.id === flower.currentCategory)?.name || "Всі"}</p>
                    <div className={styles.sortMenu}>
                        <div className={styles.gridLayout}>
                            {!isMobile ? (
                                <>
                                    <img className={styles.grid} style={!isGrid ? {opacity: 0.3} : {}}
                                         onClick={() => setIsGrid(true)} src={grid} alt=""/>
                                    <img className={styles.wideGrid} style={isGrid ? {opacity: 0.3} : {}}
                                         onClick={() => setIsGrid(false)} src={wideGrid} alt=""/>
                                </>
                            ) : (
                                <>
                                    <img className={styles.mobileGrid}
                                         style={!isGrid ? {opacity: 0, transform: "rotate(90deg)"} : {}}
                                         onClick={() => setIsGrid(!isGrid)} src={grid} alt=""/>
                                    <img className={styles.mobileWideGrid}
                                         style={!isGrid ? {opacity: 0.9, transform: "rotate(0deg)"} : {}}
                                         onClick={() => setIsGrid(!isGrid)} src={wideGrid} alt=""/>
                                </>
                            )}
                        </div>
                        <div className={styles.sortWrapper} onClick={() => setOpened(!isOpened)}>
                            <p className={styles.sortText}> Відсортувати за:</p>
                            <div className={styles.sortDropdown}>
                                <p className={styles.currentFilter}>{filter}</p>
                                <img style={isOpened ? {transform: "rotate(0deg)"} : {}} src={dropDown} alt=""/>
                                <ul style={isOpened ? isMobile ? {height: "18rem"} : {height: "19rem"} : {}}
                                    className={styles.sortTypes}>
                                    {renderSortTypes()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {isGrid ? (
                        <div className={styles.flowersGrid}>
                            {user._isAdmin && createFlowerCard()}
                            {flower.flowers.map((flower, index) => renderFlowerCard(flower, index))}
                        </div>
                    ) : (
                        <div className={styles.horizontalFlowersGrid}>
                            {user._isAdmin && createFlowerCard(true)}
                            {flower.flowers.map((flower, index) => renderHorizontalFlowerCard(flower, index, true))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
});

export default Catalog;
