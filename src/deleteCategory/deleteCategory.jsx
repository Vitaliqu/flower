import {useContext} from 'react';
import styles from './deleteCategory.module.css';
import {deleteCategory, fetchCategory} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const DeleteCategory = observer(({setDelete, id}) => {
    const {flower} = useContext(Context)

    const handleDelete = async (id) => {
        setDelete(false)
        await deleteCategory(id)
        flower.setCategories(await fetchCategory());
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setDelete(false)}>&times;</span>
                <h2>Видалити категорію {flower.categories.find(element => element.id === id).name}</h2>
                <button onClick={() => handleDelete(id)}>Видалити</button>
            </div>
        </div>
    );
});

export default DeleteCategory;
