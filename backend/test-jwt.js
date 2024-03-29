const jwt = require('jsonwebtoken');

const YOUR_JWT = 'e8c772b374177571180cb4f0c007ee77e6c2634b782e6c7eb13a5036e3e9ff33';
const SECRET_KEY_DEV = 'some-secret-key';

module.exports.testJwt = (next) => {
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);

    console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
    return next(err);
  }
  return next();
};
