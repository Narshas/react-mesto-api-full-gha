import React from "react";

export function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (e) => {setEmail(e.target.value)};
    const handlePasswordChange = (e) => {setPassword(e.target.value)};

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin({password, email});
        // setPassword('');
        // setEmail('');
    }

    

    return (
        <div className="authorize">
            <div className="authorize__container">
                <h1 className="authorize__title">Вход</h1>
                <form className="authorize__form" onSubmit={handleSubmit}>
                    
                    <input className="authorize__input" onChange={handleEmailChange}
                    id="email" type="email" name="email" required value={email || ''}
                    placeholder="Email"/>
                
                    
                    <input className="authorize__input" onChange={handlePasswordChange}
                    id="password" type="password" name="password" required 
                    value={password || ''} placeholder="Пароль"/>
                
                    <button className="authorize__submit" type="submit" aria-label="Войти"
                    disabled={props.isNotAvailable}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}