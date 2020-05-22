const express = require('express');
const bodyParser = require('body-parser');
const parseJsonToFiles = require('./src/mediator/parseJsonToFiles');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World'));

app.post('/', async (req, res) => {
  try {
    const response = await parseJsonToFiles(req);
    res.json(response);
  } catch(e) {
    res.json({success: false, message: e.message});
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
