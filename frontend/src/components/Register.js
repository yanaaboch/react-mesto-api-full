import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterData({
            ...registerData,
        [name]: value,
    });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister(registerData);
    };

    return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
        <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleChange}
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            min="8"
            placeholder="Пароль"
            value={registerData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
      <Link to="/sign-in" className="auth__login-hint">
        Уже зарегистрированы? Войти
      </Link>
    </>
    );
};

export default Register;