const express = require('express');
const axios = require('axios');

const package = require('./package.json');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/search', require('./api/search.js'));

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

let server = app.listen(PORT, () => {

  console.log('\n====================================');
  console.log(`GrumbleJumble API v${package.version}`);
  console.log(``);
  console.log(`Secure REST API Endpoint:`);
  console.log(`http://grumblejumble.herokuapp.com:${server.address().port}`);
  console.log(`====================================\n`);

});
