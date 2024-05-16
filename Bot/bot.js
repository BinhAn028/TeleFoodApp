const { Telegraf } = require("telegraf");
const { Keyboard } = require('telegram-keyboard')
const TOKEN = "7189895257:AAFjaEUl3mNtp1peoT5waBUrYNvfWerd8b8";
const bot = new Telegraf(TOKEN);

const web_link_2 = "https://public-terms-prove.loca.lt/"

bot.start((ctx) => {
    ctx.replyWithPhoto( "https://nemoverse.io/nemo_wallet.png",
        {
            caption:         'Your Wallet is set and ready. You can start using crypto in Telegram.',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open Wallet',
                            web_app: { url: web_link_2 }
                        }]
                ]
            }
        }
    )
}
);

bot.hears('text', async (ctx) => {
    const user = ctx.from;
    console.log(user);
    ctx.reply(`Hello, ${user.first_name}!`);

    const keyboard = Keyboard.make([
        ['Button 1', 'Button 2'], // First row
        ['Button 3', 'Button 4'], // Second row
    ])
    await ctx.reply('Simple built-in keyboard', keyboard.reply())
})

bot.on('message', (ctx) => {
    ctx.reply("Welcome", {
        reply_markup: {
            keyboard: [
                [{ text: "web app 2", web_app: { url: web_link_2 } }]
            ],
        },
    })
})


bot.launch();