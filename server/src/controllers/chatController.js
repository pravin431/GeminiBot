import Chat from '../models/chat.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/serverConfig.js';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.user.id });
    res.json(chat ? chat.messages : []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMessage = async (req, res) => {
  const { message } = req.body;
  try {
    let chat = await Chat.findOne({ userId: req.user.id });
    if (!chat) {
      chat = new Chat({ userId: req.user.id, messages: [] });
    }
    chat.messages.push({ role: 'user', content: message });

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const botMessage = response.text();

    chat.messages.push({ role: 'bot', content: botMessage });
    await chat.save();

    res.json({ botMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getChatHistory, addMessage };