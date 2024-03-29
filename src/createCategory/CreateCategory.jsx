import {useContext, useState} from 'react';
import styles from './createCategory.module.css';
import {createCategory, fetchCategory} from "../http/flowerApi.jsx";
import {registration} from "../http/userApi.jsx";
import {Context} from "../main.jsx";

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
        setImage(e.target.files[0]);
    };

    const handleNewChange = (e) => {
        setIsNew(e.target.checked);
    };

    const handlePopularChange = (e) => {
        setIsPopular(e.target.checked);
    };

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("image", image)
        formData.append("isNew", isNew)
        formData.append("popular", isPopular)
        setCreate(false)
        await createCategory(formData)
        const updatedCategories = await fetchCategory();
        flower.setCategories(updatedCategories);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setCreate(false)}>&times;</span>
                <h2>Додати категорію</h2>
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
                <button onClick={handleSubmit}>Створити</button>
            </div>
        </div>
    );
};

export default CreateCategory;