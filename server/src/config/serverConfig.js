import dotenv from 'dotenv';
import path from 'path';

// Load environment variables directly from multiple possible locations
const envPaths = [
  './.env',
  '../.env',
  '../../.env',
  '../../../.env'
];

let loaded = false;
for (const envPath of envPaths) {
  try {
    const result = dotenv.config({ path: envPath });
    if (result.parsed) {
      console.log(`Loaded environment variables from ${envPath}`);
      loaded = true;
      break;
    }
  } catch (e) {
    // Continue to next path
  }
}

if (!loaded) {
  console.warn('Warning: Could not find .env file, using environment variables directly');
}

// Log environment variable status
console.log('MONGODB_URI loaded:', process.env.MONGODB_URI ? 'Yes' : 'No');
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'Yes' : 'No');
console.log('GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');

// Make sure we have valid values
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const PORT = process.env.PORT;