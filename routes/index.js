const axios = require('axios');
const express = require('express');
const router = express.Router();

const oauth = require('../oauth');
const config = require('../config/config.json').canopy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', async (req, res, next) => {
  const url = oauth.appendSignatureToUrl(`${config.serverUrl}ModifyOrder`, 'POST');
  const orderInfo = [
    {
      orderNumber: 13872,
      headerFields: [
        {
          fieldName: "DeliveryFlag",
          value: "2"
        }
      ]
    }
  ];
  const response = await axios({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    data: orderInfo
  });
  res.send('You did it: ' + response.data);
});

module.exports = router;
