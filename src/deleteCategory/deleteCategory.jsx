import {useContext} from 'react';
import styles from './deleteCategory.module.css';
import {deleteCategory, editFlower, fetchCategory, fetchFlower} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const DeleteCategory = observer(({setDelete, id}) => {
    const {flower} = useContext(Context)

    const handleDelete = async (id) => {
        setDelete(false)
        const flowers = await fetchFlower(id, 1, 10000000, null)
        flowers.rows.forEach(async element => {
            const oldImageResponse = await fetch(import.meta.env.VITE_API + "/" + flower.flowers.find(element => element.id === element.id).image);
            const oldImageBlob = await oldImageResponse.blob();
            const formData = new FormData()
            formData.append("name", element.name)
            formData.append("image", oldImageBlob)
            formData.append("price", element.price)
            formData.append("isNew", element.isNew)
            formData.append("popular", element.popular)
            formData.append("description", element.description.replaceAll("\n", "<br/>"))
            formData.append("categoryId", 'null')
            await editFlower(element.id, formData)
        })
        await deleteCategory(id)
        flower.setCategories(await fetchCategory())
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
