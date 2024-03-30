import {useContext, useState} from 'react';
import styles from './editCategory.module.css';
import {createCategory, editCategory, fetchCategory} from "../http/flowerApi.jsx";
import {registration} from "../http/userApi.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const EditCategory = observer(({setEdit, id}) => {
    const {flower} = useContext(Context)
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [isPopular, setIsPopular] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNewChange = (e) => {
        setIsNew(e.target.checked);
    };

    const handlePopularChange = (e) => {
        setIsPopular(e.target.checked);
    };

    const handleSubmit = async (id) => {
        const categories = await fetchCategory();
        if (categories.find(element => element.name === name)) {
            alert("Категорія з такою назвою вже існує");
            return
        }
        const data = await fetchCategory()
        const oldImageResponse = await fetch(import.meta.env.VITE_API + "/" + data.find(element => element.id === id).image);
        const oldImageBlob = await oldImageResponse.blob();
        const formData = new FormData()

        formData.append("name", name ? name : categories.find(element => element.id === id).name)
        formData.append("image", image ? image : oldImageBlob)
        formData.append("isNew", isNew)
        formData.append("popular", isPopular)

        setEdit(false)

        await editCategory(id, formData)
        const updatedCategories = await fetchCategory();
        flower.setCategories(updatedCategories);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setEdit(false)}>&times;</span>
                <h2>Редагувати категорію</h2>
                <input type="text" placeholder="Назва" value={name} onChange={handleNameChange}/>
                <input type="file" accept="image/*" onChange={handleImageChange}/>
                <div className={styles.Wrapper}>
                    <p className={styles.Label}>Новинка</p>
                    <input type="checkbox" className={styles.checkbox} checked={isNew} onChange={handleNewChange}/>
                </div>
                <div className={styles.Wrapper}>
                    <p className={styles.Label}>Популярне</p>
                    <input type="checkbox" className={styles.checkbox} checked={isPopular}
                           onChange={handlePopularChange}/>
                </div>
                <button onClick={() => handleSubmit(id)}>Редагувати</button>
            </div>
        </div>
    );
});

export default EditCategory;
