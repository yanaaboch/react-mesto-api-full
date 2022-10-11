import okIcon from '../images/ok-icon.png';
import failIcon from '../images/fail-icon.png';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
    return (
      <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" className="popup__close" onClick={onClose} />
          <img
            src={isSuccess ? okIcon : failIcon}
            alt={
              isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
            }
            className="popup__signup-icon"
          />
          <h3 className="popup__signup-title">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    );
  };
  
  export default InfoTooltip;