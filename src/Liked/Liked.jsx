import {observer} from "mobx-react-lite";
import styles from './liked.module.css'
import {useNavigate} from 'react-router-dom'
import {HOME_ROUTE} from "../utils/consts.jsx";
import {useContext} from "react";
import {Context} from "../main.jsx";
import {fetchCategory} from "../http/flowerApi.jsx";

const Liked = observer(() => {
    const {user, flower} = useContext(Context)

    const navigate = useNavigate()
    return (
        <div className={styles.container}>
            <p className={styles.exit} onClick={async () => {
                localStorage.clear()
                user.setIsAuth(false)
                user.setUser(user)
                user.setIsAdmin(false)
                const updatedCategories = await fetchCategory();
                await flower.setCategories(updatedCategories);
                navigate(HOME_ROUTE)
            }}>Вийти</p>
        </div>
    );
});

export default Liked;