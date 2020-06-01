  const discord = require("discord.js");
const client = new discord.Client
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");

client.on("ready", () => {
  console.log('ready')
  client.user.setActivity("kneeing people")
});
  client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(PREFIX) !== 0) return;
    const args = message.content
      .slice(PREFIX.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    const { Permissions } = require("discord.js");
    const permissions = new Permissions([
      "MANAGE_CHANNELS",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MANAGE_ROLES",
      "ADMINISTRATOR",
      "BAN_MEMBERS",
      "KICK_MEMBERS",
      "MANAGE_GUILD",
      "VIEW_AUDIT_LOG",
      "MANAGE_NICKNAMES",
      "MANAGE_WEBHOOKS",
      "MANAGE_MESSAGES",
      "ADD_REACTIONS",
      "CONNECT",
      "SPEAK",
      "MUTE_MEMBERS",
      "DEAFEN_MEMBERS",
      "SEND_MESSAGES",
      "CREATE_INSTANT_INVITE"
    ]);
  if (command === `ping`) {
    message.channel.send('Pong.');
  } 
  if (command === `beep`) {
      message.channel.send('Boop.');
  }
  if (command === `george`) {
    message.channel.send('floyd');
  } 
  if (command === `help`) {
    message.channel.send('just learn commands dummy');
}
  if(command === `userinfo`) {
          message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
  }
  if (command === `news`) {
      message.channel.send(`https://news.google.com/`);
  }
  if (command === `porn`) {
    message.channel.send(`https://www.pornhub.com`);
}
if (command === `gay`) {
  message.channel.send(`you`);
}
  if (command === `logan`) {
    message.channel.send('is a bitch');
  } 

      if (command === "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
          return message.channel.send(
            "You do not have permissions to ban people, sorry."
          );
        }
    
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
          return message.channel.send(
            "I don't have permission to ban people contact a staff member to fix this issue."
          );
        }
    
        let target =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
    
        if (!target) {
          return message.channel.send(
            "Invalid arguments provided.\nUsage: " + `\`!ban <@member> <reason>\``
          );
        }
    
        if (!target.bannable) {
          return message.channel.send(
            "I cannot ban that user due to role hierarchy."
          );
        }
    
        let reason = args.slice(1);
        if (!reason) {
          reason = "no reason given";
        }
    
        message.channel.send(`Successfully banned ${target.user.tag}!`);
        target.ban(reason + `Banned by ${message.author.tag}`);
      }
      if(message.member.hasPermission(['KICK_MEMBERS']))
      if(message.content.startsWith(`${PREFIX}kick`)){
          let member = message.mentions.members.first();
          member.kick().then((member) => {
              message.channel.send(member.displayName + " has been kicked")
          });
      }
})
client.on("warn", info => console.log(info));
client.on("error", console.error)
client.commands = new discord.Collection()
client.PREFIX = PREFIX
client.queue = new Map();
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} 
client.on("message", message => {
   if (message.author.bot) return;
  if (!message.guild) return;
  if(message.content.startsWith(PREFIX)) { 
    const args = message.content.slice(PREFIX.length).trim().split(/ +/) 
    const command = args.shift().toLowerCase();
    if(!client.commands.has(command)) {
      return;
    } 
    
  try  { 
      client.commands.get(command).execute(client, message, args)
    } catch (err) { 
      console.log(err)
      message.reply("I am getting error on using this command")
    }
    
  }
});

client.login(`NzAyMjE4NjUwMzY2NzcxMzAw.XtQflA.MNbkDyEdCKtfAFwK-CHx6jRAsWs`)