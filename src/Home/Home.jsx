import styles from "./Home.module.css"
import one from "../../public/1.png"
import two from "../../public/2.png"
import three from "../../public/3.png"
import four from "../../public/4.png"
import five from "../../public/5.png"
import six from "../../public/6.png"
import plant from "../assets/plant.png"
import {Link} from "react-router-dom";
import {HOME_ROUTE, NEW_ROUTE, POPULAR_ROUTE} from "../utils/consts.jsx";

let flowers = [
    {name: "Магнолії", image: one, new: false, popular: true},
    {name: "Ялина - Picea", image: two, new: true, popular: true},
    {name: "Ялиці - Abies", image: three, new: true, popular: true},
    {name: "Листяні кущі", image: four, new: false, popular: false},
    {name: "Японські клени", image: five, new: false, popular: false},
    {name: "Штамбові авойні рослини", image: six, new: false, popular: true},
    {name: "Магнолії", image: one, new: true, popular: false},
    {name: "Ялина - Picea", image: two, new: true, popular: true},
    {name: "Ялиці - Abies", image: three, new: true, popular: false},
    {name: "Листяні кущі", image: four, new: true, popular: false},
    {name: "Японські клени", image: five, new: false, popular: false},
    {name: "Штамбові авойні рослини", image: six, new: false, popular: false},
]

const Home = (filter) => {
    const active = {color: "white", backgroundColor: "#79A03F"}
    return <>
        <div className={styles.home}>
            <div className={styles.flowersCategory}>
                <div className={styles.categoryLabel}>
                    Категорії рослин
                    <img src={plant} alt="plant" className={styles.plant}/>
                </div>
                <div className={styles.categorySwitch}>
                    <div className={styles.all}
                         style={filter.filter === "all" ? active : {}}>
                        <Link to={HOME_ROUTE}/>Всі
                    </div>
                    <div className={styles.new}
                         style={filter.filter === "new" ? active : {}}>
                        <Link to={NEW_ROUTE}/>Новинки
                    </div>
                    <div className={styles.popular}
                         style={filter.filter === "popular" ? active : {}}>
                        <Link to={POPULAR_ROUTE}/>Популярні
                    </div>
                </div>
            </div>
            <div className={styles.categoryGrid}>
                {flowers.filter(element => filter.filter=== "all" ? true : element[filter.filter])
                    .map((element, index) => (
                        <div className={styles.categoryCard} key={index}>
                            <div className={styles.imageHolder}>
                                <img className={styles.cardImage} src={element.image} alt="img" />
                            </div>
                            <p className={styles.categoryName}>{element.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    </>
}
export default Home