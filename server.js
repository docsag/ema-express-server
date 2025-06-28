const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./routes/submit'));
app.use('/api', require('./routes/push'));
app.use('/api', require('./routes/auth'));

app.get('/', (req, res) => res.send('EMA API is running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
