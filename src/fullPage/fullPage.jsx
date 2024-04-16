import React, {useContext, useEffect, useState} from "react";
import {fetchCategory, fetchFlower, fetchOne} from "../http/flowerApi.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import styles from './fullPage.module.css';
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete.png";
import heart from "../assets/heart.png";
import activeHeart from "../assets/active-heart.png";
import {Context} from "../main.jsx";
import EditFlower from "../editflower/editFlower.jsx";
import DeleteFlower from "../deleteFlower/deleteFlower.jsx";
import useMediaQuery from "../Usemedia.jsx";
import {CATALOG_ROUTE} from "../utils/consts.jsx";

const FullPage = observer(() => {
    const {flower} = useContext(Context)
    const params = useParams();
    const [currentFlower, setFlower] = useState(flower.flowers.find(element => element.id === parseInt(params.id)));
    const isTablet = useMediaQuery("(max-width:992px)");
    const [hearsState, setHeart] = useState(flower.liked.includes(currentFlower.id))
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);
    const [editId, setEditId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    useEffect(() => {
        window.scroll(0, 0);

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
    const handleLikeClick = () => {
        if (!hearsState) {
            flower.setLiked(flower.liked.concat(currentFlower.id))
            setHeart(true)
            localStorage.setItem('liked', JSON.stringify(flower.liked))
        } else {
            flower.setLiked(flower.liked.filter(element => element !== currentFlower.id))
            setHeart(false)
            localStorage.setItem('liked', JSON.stringify(flower.liked))
        }
    }
    const renderCard = () => {
        return <div className={styles.flowerCard}>
            <div className={styles.imageHolder}>
                {user._isAdmin && <div className={styles.categoryAdmin}>
                    <div className={styles.edit} onClick={() => {
                        setEditId(currentFlower.id)
                        setEdit(true)
                    }}>
                        <img className={styles.editImage} src={editImage} alt=""/>
                    </div>
                    <div className={styles.delete} onClick={() => {
                        setDelete(true)
                        setDeleteId(currentFlower.id)
                    }}>
                        <img className={styles.deleteImage} src={deleteImage} alt=""/>
                    </div>
                </div>}
                <img className={styles.cardImage}
                     src={import.meta.env.VITE_API + "/" + currentFlower.image}
                     alt=""/>
            </div>
            <div className={styles.info}>
                <div className={styles.nameWrapper}><p
                    className={styles.flowerName}>{currentFlower.name}</p>
                    <img onClick={handleLikeClick} className={styles.heart} src={hearsState ? activeHeart : heart}
                         alt=""/></div>

                <div className={styles.descriptionWrapper}>
                    <div className={styles.description}
                         dangerouslySetInnerHTML={{__html: currentFlower.description}}></div>
                    <p className={styles.order}>Замовити: +380-686-880-627</p>
                    <div className={styles.cardDescription}>
                        <div className={styles.priceWrapper}>
                            <p className={styles.price}>{currentFlower.price && currentFlower.price.toLocaleString().replaceAll(",", " ").replaceAll(".", ",")}</p>
                            <p className={styles.currency}>₴</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    const renderTabletCard = () => {
        return <div className={styles.tabletFlowerCard}>
            <div className={styles.tabletImageHolder}>
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
                <img className={styles.cardImage}
                     src={import.meta.env.VITE_API + "/" + currentFlower.image}
                     alt=""/>
            </div>
            <div className={styles.info}>
                <div className={styles.nameWrapper}><p
                    className={styles.flowerName}>{currentFlower.name}</p>
                    <img onClick={handleLikeClick} className={styles.heart} src={hearsState ? activeHeart : heart}
                         alt=""/></div>

                <div className={styles.descriptionWrapper}>
                    <p className={styles.order}>Замовити: +380-686-880-627</p>
                    <div className={styles.cardDescription}>
                        <div className={styles.priceWrapper}>
                            <p className={styles.price}>{currentFlower.price && currentFlower.price.toLocaleString().replaceAll(",", " ").replaceAll(".", ",")}</p>
                            <p className={styles.currency}>₴</p>
                        </div>
                    </div>
                    <div className={styles.description}
                         dangerouslySetInnerHTML={{__html: currentFlower.description}}></div>
                </div>
            </div>
        </div>
    }
    return (
        <>      {edit && <EditFlower id={editId} setEdit={setEdit}/>}
            {del && <DeleteFlower id={deleteId} setDelete={setDelete}/>}
            <div className={styles.container}>
                {isTablet ? renderTabletCard() :
                    renderCard()}
            </div>
        </>
    );
});

export default FullPage;