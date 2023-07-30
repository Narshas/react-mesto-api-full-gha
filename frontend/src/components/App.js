import React from "react";
import { useNavigate, Route, Routes } from 'react-router-dom';

import { ImagePopup } from "./ImagePopup";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { api } from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { DeletePlacePopup } from "./DeletePlacePopup";

import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { Register } from "./Register";
import { auth } from "../utils/Auth";
import { InfoTooltip } from "./InfoTooltip";
import { Api } from "../utils/Api";



export function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isZoomPopupOpen, setIsZoomPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [email, setEmail] = React.useState('email@yandex.ru');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [confirmedDelete, setConfirmedDelete] = React.useState(null);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = React.useState(false);

  const isAnyPopupOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen 
  || isAddPlacePopupOpen || infoTooltipOpen || selectedCard || isPopupDeleteOpen

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    console.log("avatar click")
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  const handleCardClick = (element) => {
    setSelectedCard(element);
    setIsZoomPopupOpen(true);
  }

  const handleDeleteClick = (card) => {
    setIsPopupDeleteOpen(true);
    setConfirmedDelete(card);
    console.log(card);
  }
  
  const handleConfirmDeleteCard = () => {
    api.deleteCard(confirmedDelete)
      .then(() => {
        setCards((cards) => cards.filter((c) => c !== confirmedDelete));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
    

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.patchUserInfo(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);
    api.patchAvatar(avatarData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  }

  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true);
    api.postNewCard(cardInfo)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsZoomPopupOpen(false);
    setInfoTooltipOpen(false);
    //setSelectedCard(null);
    setConfirmedDelete(null);
    setIsPopupDeleteOpen(false);

  }

  //=================
  const navigate = useNavigate();

  const api = new Api({
    //baseUrl: 'https://api.narshas.students.nomoredomains.sbs',
    baseUrl: 'http://localhost:3001',
    //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
        //authorization: '6891c063-8435-431b-87d5-a0d9903b0e56',
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
})

  const handleLogin = ({password, email}) => {
    auth.authorizer({password, email})
      .then((res) => {
          localStorage.setItem('token', res.token);
          setEmail(email);
          setPassword(password);
          setLoggedIn(true);
          navigate('/', {replace: true});
          console.log(res.token);
      })
      .catch((err) => {
        console.log(`we've got a problem: ${err}`);
        setInfoTooltipOpen(true);
        setIsError(true);
      })
  }

  const handleRegister = (password, email) => {

    auth.register({password, email})
      .then(() => {
        setInfoTooltipOpen(true);
        setIsError(false);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(`we've got a problem: ${err}`);
        setInfoTooltipOpen(true);
        setIsError(true);
      })
      
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', {replace: true});
  }

  const handleOverlayClick = (e) => {
    console.log('click overlay')
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
    console.log('click overlay')
  }

  React.useEffect(() => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      auth.tokenCheck(currentToken)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          //setEmail(res.data.email);
          navigate("/", {replace: true});
        })
        .catch((err) => {
          console.log(`we've got a problem: ${err}`);
          setInfoTooltipOpen(true);
          setIsError(true);
        })
    } 
  }, [])

  React.useEffect(() => {
    function closeByEsc(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isAnyPopupOpen) {
      document.addEventListener('keyup', closeByEsc);
      return () => {
        document.removeEventListener('keyup', closeByEsc)
      }
    }
  }, [isAnyPopupOpen])

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
   
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getDefoltElements()
        .then((res) => {
            setCards(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }
  }, [loggedIn]);

  // React.useEffect(() => {
  //   setEmail('');
  //   setPassword('');
  // }, []);

  return (
    
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        
        <Header email={email} handleLogout={handleLogout}/>
          
        <Routes>

          <Route path="/" element={
            <>
              <ProtectedRoute element={Main}
                loggedIn={loggedIn}   
                cards={cards} 
                onEditProfile={handleEditProfileClick} 
                onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} 
                onCardClick={handleCardClick} 
                onCardLike={handleCardLike} 
                onCardDelete={handleDeleteClick}
                onClose={closeAllPopups}

              />
            </>
          }/>

          <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            
          <Route path ="/sign-up" element={<Register handleRegister={handleRegister} />} />
          
        </Routes>
        <InfoTooltip
          isOpen = {infoTooltipOpen}
          onClose = {closeAllPopups}
          isError = {isError}
          onOverlayClick={handleOverlayClick}
        />
        <ImagePopup 
          cardData={selectedCard} 
          onClose={closeAllPopups} 
          isOpen={isZoomPopupOpen} 
          onOverlayClick={handleOverlayClick}/>

        <EditAvatarPopup 
          isLoading={isLoading} 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleOverlayClick}/>

        <EditProfilePopup 
          isLoading={isLoading} 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          onOverlayClick={handleOverlayClick}/>

        <AddPlacePopup 
          isLoading={isLoading} 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClick={handleOverlayClick}/>

        <DeletePlacePopup
          isOpen={isPopupDeleteOpen}
          onClose={closeAllPopups}
          onConfirmDeleteCard={handleConfirmDeleteCard}
          onOverlayClick={handleOverlayClick}
        />
        <Footer />
      </div> 
    </CurrentUserContext.Provider> 
    
  );
}