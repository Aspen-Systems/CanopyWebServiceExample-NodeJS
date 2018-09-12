const crypto = require('crypto');
const querystring = require('querystring');
const { URL } = require('url');

let config = {};

try {
  config = require('./config/config.json');
} catch (err) {
  throw new Error('A config is required to continue!');
}

const canopyConfig = config.canopy;
if (!canopyConfig) {
  throw new Error('A canopy config is required to continue!');
}

const SIG_TYPE = 'HMAC-SHA1';
const OAUTH_VERSION = '1.0';

const OAUTH_KEYS = {
  VERSION: 'oauth_version',
  NONCE: 'oauth_nonce',
  TIMESTAMP: 'oauth_timestamp',
  SIG_METHOD: 'oauth_signature_method',
  CONSUMER_KEY: 'oauth_consumer_key',
  TOKEN: 'oauth_token',
  SIGNATURE: 'oauth_signature'
};

const buildSignatureQueryParams = (url, timestamp, nonce) => {
  const urlBase = new URL(url);
  let query = '';
  if (urlBase.search) {
    query = urlBase.search.substring(1);
  }
  return querystring.stringify({
    ...querystring.parse(query),
    [OAUTH_KEYS.CONSUMER_KEY]: canopyConfig.consumerKey,
    [OAUTH_KEYS.NONCE]: nonce,
    [OAUTH_KEYS.SIG_METHOD]: SIG_TYPE,
    [OAUTH_KEYS.TIMESTAMP]: timestamp,
    [OAUTH_KEYS.TOKEN]: canopyConfig.accessToken,
    [OAUTH_KEYS.VERSION]: OAUTH_VERSION
  });
};

const getPort = (protocol, port) => {
  if (protocol.startsWith('http') && Number(port) === 80) {
    return ':80';
  }

  if (protocol.startsWith('https') && Number(port) === 443) {
    return ':443';
  }

  return '';
}

const generateSignature = (_url, httpMethod, timestamp, nonce) => {
  const key = `${encodeURIComponent(canopyConfig.consumerSecret)}&${encodeURIComponent(canopyConfig.tokenSecret)}`;
  const requestParams = buildSignatureQueryParams(_url, timestamp, nonce);

  const url = new URL(_url);
  const normalizedUrl = `${url.protocol}//${url.hostname}${getPort(url.protocol, url.port)}${url.pathname}`;
  const signature = `${httpMethod.toUpperCase()}&${encodeURIComponent(normalizedUrl)}&${encodeURIComponent(requestParams)}`;
  const keyBuffer = Buffer.from(key, 'utf8');
  const hmac = crypto.createHmac('sha1', keyBuffer);
  hmac.update(signature);
  return hmac.digest('base64');
};

const appendSignatureToUrl = (url, httpMethod) => {
  const nonce = Math.floor(Math.random() * 10000000) + 1;
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const query = buildSignatureQueryParams(url, timestamp, nonce);
  const urlBase = new URL(url);
  urlBase.search = query;
  const signature = generateSignature(urlBase.toString(), httpMethod, timestamp, nonce);
  urlBase.search = `${query}&${OAUTH_KEYS.SIGNATURE}=${encodeURIComponent(signature)}`;
  return urlBase.toString();
}

module.exports = appendSignatureToUrl;
