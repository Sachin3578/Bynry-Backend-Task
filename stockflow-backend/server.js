const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const cors = require('cors');
const alertRoutes = require('./routes/alerts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);
app.use('/api', alertRoutes);

app.get('/', (req, res) => {
    res.send('Stockflow backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});