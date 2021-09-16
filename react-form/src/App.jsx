import React from 'react';
import style from './App.module.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'Язык',
            submitButton: 'disabled',
            isChecked: false,
            name: '',
            nameError: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleChange(event) {
        this.setState({language: event.target.value});
    }

    handleChecked(event) {
        this.setState({isChecked: !this.state.isChecked});
    }
    
    handleSubmit(event) {
        alert('Завка отправлена!');
        event.preventDefault();
    }

    handleChangeName(event) {
        const name = event.target.value;
        let error = false;

        for (let i = 0; i < name.length; i++) {
            let letter = name.charAt(i);

            if(!isNaN(parseInt(letter)) && isFinite(letter)){
                error = true;
                break;
            }
        }

        this.setState({name: name, nameError: error});
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
                        <input type="text" placeholder="Введите ваше имя" value={this.state.name} onChange={this.handleChangeName}/>
                        <p className={this.state.nameError ? "" : style.hidden}>Введено не корректное значение</p>
                    </label>
                    
                    <label className={style.label}>
                        Email
                        <input type="email" placeholder="Введите ваш email" />
                        <p>Введено не корректное значение</p>
                    </label>
                    
                    <label className={style.label}>
                        Номер телефона
                        <input type="tel" placeholder="Введите номер телефона" />
                        <p>Введено не корректное значение</p>
                    </label>
                    
                    <label className={style.label}>
                        Язык
                        <select defaultValue="Язык" onChange={this.handleChange}>
                            {languages.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </label>

                    <label className={style.checkbox}>
                        <input id={style.toggle} type="checkbox" checked={this.state.isChecked} onChange={this.handleChecked}/>
                        <div className={style.toggler} htmlFor='toggle'></div>
                        <p>Принимаю <a className={style.link} href='#'>условия</a> использования</p>
                    </label>

                    <input disabled={this.state.submitButton} className={style.btnSubmit} type="submit" value="Зарегистрироваться" />
                </form>
            </div>
        );
    }
}

export default App;