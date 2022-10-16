import { React, useForm } from 'react';


const Login = ({ onLogin }) => {
  const { enteredValues, handleChange } = useForm({});

  //const handleChange = (event) => {
  //  const { name, value } = event.target;
   // setLoginData({
   //     ...loginData,
   //   [name]: value,
    //});
  //};

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!enteredValues.email || !enteredValues.password) {
      return;
    }
    onLogin(enteredValues);
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
          value={enteredValues.email || ''}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"
          autoComplete="password"
          value={enteredValues.password || ''}
          onChange={handleChange}
          required
        />
            <button type="submit">Войти</button>
          </form>
        </div>
      );
  };
  
  export default Login;