const express = require('express');
const axios = require('axios');

const router = express.Router();

const baseURL = "https://api.yelp.com/v3/businesses/search";
const apikey = process.env.YELP_API_KEY;

router.get('/', (req, res) => { res.status(200).end(); });

module.exports = router;
