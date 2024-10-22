import React, {useContext, useState} from 'react';
import styles from './createCategory.module.css';
import {createCategory, fetchCategory} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import Compressor from 'compressorjs';
import spinner from "../assets/kOnzy.gif";

const CreateCategory = ({setCreate}) => {
    const {flower} = useContext(Context)
    const [forceRender, setForceRender] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        new Compressor(image, {
            quality: 0.8,
            success: (compressedResult) => {
                setImage(compressedResult)
            },
        });
    };

    const handleNewChange = (e) => {
        setIsNew(e.target.checked);
    };

    const handlePopularChange = (e) => {
        setIsPopular(e.target.checked);
    };

    const handleSubmit = async () => {
        try {
            if (!name) {
                alert('Назва відсутня');
                return;
            }
            if (!image) {
                alert('Фотографія не вибрана');
                return;
            }
            if (flower.categories.some(category => category.name === name)) {
                alert('Категорія з такою назвою вже існує');
                return;
            }
            setIsLoading(true);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);
            formData.append('isNew', isNew);
            formData.append('popular', isPopular);

            await createCategory(formData);

            const updatedCategories = await fetchCategory();
            flower.setCategories(updatedCategories);
            setCreate(false);
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Помилка при створенні категорії. Спробуйте ще раз.');
        }
    };


    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setCreate(false)}>&times;</span>
                <h2>Додати категорію</h2>
                <input type="text" placeholder="Назва" value={name} onChange={handleNameChange}/>
                <input type={'file'} accept={"image/*"} onChange={handleImageChange}/>
                <div className={styles.Wrapper}>
                    <p className={styles.Label}>Новинка</p>
                    <input type="checkbox" className={styles.checkbox} checked={isNew} onChange={handleNewChange}/>
                </div>
                <div className={styles.Wrapper}>
                    <p className={styles.Label}>Популярне</p>
                    <input type="checkbox" className={styles.checkbox} checked={isPopular}
                           onChange={handlePopularChange}/>
                </div>
                <button onClick={handleSubmit}>Створити</button>
                {isLoading && <img className={styles.spinner} src={spinner} alt=""/>}
            </div>
        </div>
    );
};

export default CreateCategory;
