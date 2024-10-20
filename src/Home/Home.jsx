import styles from "./Home.module.css";
import plant from "../assets/plant.png";
import {useNavigate} from "react-router-dom";
import editImage from '../assets/edit.png';
import deleteImage from '../assets/delete.png';
import {CATALOG_ROUTE, HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE} from "../utils/consts.jsx";
import {fetchCategory, fetchFlower} from "../http/flowerApi.jsx";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";
import CreateCategory from "../createCategory/CreateCategory.jsx";
import EditCategory from "../editCategory/editCategory.jsx";
import DeleteCategory from "../deleteCategory/deleteCategory.jsx";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import spinner from '../assets/kOnzy.gif';
import {catalogNavigate} from "../catalogNavigate.jsx";

const Home = observer((filter) => {

    const createCategory = () => (<div className={styles.categoryCard}>
        <div className={styles.imageHolder} onClick={() => setCreate(true)}><p
            className={styles.createCategory}>Створити<br/>категорію</p>
        </div>
    </div>);

    const navigate = useNavigate();
    const {user} = useContext(Context);
    const {flower} = useContext(Context);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editId, setEditId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    useEffect(() => {
        fetchCategory().then(data => flower.setCategories(data)).then(() => flower.setLoading(false)).finally(() => setIsLoading(false));
    }, []);

    const active = {color: "white", backgroundColor: "#79A03F"};

    const renderCategoryCard = (element, index) => {
        return <div className={styles.categoryCard} key={index}>
            <div className={styles.imageHolder}>
                {user._isAdmin && <div className={styles.categoryAdmin}>
                    <div className={styles.edit} onClick={() => {
                        setEditId(element.id)
                        setEdit(true)
                    }}><img className={styles.editImage} src={editImage} alt=""/>
                    </div>
                    <div className={styles.delete} onClick={() => {
                        setDelete(true)
                        setDeleteId(element.id)
                    }}><img className={styles.deleteImage} src={deleteImage} alt=""/></div>
                </div>}
                <img loading={'lazy'} onClick={async () => {
                    flower.setCurrentCategory(element.id)
                    const flowers = await fetchFlower(flower.currentCategory)
                    catalogNavigate(flower, navigate, 1)
                    flower.setFlowers(flowers.rows)
                    flower.setTotalCount(flowers.count)
                    requestAnimationFrame(() => window.scroll(0, 0))
                }} className={styles.cardImage} src={import.meta.env.VITE_API + "/" + element.image}
                     alt=""/>
            </div>
            <p className={styles.categoryName}>{element.name}</p>
        </div>
    }
    if (flower.loading) return <></>
    return (
        <>
            {create && <CreateCategory setCreate={setCreate}/>}
            {edit && <EditCategory id={editId} setEdit={setEdit}/>}
            {del && <DeleteCategory id={deleteId} setDelete={setDelete}/>}
            <div className={styles.home}>
                <div className={styles.flowersCategory}>
                    <div className={styles.categoryLabel}>
                        Категорії рослин
                        <img src={plant} alt="plant" className={styles.plant}/>
                    </div>
                    <div className={styles.categorySwitch}>
                        <div className={styles.all} onClick={() => navigate(HOME_ROUTE)}
                             style={filter.filter === "all" ? active : {}}>Всі
                        </div>
                        <div className={styles.new} onClick={() => navigate(NEW_ROUTE)}
                             style={filter.filter === "isNew" ? active : {}}>Новинки
                        </div>
                        <div className={styles.popular} onClick={() => navigate(POPULAR_ROUTE)}
                             style={filter.filter === "popular" ? active : {}}>Популярні
                        </div>
                    </div>
                </div>
                {isLoading ? <img className={styles.spinner} src={spinner} alt=""/> :
                    <div className={styles.categoryGrid}>
                        {user._isAdmin && createCategory()}
                        {flower.categories.filter(element => filter.filter === "all" ? true : element[filter.filter])
                            .map((element, index) => (renderCategoryCard(element, index)))}
                    </div>}
            </div>
        </>
    );
});

export default Home;
