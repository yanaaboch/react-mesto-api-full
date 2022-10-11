import React from "react";


import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const {name, about, avatar} = React.useContext(CurrentUserContext);


    

  return (
        <main className="content">
            <section className="profile">
                <button className="profile__avatar-edit" onClick={props.onEditAvatar}>
                    <img className="profile__avatar" src={avatar}alt={`Фото аватар ${avatar}`} />
                </button>
                <div className="profile__info">
                    <div className="profile__text">
                        <h1 className="profile__title">{name}</h1>
                        <p className="profile__subtitle">{about}</p>
                    </div>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
              {props.cards.map((card) => {
                return <Card
                    key={card._id} 
                    card={card} onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    />
                })}  
                
            </section>
        </main>
  )
}
    

export default Main;