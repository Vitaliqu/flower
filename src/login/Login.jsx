import React, {useContext, useState} from 'react';
import styles from './login.module.css';
import {login} from "../http/userApi.jsx";
import {Context} from "../main.jsx";
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.jsx";
import {observer} from "mobx-react-lite"

const Login = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleLogin = async () => {
        if (formData.email.trim() === '' || formData.password.trim() === '') {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        try {
            const data = await login(formData.email, formData.password);
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
            <h2 className={styles.loginLabel}>Вхід</h2>
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

                <button type="submit" onClick={handleLogin}>Увійти</button>
                <div className={styles.registerWrapper}>
                    <p className={styles.registerLabel}>Не зареєстровані?</p>
                    <Link className={styles.register} to={REGISTRATION_ROUTE}>Зареєструйтесь</Link>
                </div>
            </form>
        </div>
    );
});

export default Login;
