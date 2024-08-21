const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');

// const app = express();
// app.use(express.json());

// connectDB();

// app.use('/api', authRoutes);
// app.use('/api', productRoutes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/productsDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const ProductSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
// });

// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const Product = mongoose.model('Product', ProductSchema);
// const User = mongoose.model('User', UserSchema);

// // User registration
// app.post('/api/register', async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ username, password: hashedPassword });
//   await newUser.save();
//   res.status(201).send('User Registered');
// });

// // User login
// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });

//   if (user && await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign({ username: user.username }, 'your_jwt_secret');
//     res.json({ token });
//   } else {
//     res.status(401).send('Invalid credentials');
//   }
// });

// // Middleware for authenticating JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) return res.sendStatus(403);

//   jwt.verify(token, 'your_jwt_secret', (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // CRUD Operations

// // Get all products
// app.get('/api/products', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // Add a new product (Authenticated Users Only)
// app.post('/api/products', authenticateToken, async (req, res) => {
//   const { name, description, price } = req.body;
//   const newProduct = new Product({ name, description, price });
//   await newProduct.save();
//   res.status(201).json(newProduct);
// });

// // Update a product (Authenticated Users Only)
// app.put('/api/products/:id', authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price } = req.body;
//   const updatedProduct = await Product.findByIdAndUpdate(
//     id,
//     { name, description, price },
//     { new: true }
//   );
//   res.json(updatedProduct);
// });

// // Delete a product (Authenticated Users Only)
// app.delete('/api/products/:id', authenticateToken, async (req, res) => {
//   const { id } = req.params;
//   await Product.findByIdAndDelete(id);
//   res.status(204).send();
// });

// // Start server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
