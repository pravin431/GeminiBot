import express from 'express';
import cors from 'cors';
import connectDB from './config/dbConfig.js';
import authRoutes from './routers/authRoutes.js';
import chatRoutes from './routers/chatRoutes.js';
import { PORT } from './config/serverConfig.js';

const app = express();// created server instance
const PORTNO = PORT || 5000;
// Connect to database in ALL environments
connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://gemini-bot-frontend.vercel.app'], // Adjust this to your client URL
  credentials: true, // Allow credentials if needed
}));// In server.js
app.use(express.json());  // This middleware is crucial for parsing JSON bodies

app.get('/', (req, res)=>{
  res.json({ message: 'Welcome to the Chat Application API' });
})

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Only run the server when not in production (Vercel handles this in production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORTNO, () => {
    console.log(`Server running on port ${PORTNO}`);
  });
}

// Export the Express app for serverless functions
export default app;