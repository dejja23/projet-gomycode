const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/annonces', require('./routes/annonces'));
app.use('/categories', require('./routes/categories'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
