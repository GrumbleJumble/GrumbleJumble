/* API Initialization */
const axios = require('axios');
console.log(`\nLoading GrumbleJumble API...`);
global.SERVER = {};

/* API Path */
SERVER.path = __dirname;

/* Initialize Express Server */
const express = require('express');
SERVER.express = express();

/* HTTPS */
const fs = require('fs');
const https = require('https');

/* CORS Configuration */
const cors = require('cors');
const originWhitelist = [
  'https://localhost:8000',
  'https://localhost:5000',
  'https://localhost:3000',
  'https://grumblejumble.com'
]
const corsOptions = { origin: function (origin, callback) { if (originWhitelist.indexOf(origin) !== -1) { callback(null, true); } else { callback(null, false); }}}
SERVER.express.use(cors(corsOptions));

/* V1 API (Deprecated) */
SERVER.express.use('/v1', require('./api/v1/api.js'));

/* V2 API (Current) */
SERVER.express.use('/v2', require('./api/v2/api.js'));

/* Reject all other request routes */
SERVER.express.use('*', (req, res) => { res.status(400).end(); });

/* API Options */
SERVER.express.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

let server = SERVER.express.listen(PORT, () => {

  console.log('\n====================================');
  console.log(`GrumbleJumble API Online`);
  console.log(`Current Server Time: ${new Date()}`);
  console.log(`http://api.grumblejumble.com:${server.address().port}`);
  console.log(`====================================\n`);

});
