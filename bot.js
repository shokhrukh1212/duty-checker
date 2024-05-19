const dotenv = require('dotenv');
dotenv.config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const express = require('express');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const groupId = process.env.TELEGRAM_GROUP_ID;
const users = ['Bobur aka', 'Otabekov Ro"zimurod', '@Otabekov00000', '@Javlon084', '@coder_naimov', '@Oybek_Makhsudov', '@NamozOtabek', 'Bekzod Rahmonov', '@artikhboevj', '@hakimjonov712', '@aziz_ismoilov', '@khon_engineer'];
const weekly_users = ["Azizbek akalarni xonasi, @aziz_ismoilov", "Ro'zimurodlarni xonasi, @Otabekov00000", "Bekzodlarni xonasi, @Oybek_Makhsudov", "Xasanboylarni xonasi, @coder_naimov", "Shohruxlarni xonasi, @khon_engineer"];

let currentIndex = 0;
let weeklyIndex = 0;

// Daily schedule
cron.schedule('0 5 * * 1-6', () => {
    const username = users[currentIndex];
    bot.sendMessage(groupId, `**Iltimos, bugun kunlik navbatchilikni unutmang!**: ${username}`);
    
    currentIndex = (currentIndex + 1) % users.length;
});

// Weekly schedule
cron.schedule('30 5 * * 0', () => {
    const room = weekly_users[weeklyIndex];
    bot.sendMessage(groupId, `**Iltimos, bugun haftalik navbatchilikni unutmang!**: ${room}`);
    
    weeklyIndex = (weeklyIndex + 1) % weekly_users.length;
});

// Create an express server to keep Glitch awake
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running');
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});

bot.on('polling_error', (error) => {
    console.log(error);
});
