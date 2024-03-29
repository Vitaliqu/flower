import {useContext, useState} from 'react';
import styles from './deleteCategory.module.css';
import {createCategory, deleteCategory, editCategory, fetchCategory} from "../http/flowerApi.jsx";
import {registration} from "../http/userApi.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const DeleteCategory = observer(({setDelete, id}) => {
    const {flower} = useContext(Context)

    const handleDelete = async (id) => {
        setDelete(false)
        await deleteCategory(id)
        const updatedCategories = await fetchCategory();
        flower.setCategories(updatedCategories);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setDelete(false)}>&times;</span>
                <h2>Видалити категорію</h2>
                <button onClick={() => handleDelete(id)}>Видалити</button>
            </div>
        </div>
    );
});

export default DeleteCategory;
