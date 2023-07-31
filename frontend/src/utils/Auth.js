class Auth {
    constructor(baseUrl){
        this._baseUrl = baseUrl;
    }

    _testRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register({ password, email }) {
        return fetch(`${this._baseUrl}/signup`, { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password, email})
        })
        .then(res => this._testRes(res))
    }

    authorizer({ password, email }) {
        return fetch(`${this._baseUrl}/signin`, { 
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password, email})
        })
        .then(res => this._testRes(res))
    }

    tokenCheck(currentToken) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${currentToken}`
            },
        })
        .then(res => this._testRes(res))
    }
}

// export const auth = new Auth('https://api.narshas.students.nomoredomains.sbs');
export const auth = new Auth('http://localhost:3000');
// export const auth = new Auth('https://auth.nomoreparties.co');