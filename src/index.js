// Load up the discord.js library
import { Client } from "discord.js";
import stock from "stock-ticker-symbol";

import { getCurretPrice } from "./utils";
import { discordToken, cmdPrefix } from "./config";

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Client();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  //client.user.setActivity(`Serving ${client.guilds.size} servers`);
  client.user.setActivity('NASDAQ', { type: 'WATCHING' });
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our cmdPrefix,
  // which is set in the configuration file.
  if (!message.content.startsWith(cmdPrefix)) return;

  const target = message.content.slice("stock:".length).trim().toUpperCase();

  let replyMessage;

  if (target !== null) {
    getCurretPrice(target)
      .then(data => {
        let change = (data.now - data.yesterday).toFixed(2);
        let changePercent = (change / data.yesterday * 100).toFixed(2);

        if (change >= 0) {
          change = '+' + change;
          changePercent = '+' + changePercent;
        }

        const name = stock.lookup(target);

        replyMessage = `${name}    USD ${data.now}    ${change} (${changePercent}%)`;
      })
      .catch(error => {
        replyMessage = `找不到這支股票 QQ`;
      })
      .finally(() => {
        // Then we delete the command message (sneaky, right?). The catch just ignores the error
        //message.delete().catch(() => {});
        // And we get the bot to say the thing:
        message.channel.send(replyMessage);
      });
  }
});

client.login(discordToken);
