import React from "react";
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';



function App() {
const [isLoggedIn, setIsLoggedIn] = React.useState(false);
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({});
const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
});
const [cards, setCards] = React.useState([]);
const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
const [authorizationEmail, setAuthorizationEmail] = React.useState('');
const history = useHistory();

//React.useEffect(() => {
//    api
//      .getInitialCards()
//      .then((data) => {
//        setCards(data);
 //     })
 //     .catch((err) => {
 //       console.log(`Ошибка: ${err}`);
 //     });
//}, []);

//React.useEffect(() => {
 //   api
 //     .getUser()
  //    .then((data) => {
  //      setCurrentUser(data);
  //      setAuthorizationEmail(data.email)
  //    })
  //    .catch((err) => {
  //      console.log(`Ошибка: ${err}`);
  //    });
//}, []);

React.useEffect(() => {
  tokenCheck()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [history])


function handleCardLike(card) {
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const jwt = localStorage.getItem('jwt');
    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
}

function handleCardDelete(cardId) {
  const jwt = localStorage.getItem('jwt');
    api.delete(cardId, jwt)
    .then(() => {
      setCards((cards) => cards.filter(card => card._id !== cardId));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

function handleEditProfilePopupOpen() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen)
}

function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
}

function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
}

const handleCardClick = card => {
    setSelectedCard(card);
    setIsInfoTooltipOpen(false);
};

const handleUpdateUser = (newUserInfo) => {
  const jwt = localStorage.getItem('jwt');
    api.setUserInfo(newUserInfo, jwt)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const handleUpdateAvatar = (data) => {
  const jwt = localStorage.getItem('jwt');
    api.setUserAvatar(data, jwt)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const handleAddPlaceSubmit = (newData) => {
  const jwt = localStorage.getItem('jwt');
    api.addCard(newData, jwt)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const handleInfoTooltip = () => {
  setIsInfoTooltipOpen(!isInfoTooltipOpen);
};

function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
}

const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

React.useEffect(() => {
  function closeByEscape(evt) {
    if(evt.key === 'Escape') {
      closeAllPopups();
    }
  }
  if(isOpen) {
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }
}, [isOpen]) 


  const handleRegistration = (data) => {
    return auth
      .register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
      })
      .finally(() => {
        handleInfoTooltip();
      });
  };

  const handleAuthorization = (data) => {
    return auth
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        tokenCheck();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
        setIsRegistrationSuccessful(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/signin');
    setIsLoggedIn(false);
    setCurrentUser({});
    setAuthorizationEmail('');
  };


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setAuthorizationEmail(data.email);
        setCurrentUser(data);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
      api
      .getInitialCards(jwt)
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
        <Header loggedIn={isLoggedIn} userEmail={authorizationEmail} onSignOut={handleSignOut} />
        <Switch>
          <Route path="/signin">
            <Login onLogin={handleAuthorization} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegistration} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccessful}
        />    
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
     
     </CurrentUserContext.Provider>
  );
}

export default App;
