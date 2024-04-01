import styles from './catalog.module.css';
import grid from '../assets/grid.svg';
import wideGrid from '../assets/widegrid.svg';
import heart from '../assets/heart.png';
import {useContext, useEffect, useState} from "react";
import dropDown from "../assets/dropdown.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE} from "../utils/consts.jsx";
import {Context} from "../main.jsx";
import {fetchCategory, fetchFlower} from "../http/flowerApi.jsx";
import {observer} from "mobx-react-lite";
import editImage from '../assets/edit.png'
import deleteImage from '../assets/delete.png'
import useMediaQuery from "../Usemedia.jsx";
import EditCategory from "../editCategory/editCategory.jsx";
import DeleteFlower from "../deleteFlower/deleteFlower.jsx";
import CreateFlower from "../createFlower/CreateFlower.jsx";
import EditFlower from "../editflower/editFlower.jsx";


const Catalog = observer(() => {
    const [isGrid, setIsGrid] = useState(localStorage.getItem("grid") ? JSON.parse(localStorage.getItem("grid")) : true);
    const isTablet = useMediaQuery("(max-width:992px)")
    const isMobile = useMediaQuery("(max-width:768px)")
    const {flower} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    localStorage.setItem("grid", JSON.stringify(isGrid))
    const createFlower = () => (<div className={styles.flowerCard}>
        <div className={styles.imageHolder} onClick={() => setCreate(true)}><p
            className={styles.createFlower}>Створити<br/>позицію</p>
        </div>
    </div>)
    const createHorizontalFlower = () => (<div className={styles.horizontalFlowerCard}>
        <div className={styles.imageHolder} onClick={() => setCreate(true)}><p
            className={styles.createFlower}>Створити<br/>позицію</p>
        </div>
    </div>)

    const path = useLocation().pathname;
    const [filter, setFilter] = useState(localStorage.getItem('filter') === null ? "Новинки" : localStorage.getItem('filter'))
    const [isOpened, setOpened] = useState(false)

    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDelete] = useState(false)
    const [editId, setEditId] = useState(0)
    const [deleteId, setDeleteId] = useState(0)
    useEffect(() => {
        async function fetchData() {
            try {

                const flowerData = await fetchFlower();
                flower.setTotalCount(flowerData.count);

                const categoryData = await fetchCategory()
                flower.setCategories(categoryData)

                const categoryInPath = flower.categories.find(element => encodeURIComponent(element.name) === path.split("/")[2]);
                if (categoryInPath) {
                    // Set current category if found
                    await flower.setCurrentCategory(categoryInPath.id);

                    // Fetch flowers for current category
                    const flowersForCategory = await fetchFlower(categoryInPath.id, 1, flowerData.count);
                    flower.setFlowers(flowersForCategory.rows);
                } else {
                    // If category not found in path, fetch flowers without filtering by category
                    const allFlowers = await fetchFlower(null, 1, flowerData.count);
                    flower.setFlowers(allFlowers.rows);

                }
                const categoriesData = await fetchCategory();
                flower.setCategories(categoriesData);

            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
            }
        }

        // Call fetchData when component mounts
        fetchData();
    }, []);

    const renderCategory = (element, id) => (
        <li style={encodeURIComponent(element.name) === path.split("/")[2] ? {color: "#79A03FFF"} : {}} key={id}
            className={styles.category} onClick={() => {
            navigate(CATALOG_ROUTE + "/" + element.name)
            flower.setCurrentCategory(element.id)
            fetchFlower(flower.currentCategory, 1, 3).then(data => {
                flower.setFlowers(data.rows)
            })
            setTimeout(() => window.scrollTo({
                top: 0,
                behavior: "smooth"
            }), 50)
        }}>{element.name}</li>);
    const filteredArray = (array, filter) => {
        if (!array) return {}
        array = array.slice()
        switch (filter) {
            case "Новинки":
                return array.sort((a, b) => b.isNew - a.isNew);
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
                <img className={styles.cardImage} src={import.meta.env.VITE_API + "/" + element.image} alt="img"/>
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
                    <div className={styles.flowerDescription}>{element.description}</div>
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
    return <>
        {create && <CreateFlower setCreate={setCreate}/>}
        {edit && <EditFlower id={editId} setEdit={setEdit}/>}
        {del && <DeleteFlower id={deleteId} setDelete={setDelete}/>}
        <div className={styles.catalog}>
            <ul className={styles.categorySelect}>
                {!isTablet && (
                    <li onClick={() => {
                        navigate(CATALOG_ROUTE)
                        fetchFlower(null, 1, flower.totalCount).then(data => {
                            flower.setFlowers(data.rows)
                            flower.setTotalCount(data.count)
                        })
                    }} className={styles.category} style={path === CATALOG_ROUTE ? {color: "#79A03FFF"} : {}}>
                        Всі
                    </li>
                )}
                {!isTablet && flower.categories.map(renderCategory)}
            </ul>
            <div className={styles.flowersWrapper}>
                <p className={styles.categoryLabel}>Магнолії</p>
                <div className={styles.sortMenu}>
                    <div className={styles.gridLayout}>
                        {!isMobile ?
                            <>
                                <img className={styles.grid} style={!isGrid ? {opacity: 0.3} : {}}
                                     onClick={() => setIsGrid(true)} src={grid} alt=""/>
                                <img className={styles.wideGrid} style={isGrid ? {opacity: 0.3} : {}}
                                     onClick={() => setIsGrid(false)} src={wideGrid} alt=""/>
                            </> :
                            <>
                                <img className={styles.mobileGrid}
                                     style={!isGrid ? {opacity: 0, transform: "rotate(90deg)"} : {}}
                                     onClick={() => setIsGrid(!isGrid)} src={grid} alt=""/>
                                <img className={styles.mobileWideGrid}
                                     style={!isGrid ? {opacity: 0.9, transform: "rotate(0deg)"} : {}}
                                     onClick={() => setIsGrid(!isGrid)} src={wideGrid} alt=""/>
                            </>}

                    </div>
                    <div className={styles.sortWrapper} onClick={() => {
                        setOpened(!isOpened)
                    }}>
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
                {isGrid ?
                    <>
                        <div className={styles.flowersGrid}>
                            {user._isAdmin && createFlower()}
                            {filteredArray(flower.flowers, filter).map(renderFlowerCard)}
                        </div>
                        <div className={styles.pageSelect}>12134567</div>
                    </> :
                    <>
                        <div className={styles.horizontalFlowersGrid}>
                            {user._isAdmin && createHorizontalFlower()}
                            {filteredArray(flower.flowers, filter).map(renderHorizontalFlowerCard)}
                        </div>
                        <div className={styles.pageSelect}>12134567</div>
                    </>}

            </div>
        </div>
    </>;
});

export default Catalog;
