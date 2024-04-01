import styles from "./Home.module.css"
import plant from "../assets/plant.png"
import {Link, useNavigate} from "react-router-dom";
import editImage from '../assets/edit.png'
import deleteImage from '../assets/delete.png'
import {CATALOG_ROUTE, HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE} from "../utils/consts.jsx";
import {fetchCategory} from "../http/flowerApi.jsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";
import CreateCategory from "../createCategory/CreateCategory.jsx";
import EditCategory from "../editCategory/editCategory.jsx";
import DeleteCategory from "../deleteCategory/deleteCategory.jsx";


const Home = observer((filter) => {

    const createCategory = () => (<div className={styles.categoryCard}>
        <div className={styles.imageHolder} onClick={() => setCreate(true)}><p
            className={styles.createCategory}>Створити<br/>категорію</p>
        </div>
    </div>)
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {flower} = useContext(Context)
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [del, setDelete] = useState(false)
    const [editId, setEditId] = useState(0)
    const [deleteId, setDeleteId] = useState(0)
    useEffect(() => {
        fetchCategory().then(data => flower.setCategories(data))
    }, []);

    const active = {color: "white", backgroundColor: "#79A03F"}
    return <>
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
                        <div className={styles.all}
                             style={filter.filter === "all" ? active : {}}>
                            <Link to={HOME_ROUTE}/>Всі
                        </div>
                        <div className={styles.new}
                             style={filter.filter === "isNew" ? active : {}}>
                            <Link to={NEW_ROUTE}/>Новинки
                        </div>
                        <div className={styles.popular}
                             style={filter.filter === "popular" ? active : {}}>
                            <Link to={POPULAR_ROUTE}/>Популярні
                        </div>
                    </div>
                </div>
                <div className={styles.categoryGrid}>
                    {user._isAdmin && createCategory()}
                    {flower.categories.filter(element => filter.filter === "all" ? true : element[filter.filter])
                        .map((element, index) => (
                            <div className={styles.categoryCard} key={index}>
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
                                    <img loading={'lazy'} onClick={() => {
                                        navigate(CATALOG_ROUTE + '/' + element.name)
                                        setTimeout(() => window.scrollTo({
                                            top: 0,
                                            behavior: "smooth"
                                        }), 50)
                                    }} className={styles.cardImage} src={import.meta.env.VITE_API + "/" + element.image}
                                         alt=""/>
                                </div>
                                <p className={styles.categoryName}>{element.name}</p>
                            </div>
                        ))}
                </div>
            </div>
    </>
})
export default Home