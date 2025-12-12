// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const AuthRouter = require('./Routes/AuthRouter');


// require('dotenv').config();
// require('./Models/db');
// const PORT = process.env.PORT || 8080;

// app.get('/ping', (req, res) => {
//     res.send('PONG');
// });

// app.use(bodyParser.json({ limit: '5mb' })); // Allow up to 5MB JSON payloads
// app.use(cors());
// app.use('/auth', AuthRouter);
// const ProfileRouter = require('./Routes/ProfileRouter');
// app.use('/profile', ProfileRouter);



// app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`)
// })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Make sure cors is imported

require('dotenv').config();
require('dotenv').config();
console.log("✅ JWT_SECRET loaded:", process.env.JWT_SECRET ? "YES" : "NO");
console.log("✅ MONGO_CONN loaded:", process.env.MONGO_CONN ? "YES" : "NO");
require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter');
const ProfileRouter = require('./Routes/ProfileRouter'); // ✅ Add this if not already

const PORT = process.env.PORT || 8080;

// 👇 STEP 1: Define CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Your React frontend URL
  credentials: true,
  optionsSuccessStatus: 200
};

// 👇 STEP 2: Apply middlewares IN THIS ORDER
app.use(bodyParser.json({ limit: '5mb' })); // ✅ Increased limit for base64 images
app.use(cors(corsOptions)); // ✅ CORS must come AFTER body-parser but BEFORE routes

// 👇 STEP 3: Register routes
app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);

// Other routes
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// 👇 STEP 4: Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});