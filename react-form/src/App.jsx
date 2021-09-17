import React from 'react';
import style from './App.module.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'Язык',
            dissabledButton: 'disabled',
            isChecked: false,
            name: '',
            isNameError: false,
            email: '',
            isEmailError: false,
            tel: '',
            isTelError: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
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

    handleChangeField(event) {
        const type = event.target.type;
        const value = event.target.value;
        const format = FormatType[type];
        const stateName = StateNameType[type];
        const stateError = StateErrorType[type];
        let error = value ? false : true;

        if (type === 'tel') {
            error = value.length > 15;
        }

        if (type === 'email') {
            error = !format.test(value);
        }else if (!error) {
            for (let i = 0; i < value.length; i++) {
                let letter = value.charAt(i);

                if(!format.test(letter)){
                    error = true;
                    break;
                }
            }
        }
        
        const disValue = this.state.dissabledButton;
        let disabledButton = this.getDisableSubmitButton(error, disValue);

        if (disabledButton !== disValue) {
            this.setState({[stateName]: value, [stateError]: error, dissabledButton: disabledButton});
        }else {
            this.setState({[stateName]: value, [stateError]: error});
        }
        
    }

    getDisableSubmitButton(error, disValue) {
        let result = disValue;
        const isDissButton = result === 'disabled';
    
        if (isDissButton && !error) {
            result = '';
        }
    
        if (!isDissButton && error) {
            result = 'disabled';
        }
    
        return result;
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
                        <input type="text" placeholder="Введите ваше имя" value={this.state.name} onChange={this.handleChangeField}/>
                        <p className={this.state.isNameError ? '' : style.hidden}>Введено не корректное значение</p>
                    </label>
                    
                    <label className={style.label}>
                        Email
                        <input type="email" placeholder="Введите ваш email" value={this.state.email} onChange={this.handleChangeField}/>
                        <p className={this.state.isEmailError ? '' : style.hidden}>Введено не корректное значение</p>
                    </label>
                    
                    <label className={style.label}>
                        Номер телефона
                        <input type="tel" placeholder="Введите номер телефона" value={this.state.tel} onChange={this.handleChangeField}/>
                        <p className={this.state.isTelError ? '' : style.hidden}>Введено не корректное значение</p>
                    </label>
                    
                    <label className={style.label}>
                        Язык
                        <select value={this.state.language} onChange={this.handleChange}>
                            {languages.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                    </label>

                    <label className={style.checkbox}>
                        <input id={style.toggle} type="checkbox" checked={this.state.isChecked} onChange={this.handleChecked}/>
                        <div className={style.toggler} htmlFor='toggle'></div>
                        <p>Принимаю <a className={style.link} href='#'>условия</a> использования</p>
                    </label>

                    <input disabled={this.state.dissabledButton} className={style.btnSubmit} type="submit" value="Зарегистрироваться" />
                </form>
            </div>
        );
    }
}

const FormatType = {
    text: /[a-zA-Zа-яА-Я- ]/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    tel: /[0-9()-+]/,
}

const StateNameType = {
    text: 'name',
    email: 'email',
    tel: 'tel',
}

const StateErrorType = {
    text: 'isNameError',
    email: 'isEmailError',
    tel: 'isTelError',
}

export default App;