const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// basic route
app.get('/', (req, res) => {
  res.send('My Cart backend is running');
});

// hello test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello! This is a test endpoint', timestamp: new Date() });
});

// hello post test endpoint
app.post('/api/hello', (req, res) => {
  const { name } = req.body;
  res.json({ 
    message: `Hello ${name || 'User'}! POST request received`, 
    timestamp: new Date(),
    receivedData: req.body
  });
});

// routes
app.use('/api/users', userRoutes);

// connect to MongoDB (with in-memory fallback)
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
  let uri = process.env.MONGO_URI;

  async function startMemory() {
    console.log('Starting in-memory MongoDB fallback');
    const mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
  }

  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
      return;
    } catch (err) {
      console.error('MongoDB connection error, falling back to memory', err);
      await startMemory();
      return;
    }
  } else {
    await startMemory();
  }
}

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to DB error', err);
});
