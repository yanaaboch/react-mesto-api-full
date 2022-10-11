class Api {
    constructor({ baseUrl, headers }) {
      this.baseUrl = baseUrl;
      this.headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(this.baseUrl + "/cards", {
        headers: this.headers,
      }).then(this._checkResponse);
    }
  
    addCard({ name, link }) {
      return fetch(this.baseUrl + "/cards", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      })
      .then(this._checkResponse);
    }
  
    getUser() {
      return fetch(this.baseUrl + "/users/me", {
        headers: this.headers,
      }).then(this._checkResponse);
    }
  
    setUserInfo({ title, subtitle }) {
      return fetch(this.baseUrl + "/users/me", {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: title,
          about: subtitle,
        }),
      }).then(this._checkResponse);
    }


    setUserAvatar({ subtitle }) {
      return fetch(this.baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: subtitle,
        }),
      }).then(this._checkResponse);
    }
  
    delete(id) {
      return fetch(this.baseUrl + `/cards/${id}`, {
        method: "DELETE",
        headers: this.headers,
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
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this.headers
    })
      .then(res => this._checkResponse(res));
  }
  
    initialData() {
      return Promise.all([this.getInitialCards(), this.getUser()])
    }
  }
  
  const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
    headers: {
      authorization: "4e5f3876-9ff7-4342-831e-4075e38e0477",
      "Content-Type": "application/json",
    },
  });
  
  export default api;