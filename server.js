require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public', 'index.html'));
});
app.post('/convertcurrency', async (req, res) => {
    const { amount, oldCurrency, newCurrency } = req.body;

    const url = new URL('https://' + API_HOST + '/v1/convertcurrency');
    url.searchParams.set('have', oldCurrency);
    url.searchParams.set('want', newCurrency);
    url.searchParams.set('amount', amount);

    try {
        const response = await axios.get(url, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });

        if (!response.data) {
            throw new Error('Network response was not ok');
        }

        const results = response.data;
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Currency not found' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
