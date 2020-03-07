// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")
const embed = new Discord.RichEmbed()
var isEmbedded = false;

cmds = new Map()

function embedAdd(cmdProp, cmdName) {
	embed.addField(`**-${cmdName}** [Cooldown: ${cmdProp.help.cooldown}s]`, `~~  ~~ ${cmdProp.help.commandHelp}`)

	return true
}

module.exports.run = async (bot, message, args) => {
	// Code in here.
	if (isEmbedded == false) {
		embed.setTitle("Kleebot Help Panel")
		embed.setThumbnail(bot.user.displayAvatarURL)
		embed.setDescription("This bot gives me anxiety, don't cross this lord or you will suffer the consequences.")
		embed.setColor([25,175,25])

		// Add Commands
		await cmds.forEach(embedAdd)
	
		isEmbedded = true
	}

	message.author.send(embed).catch()
}

module.exports.addCommand = async (cmdName, cmdProp) => {
	// Command Manager here.
	if (cmds.get(cmdName)) return;
	
	cmds.set(cmdName, cmdProp)
}

module.exports.help = {
	name: "help",
	
	category: "other",
	commandHelp: "default description.",
	cooldown: 5,
	useCommand: true
}