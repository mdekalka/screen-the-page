const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');


const PORT = 3002;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client')));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

app.get('/', function(request, response) {
  response.sendFile('./client/index.html', { root: __dirname });
});

app.get('/screenshot', async function(request, response) {
  const url = request.query.url;

  const image = await htmlToImage(url);

  // response.json({ image });
  response.sendFile(image)
})

async function htmlToImage(url) {
  if (!url) return;

  const browser = await puppeteer.launch({ headless: true, slowMo: 100 });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ fullPage: true, path: 'screen.png' });

  await page.close();
  await browser.close();

  screenshotPath = path.normalize(`${process.cwd()}/screen.png`);

  return screenshotPath;
};