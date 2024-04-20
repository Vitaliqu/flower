import {observer} from "mobx-react-lite";
import styles from './liked.module.css'
import {useNavigate} from 'react-router-dom'
import {HOME_ROUTE} from "../utils/consts.jsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {fetchCategory, fetchFlower} from "../http/flowerApi.jsx";

const Liked = observer(() => {
    const {user, flower} = useContext(Context)
    const [flowers, setFlowers] = useState([])
    useEffect(() => {

        async function fetchData() {
            window.scroll(0, 0)
            const flowers = await fetchFlower(flower.currentCategory, 1, 1000000)
            await setFlowers(flowers.rows.filter(element => flower.liked.includes(element.id)))
        }

        fetchData().finally(()=>flower.setLoading(false))
    }, []);

    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <p className={styles.exit} onClick={async () => {
                localStorage.removeItem('token')
                user.setIsAuth(false)
                user.setUser(user)
                user.setIsAdmin(false)
                const updatedCategories = await fetchCategory();
                await flower.setCategories(updatedCategories);
                navigate(HOME_ROUTE)
            }}>Вийти</p>
            <div className={styles.likedListWrapper}>
                <p className={styles.listLabel}>Рослини, що сподобались</p>
                {flowers.length < 1 && <p>Немає</p>}
                <ul className={styles.likedList}>
                    {flowers.map((element, id) =>
                        <li key={id} className={styles.likedFlower} onClick={() => navigate(`/flower/${element.id}`)}
                        >
                            <div className={styles.imageWrapper}>
                                <img className={styles.flowerImage} src={import.meta.env.VITE_API + "/" + element.image}
                                     alt=""/>
                            </div>
                            <p className={styles.flowerName}>{element.name}</p>
                        </li>)}
                </ul>
            </div>
        </div>
    );
});

export default Liked;