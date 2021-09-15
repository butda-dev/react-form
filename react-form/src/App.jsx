import React from 'react';
import style from './App.module.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Язык',
            isChecked: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChecked(event) {
        this.setState({isChecked: !this.state.isChecked});
    }
    
    handleSubmit(event) {
        alert('Завка отправлена!');
        event.preventDefault();
      }

  render() {
    
    const languages = [
        "Русский",
        "Английский",
        "Китайский",
        "Испанский",
    ];

    return (
        <div className={style.container}>
            <form className={style.content} onSubmit={this.handleSubmit}>
                <h1>Регистрация</h1>
                <span>Уже есть аккаунт? <a className={style.link} href='#'>Войти</a></span>
                
                <label className={style.label}>
                    Имя
                    <input type="text" defaultValue="Введите ваше имя" />
                </label>
                
                <label className={style.label}>
                    Email
                    <input type="email" defaultValue="Введите ваш email" />
                </label>
                
                <label className={style.label}>
                    Номер телефона
                    <input type="tel" defaultValue="Введите номер телефона" />
                </label>
                
                <label className={style.label}>
                    Язык
                    <select value={this.state.value} onChange={this.handleChange}>
                        {languages.map((item, index) => <option key={index} value={item}>{item}</option>)}
                    </select>
                </label>

                <label className={style.checkbox}>
                    <input id={style.toggle} type="checkbox" checked={this.state.isChecked} onChange={this.handleChecked}/>
                    <div className={style.toggler} htmlFor='toggle'></div>
                    <p>Принимаю <a className={style.link} href='#'>условия</a> использования</p>
                </label>

                <input type="submit" value="Зарегистрироваться" />
            </form>
        </div>
    );
  }
}

export default App;