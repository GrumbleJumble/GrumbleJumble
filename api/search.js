const package = require('../package.json');

const express = require('express');
const axios = require('axios');

const router = express.Router();

const baseURL = "https://api.yelp.com/v3/businesses/search";
const term = "restaurant";
const open_now = true;
const apikey = process.env.YELP_API_KEY;

const reg = /-?([0-9]+).([0-9]+)/g;

router.get('/', async (req, res) => {

  if (typeof req.query.latitude === 'undefined') { res.status(400).send('Empty Latitude Parameter'); return; }
  if (typeof req.query.longitude === 'undefined') { res.status(400).send('Empty Longitude Parameter'); return; }

  let latitude = req.query.latitude;
  let longitude = req.query.longitude;
  let radius = req.query.radius || 5;
  radius *= 1609;

  if (!(latitude.match(reg))) { res.status(400).send('Improperly Formatted Latitude Parameter!'); return; }
  if (!(longitude.match(reg))) { res.status(400).send('Improperly Formatted Longitude Parameter!'); return; }

  let requestURL = `${baseURL}?term=${term}&radius=${radius}&open_now=${open_now}&latitude=${latitude}&longitude=${longitude}`;
  let yelpRes = await axios.get(requestURL, {headers: {'Authorization': `Bearer ${apikey}`}});

  var results = new Object();
  results.results = [];

  let randomIndex = Math.floor(Math.random() * yelpRes.data.businesses.length);
  let biz = yelpRes.data.businesses[randomIndex];

  let bizAddress = `${biz.location.display_address.join(", ")}`;
  let destinationCoordinates = `${biz.coordinates.latitude},${biz.coordinates.longitude}`;
  let originCoordinates = `${latitude},${longitude}`;
  let mapsURL = `https://www.google.com/maps/dir/?api=1&origin=${originCoordinates}&destination=${destinationCoordinates}`;

  var yelpData = new Object();
  yelpData.name = biz.name;
  yelpData.image_url = biz.image_url;
  yelpData.category = biz.categories[0].title;
  yelpData.rating = biz.rating;
  yelpData.price = biz.price;
  yelpData.address = bizAddress;
  yelpData.addressLink = mapsURL;
  yelpData.phone = biz.display_phone;
  yelpData.distance = metersToMiles(biz.distance);

  results.results.push(yelpData);

  for (var oBiz of yelpRes.data.businesses) {

    if (oBiz.id === biz.id) continue;

    let oBizAddress = `${oBiz.location.display_address.join(", ")}`;
    let oDestinationCoordinates = `${oBiz.coordinates.latitude},${oBiz.coordinates.longitude}`;
    let oOriginCoordinates = `${latitude},${longitude}`;
    let oMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${oOriginCoordinates}&destination=${oDestinationCoordinates}`;

    var oYelpData = new Object();
    oYelpData.name = oBiz.name;
    oYelpData.image_url = oBiz.image_url;
    oYelpData.category = oBiz.categories[0].title;
    oYelpData.rating = oBiz.rating;
    oYelpData.price = oBiz.price;
    oYelpData.address = oBizAddress;
    oYelpData.addressLink = oMapsURL;
    oYelpData.phone = oBiz.display_phone;
    oYelpData.distance = metersToMiles(oBiz.distance);

    results.results.push(oYelpData);

  }

  res.status(200).send(results);

});

function metersToMiles(m) {
  let miles = m / 1609;
  let milesRounded = Math.round(miles * 100) / 100;
  return `${milesRounded} mi.`;
}

module.exports = router;
