// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Define a simple Mongoose model
const Item = mongoose.model('Item', {
    name: String,
    description: String,
});

// API route to fetch data
app.get('/api/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
