const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// MySQL connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'swaas@123',
    database: 'pro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function getConnection() {
    return pool.promise();
}

// Token verification middleware
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.user = user;
        next();
    });
}

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const [results] = await getConnection().query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        res.send('User registered successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error registering user');
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body; // Adjusted to use email

    try {
        const [results] = await getConnection().query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(401).send('Invalid credentials');
        }

        const user = results[0];

        // Compare provided password with hashed password in database
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
});

// Create Category
app.post('/categories', verifyToken, async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).send('Category name is required');
    }

    try {
        await getConnection().query('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
        res.send('Category created successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error creating category');
    }
});

// Update Category
app.patch('/categories/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).send('Category name is required');
    }

    try {
        await getConnection().query('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id]);
        res.send('Category updated successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error updating category');
    }
});

// Delete Category
app.delete('/categories/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await getConnection().query('SELECT COUNT(*) AS count FROM inventory WHERE category_id = ?', [id]);

        if (results[0].count > 0) {
            return res.status(400).send('Category cannot be deleted because it is associated with inventory items');
        }

        await getConnection().query('DELETE FROM categories WHERE id = ?', [id]);
        res.send('Category deleted successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error deleting category');
    }
});

// Add Item to Inventory
app.post('/inventory', verifyToken, async (req, res) => {
    const { name, description, quantity, category_id } = req.body;
    const user_id = req.user.user_id;

    if (!name || quantity === undefined) {
        return res.status(400).send('Name and quantity are required');
    }

    try {
        await getConnection().query('INSERT INTO inventory (name, description, quantity, category_id, user_id) VALUES (?, ?, ?, ?, ?)', [name, description, quantity, category_id, user_id]);
        res.send('Item added to inventory successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error adding item to inventory');
    }
});

// View Inventory
app.get('/inventory/view', verifyToken, async (req, res) => {
    const user_id = req.user.user_id;

    try {
        const [rows] = await getConnection().query('SELECT * FROM inventory WHERE user_id = ?', [user_id]);
        res.send(rows);
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error fetching inventory');
    }
});

// Search Inventory
app.get('/inventory/search', verifyToken, async (req, res) => {
    const  name  = req.body.name;
    const user_id = req.user.user_id;

    try {
        const [rows] = await getConnection().query('SELECT * FROM inventory WHERE user_id = ? AND name=?', [user_id,name]);
        res.send(rows);
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error searching inventory');
    }
});

// Update Item Details
app.patch('/inventory/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, category_id } = req.body;

    if (!name || quantity === undefined) {
        return res.status(400).send('Name and quantity are required');
    }

    try {
        await getConnection().query('UPDATE inventory SET name = ?, description = ?, quantity = ?, category_id = ? WHERE id = ?', [name, description, quantity, category_id, id]);
        res.send('Item updated successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error updating item details');
    }
});

// Delete Item from Inventory
app.delete('/inventory/:id', verifyToken, async (req, res) => {
    const  user_id  = req.params.id;

    try {
        await getConnection().query('DELETE FROM inventory WHERE user_id = ?', [user_id]);
        res.send('Item deleted successfully');
    } catch (error) {
        console.error('Error in query:', error);
        res.status(500).send('Error deleting item from inventory');
    }
});

app.listen(3002, () => {
    console.log('Server running on port 3002');
});
