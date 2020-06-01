module.exports = {
  name: "skip",
  description: "Skip the song or shift song to next",
  execute(client, message, args) {
    const { channel } = message.member.voice;
        if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You do not have permissions to do lockdown, sorry."
      );
    }

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      return message.channel.send("YOU NEED TO BE IN VOICE CHANNEL");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("There is nothing playing that i could skip");
    }

    serverQueue.connection.dispatcher.end();
    message.channel.send("Skipping The Song");
  }
};
