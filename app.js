const express = require('express');
const uploadRoute = require('./routes/upload')
const app = express();


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/api', uploadRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});