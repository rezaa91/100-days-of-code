const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/views/index.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/public/views/about.html'));
app.get('/contact', (req, res) => res.sendFile(__dirname + '/public/views/contact.html'));

app.listen(port, () => console.log(`listening on port ${port}`));
