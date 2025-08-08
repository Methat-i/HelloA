const e = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json() );

app.use((req, res, next) => {
    const IndexPath = path.join(__dirname, 'user.json');

    fs.access(IndexPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.warn('user.json not found. Creating a new one...',err);
            fs.writeFileSync(IndexPath, JSON.stringify(
                [{ id: 1, username: "John Doe", pass: "xxxxxx" }]

            ));
        }
        next();
    });
});

app.get('/Users', (req, res) => {
    const IndexPath = path.join(__dirname, 'user.json');
    const users = JSON.parse(fs.readFileSync(IndexPath, 'utf8'));
    res.json(users);
});

app.post('/Users', express.json(), (req, res) => {
    const newUser = req.body;
    const IndexPath = path.join(__dirname, 'user.json');
    const users = JSON.parse(fs.readFileSync(IndexPath, 'utf8'));
    users.push(newUser); 
    fs.writeFileSync(IndexPath, JSON.stringify(users));
    res.status(201).json(newUser);
});

app.put('/Users/:id', express.json(), (req, res) => {
    const userId = parseInt(req.params.id); 
    const updatedUser = req.body;
    const IndexPath = path.join(__dirname, 'user.json');
    const users = JSON.parse(fs.readFileSync(IndexPath, 'utf8'));
    const userIndex = users.findIndex(user => user.id === userId);
    console.log(users);
    if (userIndex === -1) {
return res.status(404).json({ error: 'User not found' } );
    } 
            users[userIndex] = { ...users[userIndex], ...updatedUser };
        fs.writeFileSync(IndexPath, JSON.stringify(users));
        res.json(users[userIndex]);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

