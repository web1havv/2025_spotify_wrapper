import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leetcodeRoutes from './routes/leetcode.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leetcode', leetcodeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'LeetCode Wrapped API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

