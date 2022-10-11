const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { // userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validations');

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.patch('/users/me', updateUserValidation, updateUser);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
