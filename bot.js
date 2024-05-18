const dotenv = require('dotenv');
dotenv.config();
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const groupId = process.env.TELEGRAM_GROUP_ID;
const users = ['@Javlon084', '@coder_naimov', '@hakimjonov712', '@Oybek_Makhsudov', '@NamozOtabek', 'Otabekov Ro"zimurod', '@aziz_ismoilov', 'Bekzod Rahmonov', '@khon_engineer'];

let currentIndex = 0;

cron.schedule('0 10 * * *', () => {
    const username = users[currentIndex];
    bot.sendMessage(groupId, `Iltimos, kunlik navbatchilikni unutmang: ${username}`);
    
    currentIndex = (currentIndex + 1) % users.length;
}, {
    timezone: "Asia/Tashkent"
});

bot.on('polling_error', (error) => {
    console.log(error);
});
