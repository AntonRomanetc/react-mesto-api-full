const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../../config/config');

const nameAndAboutValidationRequirements = Joi.string().required().min(2).max(30);
const avatarValidationRequirements = Joi.string().required().regex(URL_REGEX);
const emailValidationRequirements = Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } });
const passwordValidationRequirements = Joi.string().required();
const idValidationRequirements = Joi.string().required().length(24).hex();

module.exports.validateUserRegData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEX),
    email: emailValidationRequirements,
    password: passwordValidationRequirements,
  }),
});

module.exports.validateUserAuthData = celebrate({
  body: Joi.object().keys({
    email: emailValidationRequirements,
    password: passwordValidationRequirements,
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: idValidationRequirements,
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: nameAndAboutValidationRequirements,
    about: nameAndAboutValidationRequirements,
  }),
});

module.exports.validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: avatarValidationRequirements,
  }),
});
