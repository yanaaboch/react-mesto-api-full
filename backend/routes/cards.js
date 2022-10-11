const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  cardIdValidation,
} = require('../middlewares/validations');

router.get('/cards', getCards);

router.delete('/cards/:cardId', cardIdValidation, deleteCard);

router.post('/cards', createCardValidation, createCard);

router.put('/cards/:cardId/likes', cardIdValidation, likeCard);

router.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
