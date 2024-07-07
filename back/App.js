const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB")
}

main().catch(console.error);

app.use('/api/login', require('./routes/login.js'));
app.use('/api/usuarios', require('./routes/createInterest.js'));
app.use('/api/intereses', require('./routes/Interest.js'))

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});