import { BASE_URL } from "./auth";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards(jwt) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        }
      }).then(this._checkResponse);
    }
  
    addCard({ name, link }, jwt) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then(this._checkResponse);
    }
  
    getUser() {
      return fetch(`${this._baseUrl}/users/me`, {
        credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    setUserInfo({ title, subtitle }, jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          name: title,
          about: subtitle,
        }),
      }).then(this._checkResponse);
    }


    setUserAvatar({ subtitle }, jwt) {
      return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        //credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          avatar: subtitle,
        }),
      }).then(this._checkResponse);
    }
  
    delete(id, jwt) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      }).then(this._checkResponse);
    }
  
   // like(id) {
   //   return fetch(this.baseUrl + `/cards/likes/${id}`, {
   //     method: "PUT",
   //     headers: this.headers,
   //   }).then(this._checkResponse);
   // }
  
   // dislike(id) {
   //   return fetch(this.baseUrl + `/cards/likes/${id}`, {
   //     method: "DELETE",
   //     headers: this.headers,
   //   }).then(this._checkResponse);
   // }

   changeLikeCardStatus(cardId, isLiked, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      //credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    })
      .then(res => this._checkResponse(res));
  }
  
    initialData() {
      return Promise.all([this.getInitialCards(), this.getUser()])
    }
  }
  
  const api = new Api({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  
  export default api;