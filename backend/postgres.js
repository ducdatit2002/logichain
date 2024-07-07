const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set('view engine', 'ejs'); // Sử dụng EJS làm công cụ template

const port = 8080;

const client = new Client({
    host: "localhost",
    user: "root",
    port: 5432,
    password: "1234",
    database: "postgres"
});

client.connect().then(() => {
    console.log("Connected to the database");
}).catch(err => {
    console.error("Connection error", err.stack);
});

// auth
function createAccount(username, password, role) {
    client.query('INSERT INTO auth (username, password, role) VALUES ($1, $2, $3)', [username, password, role], (err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Data insert successful');
        }
    });
}

function changePassword(username, password) {
    client.query('UPDATE auth SET password = $1 WHERE username = $2', [password, username], (err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Data update successful');
        }
    });
}

// profile
function createProfile(username, name, description, website, location, image, role) {
    client.query('INSERT INTO profile (username, name, description, website, location, image, role) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [username, name, description, website, location, image, role], (err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Data insert successful');
            }
        });
}

// product
const storageProduct = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/product'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const storageProfile = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads/profile'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

function addProduct(serialNumber, name, brand) {
    client.query('INSERT INTO product (serialNumber, name, brand) VALUES ($1, $2, $3)',
        [serialNumber, name, brand], (err, res) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Data insert successful');
            }
        });
}

// auth routes
app.get('/authAll', async (req, res) => {
    try {
        const data = await client.query('SELECT * FROM auth');
        res.render('auth', { data: data.rows });
        console.log("Data sent successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post('/auth/:username/:password', async (req, res) => {
    try {
        const { username, password } = req.params;
        const data = await client.query(`SELECT * FROM auth WHERE username = '${username}' AND password = '${password}'`);
        res.send(data.rows);
        console.log("Data sent successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post('/addaccount', (req, res) => {
    const { username, password, role } = req.body;
    createAccount(username, password, role);
    res.send('Data inserted');
});

app.post('/changepsw', (req, res) => {
    const { username, password } = req.body;
    changePassword(username, password);
    res.send('Data updated');
});

// profile routes
app.get('/profileAll', async (req, res) => {
    try {
        const data = await client.query('SELECT * FROM profile');
        res.render('profile', { data: data.rows });
        console.log("Data sent successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.get('/profile/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const data = await client.query(`SELECT * FROM profile WHERE username = '${username}'`);
        res.send(data.rows);
        console.log("Data sent successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post('/addprofile', (req, res) => {
    const { username, name, description, website, location, image, role } = req.body;
    createProfile(username, name, description, website, location, image, role);
    res.send('Data inserted');
});

// image routes
app.post('/upload/profile', (req, res) => {
    let upload = multer({ storage: storageProfile }).single('image');
    upload(req, res, (err) => {
        if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        } else {
            res.send('Image uploaded successfully');
        }
    });
});

app.post('/upload/product', (req, res) => {
    let upload = multer({ storage: storageProduct }).single('image');
    upload(req, res, (err) => {
        if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        } else {
            res.send('Image uploaded successfully');
        }
    });
});

app.get('/file/profile/:fileName', function (req, res) {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'public/uploads/profile', fileName);
    res.sendFile(filePath);
});

app.get('/file/product/:fileName', function (req, res) {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'public/uploads/product', fileName);
    res.sendFile(filePath);
});

app.get('/product/serialNumber', async (req, res) => {
    try {
        const data = await client.query('SELECT serialNumber FROM product');
        res.send(data.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.post('/addproduct', (req, res) => {
    const { serialNumber, name, brand } = req.body;
    addProduct(serialNumber, name, brand);
    res.send('Data inserted');
});

app.get('/', (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
