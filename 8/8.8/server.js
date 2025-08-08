const express = require('express');
const app = express();
app.use(express.static('public'));
// console.log
// (1);

app.get('/', (req, res) => {
    // console.log('Received a request');
    // console.log('Hello, World!');
    res.send('Hello, World!');
    });
// console.log(2);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
// console.log(3);