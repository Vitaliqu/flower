import {useContext, useState} from 'react';
import styles from './editCategory.module.css';
import {editCategory, fetchCategory} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const EditCategory = observer(({setEdit, id}) => {
    const {flower} = useContext(Context)
    const currentCategory = flower.categories.find(element => element.id === id)
    const [name, setName] = useState(currentCategory.name);
    const [image, setImage] = useState(null);
    const [isNew, setIsNew] = useState(currentCategory.isNew);
    const [isPopular, setIsPopular] = useState(currentCategory.popular);
    console.log(currentCategory.name)
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
        if (flower.categories.find(element => element.name === name) && !(currentCategory.name === name)) {
            alert("Категорія з такою назвою вже існує");
            return
        }
        const oldImageResponse = await fetch(import.meta.env.VITE_API + "/" + flower.categories.find(element => element.id === id).image);
        const oldImageBlob = await oldImageResponse.blob();

        const formData = new FormData()
        formData.append("name", name)
        formData.append("image", image ? image : oldImageBlob)
        formData.append("isNew", isNew)
        formData.append("popular", isPopular)

        setEdit(false)

        await editCategory(id, formData)

        flower.setCategories(await fetchCategory());
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
