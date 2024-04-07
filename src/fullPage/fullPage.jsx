import React, {useContext, useEffect, useState} from "react";
import {fetchOne} from "../http/flowerApi.jsx";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import styles from './fullPage.module.css';
import editImage from "../assets/edit.png";
import deleteImage from "../assets/delete.png";
import heart from "../assets/heart.png";
import {Context} from "../main.jsx";

const FullPage = observer(() => {
    const {user} = useContext(Context)
    const params = useParams();
    const [flower, setFlower] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await fetchOne(parseInt(params.id));
            setFlower(data);
        }

        fetchData();
    }, [params.id]);

    return (
        <div className={styles.container}>
            <div className={styles.horizontalFlowerCard}>
                <div className={styles.horizontalImageHolder}>
                    {user._isAdmin && <div className={styles.categoryAdmin}>
                        <div className={styles.edit} onClick={() => {
                            setEditId(flower.id)
                            setEdit(true)
                        }}><img className={styles.editImage} src={editImage}
                                alt=""/>
                        </div>
                        <div className={styles.delete} onClick={() => {
                            setDelete(true)
                            setDeleteId(flower.id)
                        }}><img className={styles.deleteImage} src={deleteImage} alt=""/></div>
                    </div>}
                    <img className={styles.horizontalCardImage} src={import.meta.env.VITE_API + "/" + flower.image}
                         alt=""/>
                </div>
                <div className={styles.horizontalInfo}>
                    <p className={styles.horizontalFlowerName}>{flower.name}</p>
                    <div className={styles.horizontalDescriptionWrapper}>
                        <div className={styles.flowerDescription}
                             dangerouslySetInnerHTML={{__html: flower.description}}></div>
                        <div className={styles.horizontalCardDescription}>
                            <div className={styles.horizontalPriceWrapper}>
                                <p className={styles.price}>{flower.price && flower.price.toLocaleString().replaceAll(",", " ").replaceAll(".", ",")}</p>
                                <p className={styles.horizontalCurrency}>₴</p>
                            </div>
                            <img className={styles.horizontalHeart} src={heart} alt=""/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
});

export default FullPage;
