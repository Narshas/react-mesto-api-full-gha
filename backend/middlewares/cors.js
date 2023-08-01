const allowedCors = [
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
  'localhost:3001',
  'http://narshas.students.nomoreparties.sbs',
  'https://narshas.students.nomoreparties.sbs',
  'http://api.narshas.students.nomoredomains.sbs',
  'https://api.narshas.students.nomoredomains.sbs',
];

const cors = (req, res, next) => {
  console.log(`ours req headers ${req.headers}`);
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = cors;
