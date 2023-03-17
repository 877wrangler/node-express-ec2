import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();

// Allow requests from all domains
app.use(cors());

// Listen for requests
app.listen(5001, () => console.log('API running on port 5001'));

// Handle requests to the root URL
app.get('/', (req, res) => {
  const data = {
    message: 'My API running'
  };
  res.json(data);
});

// Define the route for option quotes
app.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;

  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the option quote page for the specified symbol
  await page.goto(`https://finance.yahoo.com/quote/WISH230421C00000500`);

  // Wait for the fin-streamer element to be available
  await page.waitForSelector('fin-streamer');

  // Extract the option quote and type from the page
  const optionQuote = await page.$$eval('fin-streamer', elements => elements[18].innerHTML);
  const optionType = await page.$$eval('h1', elements => elements[0].innerHTML);

  // Close the browser instance
  await browser.close();

  // Return the option quote and type as JSON
  res.json({ symbol, optionQuote, optionType });
});
