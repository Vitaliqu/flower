import {useContext} from 'react';
import styles from './deleteFlower.module.css';
import {createFlower, deleteFlower, fetchFlower} from "../http/flowerApi.jsx";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const DeleteFlower = observer(({setDelete, id}) => {
    const {flower} = useContext(Context)

    const handleDelete = async (id) => {
        setDelete(false)
        await deleteFlower(id)
        const fetchedFlower = await fetchFlower(flower.currentCategory, 1, flower.totalCount)
        flower.setFlowers(fetchedFlower.rows)};

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={() => setDelete(false)}>&times;</span>
                <h2>Видалити позицію {flower.flowers.find(element => element.id === id).name}</h2>
                <button onClick={() => handleDelete(id)}>Видалити</button>
            </div>
        </div>
    );
});

export default DeleteFlower;
