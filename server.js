const express = require('express');
const { config } = require('dotenv');
const router = require('./routes/index.route');
const cookieParser = require('cookie-parser');
const cors = require('cors')
config({ path: `.env` });

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use(cors())
app.use(cookieParser())
app.use('/', router);

const PORT = process.env.API_PORT || 3000; 
app.listen(PORT, () => {
    console.log('=================================>');
    console.log(`🚀 App listening on the port ${PORT}`);
    console.log('=================================>');
});
