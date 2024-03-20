const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000 || process.env.PORT;
const UserRoutes = require('./routes/userRoutes')

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.json('Server is up and running...');
})

app.use('/api/v1', UserRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})