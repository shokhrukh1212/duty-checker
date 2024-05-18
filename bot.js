require('dotenv').config();
import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const groupId = process.env.TELEGRAM_GROUP_ID;  // Replace with your group chat ID
const users = ['@person1', '@person2'];  // List of usernames

let currentIndex = 0;

cron.schedule('0 10 * * *', () => {
    // This will run every day at 10:00 AM server time
    const username = users[currentIndex];
    bot.sendMessage(groupId, `Iltimos, kunlik navbatchilikni unutmang: ${username}`);
    
    // Update the index for the next day
    currentIndex = (currentIndex + 1) % users.length;
}, {
    timezone: "Asia/Tashkent"  // Set your timezone, e.g., "America/New_York"
});

bot.on('polling_error', (error) => {
    console.log(error);  // Log polling errors
});
