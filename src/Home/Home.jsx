import styles from "./Home.module.css"
import one from "../../public/1.png"
import two from "../../public/2.png"
import three from "../../public/3.png"
import four from "../../public/4.png"
import five from "../../public/5.png"
import six from "../../public/6.png"
import plant from "../assets/plant.png"

const flowers = [
    {name: "Магнолії", image: one},
    {name: "Ялина - Picea", image: two},
    {name: "Ялиці - Abies", image: three},
    {name: "Листяні кущі", image: four},
    {name: "Японські клени", image: five},
    {name: "Штамбові авойні рослини", image: six},
    {name: "Магнолії", image: one},
    {name: "Ялина - Picea", image: two},
    {name: "Ялиці - Abies", image: three},
    {name: "Листяні кущі", image: four},
    {name: "Японські клени", image: five},
    {name: "Штамбові авойні рослини", image: six},
]

const Home = () => {
    return <>
        <div className={styles.home}>
            <div className={styles.flowersCategory}>
                <div className={styles.categoryLabel}>
                    Категорії рослин
                    <img src={plant} alt="plant" className={styles.plant}/>
                </div>
                <div className={styles.categorySwitch}>
                    <div className={styles.all} style={{color: "white", backgroundColor: "#79A03F"}}>Всі</div>
                    <div className={styles.new}>Новинки</div>
                    <div className={styles.popular}>Популярні</div>
                </div>
            </div>
            <div className={styles.categoryGrid}>
                {flowers.map((element, index) => {
                    return <div className={styles.categoryCard} key={index}>
                        <div className={styles.imageHolder}><img className={styles.cardImage} src={element.image} alt="img"/>
                        </div>
                        <p className={styles.categoryName}>{element.name}</p>
                    </div>
                })}
            </div>
        </div>
    </>
}
export default Home