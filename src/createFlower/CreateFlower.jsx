import {useContext, useState} from 'react';
import styles from './CreateFlower.module.css';
import {createCategory, createFlower, fetchCategory, fetchFlower} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import Compressor from 'compressorjs';

const CreateFlower = ({setCreate}) => {
    const {flower} = useContext(Context)
    const [forceRender, setForceRender] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [categoryText, setCategoryText] = useState("Категорія");
    const [isNew, setIsNew] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    const [description, setDescription] = useState('');
    const [openCategory, setOpenCategory] = useState(false)
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
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
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
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
        if (isNaN(price) || price === '') {
            alert('Ціна повинна бути числом');
            return;
        }
        if (flower.flowers.find(element => element.name === name)) {
            alert("Категорія з такою назвою вже існує");
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("image", image)
        formData.append("price", price)
        formData.append("isNew", isNew)
        formData.append("popular", isPopular)
        formData.append("description", description.replaceAll("\n","<br/>"))
        !(categoryText === "Категорія" || categoryText === "Немає") ? formData.append("categoryId", flower.categories.find(element => element.name === categoryText).id) : null
        setCreate(false)
        await createFlower(formData)
        const fetchedFlower = await fetchFlower(flower.currentCategory, 1, flower.totalCount)
        flower.setFlowers(fetchedFlower.rows);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setCreate(false)}>&times;</span>
                <h2>Додати позицію</h2>
                <div className={styles.chouseCategory} onClick={() => setOpenCategory(!openCategory)}>{categoryText}
                    {openCategory &&
                        <ul className={styles.categoryList}>
                            <li onClick={() => {
                                setOpenCategory(false); // Set openCategory to false when clicking a category item
                                setCategoryText('Немає');
                            }}>
                                Немає
                            </li>
                            {flower.categories.map((element, id) => (
                                <li key={id} onClick={() => {
                                    setOpenCategory(false); // Set openCategory to false when clicking a category item
                                    setCategoryText(element.name);
                                }}>
                                    {element.name}
                                </li>
                            ))}
                        </ul>
                    }
                </div>

                <input type="text" placeholder="Назва" value={name} onChange={handleNameChange}/>
                <input type={'file'} accept={"image/jpeg"} onChange={handleImageChange}/>
                <input type="text" placeholder="Ціна" onChange={handlePriceChange}/>
                <textarea className={styles.description}  placeholder="Опис"
                       onChange={handleDescriptionChange}/>
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

export default CreateFlower;
