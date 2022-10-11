import { useState } from 'react';


const Login = ({ onLogin }) => {
    const [loginData, setLoginData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
        ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData);
  };
    return (
        <div className="auth">
          <h2 className="auth__title">Вход</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          value={loginData.email || ''}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          minLength="8"
          placeholder="Пароль"
          name="password"
          id="password"
          autoComplete="password"
          value={loginData.password || ''}
          onChange={handleChange}
          required
        />
            <button type="submit">Войти</button>
          </form>
        </div>
      );
  };
  
  export default Login;