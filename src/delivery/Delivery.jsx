import styles from "./Delivery.module.css"

const Delivery = () => {
    return (
        <>
            <div className={styles.delivery}>
                <div className={styles.deliveryTitle}>
                    Доставка
                </div>
                <div className={styles.deliveryText}>
                    Доставка замовлень в Україні здійснюється через перевізника «Нова Пошта». Відправлення замовлень
                    відбувається протягом 1-5 робочих днів після оплати замовлення в порядку черги. Важливо зазначити,
                    що в періоди активної сезонної посадки (березень-травень та вересень-жовтень) терміни доставки
                    можуть збільшуватися до 12 робочих днів через великий обсяг замовлень.<br/><br/>

                    У випадку збільшення термінів поставки, ваш менеджер обов'язково повідомить вас про це.<br/><br/>

                    Рекламації щодо товару приймаються протягом 7 днів з моменту отримання. Для цього потрібно надіслати
                    на електронну адресу фото з непридатними на вашу думку рослинами та зазначити номер вашого
                    замовлення.<br/><br/>

                    Усі питання щодо повернення і рекламації приймаються виключно на електронну адресу.<br/><br/>

                    Після розгляду фото з вами зв'яжеться ваш менеджер і повідомить про можливість заміни
                    товару.<br/><br/>

                    Товар, який перебував у вас більше 3 місяців, НЕ ПІДЛЯГАЄ ЗАМІНІ.<br/><br/>
                </div>
            </div>
        </>
    )
}

export default Delivery