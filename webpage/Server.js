const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/scrapeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define the schema for storing scraped data
const scrapedDataSchema = new mongoose.Schema({
    url: String,
    selectors: String,
    outputFormat: String,
    data: mongoose.Schema.Types.Mixed, // Store scraped data as JSON
});

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

// POST endpoint to handle scraping and saving to DB
app.post('/scrape', (req, res) => {
    const { url, selectors, outputFormat } = req.body;

    // Implement your scraping logic here (you can use a scraping library or tool)

    // Dummy scraped data
    const scrapedData = {
        title: "Example Title",
        content: "This is the scraped content."
    };

    // Save scraped data to MongoDB
    const newScrapedData = new ScrapedData({
        url,
        selectors,
        outputFormat,
        data: scrapedData,
    });

    newScrapedData.save()
        .then(() => {
            res.json({ message: 'Data saved successfully', data: scrapedData });
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to save data', message: err });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
