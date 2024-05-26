const express = require('express');
const { config } = require('dotenv');
const router = require('./routes/index.route');
const cookieParser = require('cookie-parser')
config({ path: `.env` });

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser())
app.use('/', router);

const PORT = process.env.API_PORT || 3000; 
app.listen(PORT, () => {
    console.log('=================================>');
    console.log(`🚀 App listening on the port ${PORT}`);
    console.log('=================================>');
});
