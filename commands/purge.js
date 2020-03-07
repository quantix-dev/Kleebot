// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	/// Code in here.
	if (message.author.tag != ("Quantix#0781")) {
    message.channel.send("You are not QUanTIx");
    return;
  }

  // get the argument as a number
  const deleteCount = parseInt(args[0], 10);
    
  if(!deleteCount || deleteCount <= 0 || deleteCount > 100)
    return message.channel.send("-purge [1-100]").catch();
    
  // Get messages and bulk delete them.
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`Couldn't delete messages because of: ${error}`).catch());

  message.channel.send(`Me just purged ${deleteCount} messages.`).catch()
}

module.exports.help = {
	name: "purge",

	category: "other",
  commandHelp: "Purge messages.",
  cooldown: 10
}