import { BASE_URL } from "./auth";

class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(this._baseUrl + "/cards", {
        //credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    addCard({ name, link }) {
      return fetch(this._baseUrl + "/cards", {
        method: "POST",
        //credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then(this._checkResponse);
    }
  
    getUser() {
      return fetch(this._baseUrl + "/users/me", {
        //credentials: 'include',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    setUserInfo({ title, subtitle }) {
      return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        //credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          name: title,
          about: subtitle,
        }),
      }).then(this._checkResponse);
    }


    setUserAvatar({ subtitle }) {
      return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        //credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
          avatar: subtitle,
        }),
      }).then(this._checkResponse);
    }
  
    delete(id) {
      return fetch(this._baseUrl + `/cards/${id}`, {
        method: "DELETE",
        //credentials: 'include',
        headers: this._headers,
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

   changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      //credentials: 'include',
      headers: this._headers
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