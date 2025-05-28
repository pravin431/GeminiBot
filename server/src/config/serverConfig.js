import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert ESM file URL to path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct absolute paths to possible .env locations
const serverPath = path.resolve(__dirname, '../../.env');  // This points to server/.env
const rootPath = path.resolve(__dirname, '../../../.env'); // This points to the project root

console.log('Attempting to load .env from server directory:', serverPath);
let result = dotenv.config({ path: serverPath });

// If first attempt fails, try project root
if (!result.parsed) {
  console.log('Attempting to load .env from project root:', rootPath);
  result = dotenv.config({ path: rootPath });
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