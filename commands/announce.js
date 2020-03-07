// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	// Code in here.
	var guildRoles = message.guild.roles
	var chosenRole = guildRoles.get(args[0])
	
	if (message.author.tag != ("Quantix#0781")) {
    		message.channel.send("You are not QUanTIx");
    		return;
  	}

	if (chosenRole) {
		chosenRole.setMentionable(true, `${message.author.tag} wants to announce a message.`)
  			.catch(console.error)

		args.shift()
		message.channel.send(`**[Announcement by <@${message.author.id}>]** <@&${chosenRole.id}>\n` + args.join(" "))
			.then(chosenRole.setMentionable(false, `${message.author.tag}'s announcement done.`).catch(console.error))
	}
}

module.exports.help = {
	name: "announce",

	category: "other",
	commandHelp: "Announce a message to a role.",
	cooldown: 20
}