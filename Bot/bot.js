const { Telegraf } = require("telegraf");
const  { Keyboard } = require('telegram-keyboard')
const TOKEN = "7011088128:AAGUjF7Wj7EOIdaHi--PXhq48rT9rJPZIos";
const bot = new Telegraf(TOKEN);

const web_link = "https://tele-food-app.vercel.app/"
bot.start((ctx) =>
  ctx.reply("Welcome", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.hears('text', async (ctx) => {
  const keyboard = Keyboard.make([
    ['Button 1', 'Button 2'], // First row
    ['Button 3', 'Button 4'], // Second row
  ])
  
  await ctx.reply('Simple built-in keyboard', keyboard.reply())
  // await ctx.reply('choose' , keyboard.reply())
  // await ctx.reply('Simple inline keyboard', keyboard.inline())
})

bot.hears('Search', ctx => ctx.reply('Yay!'))

bot.launch();