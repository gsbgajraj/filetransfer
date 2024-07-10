// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const port = 3000;

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// app.use(express.static('public'));

// app.post('/upload', upload.array('files', 10), (req, res) => {
//     const fileLinks = req.files.map(file => `<a href="/uploads/${file.filename}" download>${file.originalname}</a>`).join('<br>');
//     res.send(`Files uploaded successfully:<br>${fileLinks}`);
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

let uploadHistory = [];

app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); // Serve files from the uploads directory

app.post('/upload', upload.array('files', 10), (req, res) => {
    req.files.forEach(file => {
        uploadHistory.push({
            filename: file.filename,
            originalname: file.originalname,
            url: `/uploads/${file.filename}`
        });
    });
    res.redirect('/');
});

app.get('/history', (req, res) => {
    res.json(uploadHistory);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




