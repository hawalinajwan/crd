const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    const filePath = path.join(__dirname, '..', 'App.vue');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send('Error loading file');
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    });
};
