const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://admin:password123@svc_mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./src/public'));

app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Todo app running on http://localhost:${port}`);
});
