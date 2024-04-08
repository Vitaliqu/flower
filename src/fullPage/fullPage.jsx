import React, {useContext, useEffect, useState} from "react";
import {fetchCategory, fetchFlower, fetchOne} from "../http/flowerApi.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import styles from './fullPage.module.css';
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete.png";
import heart from "../assets/heart.png";
import {Context} from "../main.jsx";
import EditFlower from "../editflower/editFlower.jsx";
import DeleteFlower from "../deleteFlower/deleteFlower.jsx";
import useMediaQuery from "../Usemedia.jsx";
import {CATALOG_ROUTE} from "../utils/consts.jsx";

const FullPage = observer(() => {
    setTimeout(() => window.scrollTo({top: 0, behavior: "smooth"}), 1)

    const params = useParams();
    const [currentFlower, setFlower] = useState({});

    const isTablet = useMediaQuery("(max-width:992px)");
    const isMobile = useMediaQuery("(max-width:768px)");
    const {flower, user} = useContext(Context);
    const navigate = useNavigate();
    const path = useLocation().pathname;

    const [filter, setFilter] = useState("Новинки");
    const [sortOpen, setSortOpen] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);
    const [editId, setEditId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);

    useEffect(() => {
        async function fetchData() {
                const data = await fetchOne(parseInt(params.id));
            setFlower(data);

            const flowers = await fetchFlower(flower.currentCategory, flower.page, flower.limit, flower.filter)
            flower.setFlowers(flowers.rows)
            flower.setCategories(await fetchCategory())
            if (!flower.flowers.map(element => element.id).includes(parseInt(params.id))) navigate(CATALOG_ROUTE)

        }

        fetchData();
    }, []);

    return (
        <>      {edit && <EditFlower id={editId} setEdit={setEdit}/>}
            {del && <DeleteFlower id={deleteId} setDelete={setDelete}/>}
            <div className={styles.container}>
                <div className={styles.horizontalFlowerCard}>
                    <div className={styles.horizontalImageHolder}>
                        {user._isAdmin && <div className={styles.categoryAdmin}>
                            <div className={styles.edit} onClick={() => {
                                setEditId(currentFlower.id)
                                setEdit(true)
                            }}><img className={styles.editImage} src={editImage}
                                    alt=""/>
                            </div>
                            <div className={styles.delete} onClick={() => {
                                setDelete(true)
                                setDeleteId(currentFlower.id)
                            }}><img className={styles.deleteImage} src={deleteImage} alt=""/></div>
                        </div>}
                        <img className={styles.horizontalCardImage}
                             src={import.meta.env.VITE_API + "/" + currentFlower.image}
                             alt=""/>
                    </div>
                    <div className={styles.horizontalInfo}>
                        <p className={styles.horizontalFlowerName}>{currentFlower.name}</p>
                        <div className={styles.horizontalDescriptionWrapper}>
                            <div className={styles.flowerDescription}
                                 dangerouslySetInnerHTML={{__html: currentFlower.description}}></div>
                            <div className={styles.horizontalCardDescription}>
                                <div className={styles.horizontalPriceWrapper}>
                                    <p className={styles.price}>{currentFlower.price && currentFlower.price.toLocaleString().replaceAll(",", " ").replaceAll(".", ",")}</p>
                                    <p className={styles.horizontalCurrency}>₴</p>
                                </div>
                                <img className={styles.horizontalHeart} src={heart} alt=""/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
});

export default FullPage;
