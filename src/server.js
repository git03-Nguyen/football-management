require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./middlewares/favicon.mw')(app);
require('./middlewares/hbs/hbs.mw')(app);

require('./middlewares/passport.mw')(app);

require('./routers/index.r')(app);



const fs = require('fs');
// read the ssl certificates from certificates/demo.crt and certificates/demo.key
const privateKey = fs.readFileSync('certificates/demo.key', 'utf8');
const certificate = fs.readFileSync('certificates/demo.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const https = require('https');
const httpsServer = https.createServer(credentials, app);
const port = process.env.PORT || 3000;
httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
