export class Api {
    constructor(settings) {
        this._baseUrl = settings.baseUrl;
        this._headers = settings.headers;
    }

    _testRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => this._testRes(res))
    }

    getDefoltElements() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => this._testRes(res))
    }

    postNewCard(cardInfo) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.name,
                link: cardInfo.link
            })
        })
            .then(res => this._testRes(res))
    }

    deleteCard(cardData) {
        return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._testRes(res))
    }

    patchUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(res => this._testRes(res))
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                        method: 'PUT',
                        headers: this._headers
                    })
                        .then(res => this._testRes(res))
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                        method: 'DELETE',
                        headers: this._headers
                    })
                        .then(res => this._testRes(res))
        }
    }

    patchAvatar(avatarData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarData.avatar
            })
        })
            .then(res => this._testRes(res))
    }
}



