import styles from "./Footer.module.css"
import address from "../assets/address.png"
import phone from "../assets/phone.svg"
import faceBook from "../assets/facebook.svg";
import mail from "../assets/mail.png"

const Footer = () => {
    return <>
        <div id="footer" className={styles.footer}>
            <div className={styles.top}>
                <p className={styles.logoText}>Flower O`N</p>
                <p className={styles.logoLabel}>Садовий центр</p>
            </div>
            <div className={styles.main}>
                <div className={styles.infoWrapper}>
                    <div className={styles.about}>
                        <p className={styles.aboutLabel}>Детальніше про нас</p>
                        <p className={styles.aboutText}>Ласкаво просимо до нашого квіткового магазину, де ми творимо
                            магію
                            квітів і принесемо красу у ваше життя! У нашому закладі ви знайдете не лише найсвіжіші та
                            найкрасивіші квіти, але і особисте підход до кожного клієнта.Наша команда - це колектив
                            професіоналів, що з дбайливістю доглядає за кожним бутоном, надаючи вам найвищий рівень
                            обслуговування. </p>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.infoLabel}>Зворотній Зв’язок</p>
                        <div className={styles.addressWrapper}>
                            <img src={address} alt="address"/>
                            <p className={styles.addressText}>м.Хуст, об'їзна дорога, (біля кільця)</p>
                        </div>
                        <div className={styles.phoneWrapper}>
                            <img src={phone} alt="phone"/>
                            <p className={styles.phoneText}>+38-068-688-06-27</p>
                        </div>
                        <div className={styles.faceBookWrapper}>
                            <img src={faceBook} alt={faceBook}/>
                            <a className={styles.facebookLink}
                                href="https://www.facebook.com/groups/246459866644485/?locale=ru_RU" target={"_blank"}></a>
                            <p className={styles.faceBook}>Офіційна группа</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Footer