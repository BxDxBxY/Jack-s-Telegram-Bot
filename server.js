const token = "6263779854:AAF0otFLotlVY7WcyJtDm543myIYjyxyJpI";
import tgbot from "node-telegram-bot-api";
const bot = new tgbot(token, { polling: true });

const users = {};
bot.setMyCommands([
  { command: "/start", description: "Start Bot" },
  { command: "/game", description: "Play Game" },
  { command: "/stop", description: "Stop Game" },
]);
const gameReply = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0", callback_data: "0" }],
    ],
    resize_keyboard: true,
    remove_keyboard: true,
  },
};
const getNum = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Now, I'm gonna think of a random number and You'll try to find!"
  );
  const rNum = Math.floor(Math.random() * 10);
  console.log(rNum);
  users[chatId] = rNum;
  return await bot.sendMessage(chatId, "Find a random number!", gameReply);
};
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/1.webp"
    );
    await bot.sendMessage(chatId, "Welcome to the Jack's Telegram Bot!", {
      reply_markup: {
        keyboard: [[{ text: "Play" }]],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
  } catch (err) {}
});
bot.onText(/\/game/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/8.webp"
    );
    await getNum(chatId);
  } catch (err) {}
});

bot.on("callback_query", async (msg) => {
  try {
    const text = msg.data;
    const msgId = msg.message.message_id;
    const chatId = msg.message.chat.id;
    bot.deleteMessage(chatId, msgId);
    if (+text === users[chatId]) {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/4.webp"
      );
      return await bot.sendMessage(chatId, "Correct answer!", {
        reply_markup: {
          keyboard: [[{ text: "Try again" }], [{ text: "Leave" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    } else {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/10.webp"
      );
      return await bot.sendMessage(chatId, "Incorrect answer!", {
        reply_markup: {
          keyboard: [[{ text: "Try again" }], [{ text: "Leave" }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    }
  } catch (err) {
    bot.sendMessage(chatId, err.message);
  }
});

bot.onText(/\/stop/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/115.webp"
    );
    await bot.sendMessage(
      chatId,
      "It was Fun to play with you " + msg.from.first_name + "!"
    );
    return;
  } catch (err) {
    return bot.sendMessage(chatId, err.message);
  }
});
bot.onText(/Leave/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/115.webp"
    );
    await bot.sendMessage(
      chatId,
      "It was Fun to play with you " + msg.from.first_name + "!",
      {
        reply_markup: { remove_keyboard: true },
      }
    );
    return;
  } catch (err) {
    return bot.sendMessage(chatId, err.message);
  }
});
bot.onText(/Try again/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await bot.sendMessage(chatId, "New Game!", {
      reply_markup: { remove_keyboard: true },
    });
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/12.webp"
    );

    await getNum(chatId);
    return;
  } catch (err) {
    return bot.sendMessage(chatId, err.message);
  }
});
bot.onText(/Play/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    await bot.sendMessage(chatId, "New Game!");
    await bot.sendSticker(
      chatId,
      "https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/12.webp"
    );

    await getNum(chatId);
    return;
  } catch (err) {
    return bot.sendMessage(chatId, err.message);
  }
});
