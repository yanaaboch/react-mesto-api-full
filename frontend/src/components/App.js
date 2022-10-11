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

React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
}, []);

React.useEffect(() => {
    api
      .getUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
}, []);

function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
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
    api.delete(cardId)
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
    api.setUserInfo(newUserInfo)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const handleAddPlaceSubmit = (newData) => {
    api.addCard(newData)
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
      .then((data) => {
        setIsRegistrationSuccessful(true);
        history.push('/sign-in');
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
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
      });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  };


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setAuthorizationEmail(data.data.email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
        <Header loggedIn={isLoggedIn} userEmail={authorizationEmail} onSignOut={handleSignOut} />
        <Switch>
          <Route path="/sign-in">
            <Login onLogin={handleAuthorization} />
          </Route>
          <Route path="/sign-up">
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
