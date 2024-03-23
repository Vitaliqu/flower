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
                <div className={styles.about}>
                    <p className={styles.aboutLabel}>Детальніше про нас</p>
                    <p className={styles.aboutText}>Ласкаво просимо до нашого квіткового магазину, де ми творимо магію
                        квітів і принесемо красу у ваше життя! У нашому закладі ви знайдете не лише найсвіжіші та
                        найкрасивіші квіти, але і особисте підход до кожного клієнта.Наша команда - це колектив
                        професіоналів, що з дбайливістю доглядає за кожним бутоном, надаючи вам найвищий рівень
                        обслуговування. </p>
                </div>
                <div className={styles.info}>
                    <p className={styles.infoLabel}>Зворотній Зв’язок</p>
                    <div className={styles.addressWrapper}>
                        <img src={address} alt="address"/>
                        <p className={styles.addressText}>Ужгород - вулиця Гленца, 1</p>
                    </div>
                    <div className={styles.phoneWrapper}>
                        <img src={phone} alt="phone"/>
                        <p className={styles.phoneText}>+380-123-456-789</p>
                    </div>
                    <div className={styles.faceBookWrapper}>
                        <img src={faceBook} alt={faceBook}/>
                        <p className={styles.faceBook}>Офіційна группа</p>
                    </div>
                    <div className={styles.mailWrapper}>
                        <img src={mail} alt="mail"/>
                        <p className={styles.mailText}>examole@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Footer