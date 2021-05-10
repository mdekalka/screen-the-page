const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


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

// SSE events handler
// app.get('/events', eventsHandler);