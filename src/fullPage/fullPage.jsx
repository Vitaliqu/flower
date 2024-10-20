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
import spinner from "../assets/kOnzy.gif";

const FullPage = observer(() => {
    const {flower} = useContext(Context)
    const params = useParams();
    const [currentFlower, setFlower] = useState(flower.flowers.length > 0 ? flower.flowers.find(element => element.id === parseInt(params.id)) : {});
    const isTablet = useMediaQuery("(max-width:992px)");
    const [hearsState, setHeart] = useState(false)
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editId, setEditId] = useState(0);
    const [deleteId, setDeleteId] = useState(0);
    useEffect(() => {
        window.scroll(0, 0);

    }, []);
    useEffect(() => {

        async function fetchData() {
            if (flower.liked.includes(parseInt(params.id))) setHeart(true)
            const flowers = await fetchFlower(flower.currentCategory, 1, 1000000)
            await setFlower(flowers.rows.find(element => element.id === parseInt(params.id)))
            if (!flowers.rows.map(element => `${element.id}`).includes(params.id)) navigate(CATALOG_ROUTE)
            flower.setCategories(await fetchCategory())
            setIsLoading(false)
        }

        fetchData()
    }, [useParams()]);
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
        if (flower.loading) return <></>
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
        if (!currentFlower) return <></>

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
    if (!currentFlower) return <></>
    return (
        isLoading ? <img className={styles.spinner} src={spinner} alt=""/>: <>
            {edit && <EditFlower id={editId} setEdit={setEdit}/>}
                {del && <DeleteFlower id={deleteId} setDelete={setDelete}/>}
                <div className={styles.container}>
                    {isTablet ? renderTabletCard() :
                        renderCard()}
                </div>
            </>
    );
});

export default FullPage;