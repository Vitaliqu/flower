import {useContext, useState} from 'react';
import styles from './createCategory.module.css';
import {createCategory, fetchCategory} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import Compressor from 'compressorjs';

const CreateCategory = ({setCreate}) => {
    const {flower} = useContext(Context)
    const [forceRender, setForceRender] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [isPopular, setIsPopular] = useState(false);

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
        if (!name) {
            alert('Назва відсутня')
            return
        }
        if (!image) {
            alert('Фотографія не вибрана')
            return
        }
        if (flower.categories.find(element => element.name === name)) {
            alert("Категорія з такою назвою вже існує");
            return
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append("image", image)
        formData.append("isNew", isNew)
        formData.append("popular", isPopular)
        setCreate(false)
        await createCategory(formData)
        flower.setCategories(await fetchCategory());
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
            </div>
        </div>
    );
};

export default CreateCategory;
