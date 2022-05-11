const express = require('express');
const axios = require('axios');

const router = express.Router();

const baseURL = "https://api.yelp.com/v3/businesses/search";
const apiKey = process.env.YELP_API_KEY || require(`${SERVER.path}/api.json`).apikey;
const reg = /-?([0-9]+).([0-9]+)/g;

/* Optional Parameters */
const DEFAULT = {
  term: "restaurant",
  openNow: 'true',
  radius: 5,
  additionalResults: 'false'
};

const endpointInformation = {
  "/": {
    requiredParameters: null,
    optionalParameters: null,
    response: "JSON Object with available API Version 2 Endpoints"
  },
  random: {
    requiredParameters: {
      'lat': 'Standard ISO6709 +- Decimal Representation of Latitude',
      'long': 'Standard ISO6709 +- Decimal Representation of Longitude'
    },
    optionalParameters: {
      'term': 'Yelp API Term for Restaurant, Defaults to "Restaurant"',
      'openNow': 'True/False, Defaults to True',
      'radius': 'Integer in Miles, Defaults to 5',
      'additionalResults': 'True/False, Defaults to False'
    },
    response: {
      'business': 'Random Business conforming to parameters',
      'additionalBusinesses': 'List of up to 4 additional businesses conforming to parameters; null if additionalResults is false'
    }
  }
}


router.get('/', (req, res) => { /* Available Endpoints */ return res.status(200).json(endpointInformation); });

router.get('/jumble', async (req, res) => {

  /* Check if required parameters have been left blank */
  if (typeof req.query.lat === 'undefined') { return res.status(400).send('Parameter: LATITUDE cannot be left blank'); }
  if (typeof req.query.long === 'undefined') { return res.status(400).send('Parameter: LONGITUDE cannot be left blank'); }

  /* Assign parameters to variables, using defaults as necessary for optional parameters */
  let latitude = req.query.lat;
  let longitude = req.query.long;
  let term = req.query.term || DEFAULT.term;
  let openNow = req.query.openNow || DEFAULT.openNow;
  let radius = req.query.radius || DEFAULT.radius; radius *= 1609;
  let additionalResults = req.query.additionalResults || DEFAULT.additionalResults;

  /* Check for incorrectly formatted variables */
  if (!(latitude.match(reg))) { return res.status(400).send('Invalid Parameter: LATITUDE'); }
  if (!(longitude.match(reg))) { return res.status(400).send('Invalid Parameter: LONGITUDE'); }

  /* Construct yelp request and send to Yelp API */
  let yelpRequest = `${baseURL}?term=${term}&radius=${radius}&open_now=${openNow}&latitude=${latitude}&longitude=${longitude}`;
  let yelpResponse = await axios.get(yelpRequest, { headers: { 'Authorization': `Bearer ${apiKey}` }}).catch(err => {
    console.log(err); res.status(500).end();
  });

  /* Results Object */
  let results = new Object();

  /* Select random business */
  let randIndex = Math.floor(Math.random() * yelpResponse.data.businesses.length);
  let business = yelpResponse.data.businesses[randIndex];

  /* Make yelp response data human readable */
  let businessAddress = `${business.location.display_address.join(", ")}`;
  let destinationCoordinates = `${business.coordinates.latitude},${business.coordinates.longitude}`;
  let originCoordinates = `${latitude},${longitude}`;
  let mapsURL = `https://www.google.com/maps/dir/?api=1&origin=${originCoordinates}&destination=${destinationCoordinates}`;

  /* Pipe results into GrumbleJumble frontend format */
  var data = new Object();
  data.name = business.name;
  data.image_url = business.image_url;
  data.category = business.categories[0].title;
  data.rating = business.rating;
  data.price = business.price;
  data.address = businessAddress;
  data.addressLink = mapsURL;
  data.yelpLink = business.url;
  data.phone = business.display_phone;
  data.distance = metersToMiles(business.distance);

  /* Add random business to results */
  results.business = data;

  if (additionalResults === 'true') {

    results.additionalBusinesses = [];
    additionalBusinessCount = 0;

    for (let additionalBusiness of yelpResponse.data.businesses) {

      if (!(additionalBusinessCount < 4)) break;
      if (additionalBusiness.id === business.id) continue;

      let additionalBusinessAddress = `${additionalBusiness.location.display_address.join(", ")}`;
      let additionalBusinessDestinationCoordinates = `${additionalBusiness.coordinates.latitude},${additionalBusiness.coordinates.longitude}`;
      let additionalBusinessOriginCoordinates = `${latitude},${longitude}`;
      let additionalBusinessMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${additionalBusinessOriginCoordinates}&destination=${additionalBusinessDestinationCoordinates}`;

      var additionalBusinessData = new Object();
      additionalBusinessData.name = additionalBusiness.name;
      additionalBusinessData.image_url = additionalBusiness.image_url;
      additionalBusinessData.category = additionalBusiness.categories[0].title;
      additionalBusinessData.rating = additionalBusiness.rating;
      additionalBusinessData.price = additionalBusiness.price;
      additionalBusinessData.address = additionalBusinessAddress;
      additionalBusinessData.addressLink = additionalBusinessMapsURL;
      additionalBusinessData.yelpLink = additionalBusiness.url;
      additionalBusinessData.phone = additionalBusiness.display_phone;
      additionalBusinessData.distance = metersToMiles(additionalBusiness.distance);

      results.additionalBusinesses.push(additionalBusinessData);
      additionalBusinessCount++;

    }

  } else { results.additionalBusinesses = null; }

  /* Return random business */
  res.status(200).json(results);

});

router.get('')

function metersToMiles(m) { return `${Math.round(m / 1609 * 100) / 100} mi.`; }

module.exports = router;
