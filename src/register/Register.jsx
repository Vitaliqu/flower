import React, {useContext, useState} from 'react';
import styles from './register.module.css';
import {registration} from "../http/userApi.jsx";
import {Context} from "../main.jsx";
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE} from "../utils/consts.jsx";
import {observer} from "mobx-react-lite"

const Registration = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleRegistration = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Паролі не співпадають')
            return
        }
        if (formData.password.length < 8) {
            alert('Пароль повинен містити принаймні 8 символів');
            return;
        }

        if (formData.email.trim() === '' || formData.password.trim() === '' || formData.confirmPassword.trim() === '') {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        try {
            const data = await registration(formData.email, formData.password);
            if(data.role ==="ADMIN") user._isAdmin = true
            user.setUser(user)
            user._isAuth = true
            navigate(HOME_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.registerLabel}>Реєстрація</h2>
            <form>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    className={styles.password}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    className={styles.passwordConfirm}
                    type="password"
                    name="confirmPassword"
                    placeholder="Підтвердіть пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit" onClick={handleRegistration}>Створити акаунт</button>
                <div className={styles.loginWrapper}>
                    <p className={styles.loginLabel}>Вже зареєстровані?</p>
                    <Link className={styles.login} to={LOGIN_ROUTE}>Увійдіть</Link>
                </div>
            </form>
        </div>
    );
});

export default Registration
