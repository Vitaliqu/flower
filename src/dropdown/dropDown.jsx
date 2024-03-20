import styles from './dropDown.module.css'

const DropDown = (isOpened) => {
    return <div className={styles.dropDownMenu} style={isOpened.isOpened ? {width: "200px"} : {}}>
        <ul className={styles.dropDownList}>
            <li style={{backgroundColor: "#79A03F", color: "white"}}>Головна</li>
            <li>Каталог</li>
            <li>Доставка</li>
            <li>Відгуки</li>
            <li>Детальніше</li>
        </ul>
    </div>
}

export default DropDown