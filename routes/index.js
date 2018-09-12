const axios = require('axios');
const express = require('express');
const router = express.Router();

const oauthUrl = require('../oauth');
const config = require('../config/config.json').canopy;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Order Delivery Status' , order: req.query.order });
});

router.post('/updatedelivery', async (req, res) => {
  const url = oauthUrl(`${config.serverUrl}ModifyOrder`, 'POST');
  const {
    ordernumber,
    delivered
  } = req.body;

  const orderInfo = [
    {
      orderNumber: ordernumber,
      headerFields: [
        {
          fieldName: "DeliveryFlag",
          value: (delivered === "on" ? 1 : 0) + ""
        }
      ]
    }
  ];
  await axios({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    data: orderInfo
  });
  res.redirect('/?order=' + ordernumber);
});

module.exports = router;
