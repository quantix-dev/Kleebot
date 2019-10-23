// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	const embed = new Discord.RichEmbed()
		.setTitle("Kleebot Help")
		.setThumbnail(bot.user.displayAvatarURL)
		.setDescription("Kleebot is a unique and fun discord bot that has many features ranging from music to memes. ~~                                               ~~")		
		.addField("__Music Commands__", 
			"**-join**\n Joins the voice channel you're in.\n\
			**-play <url>**\n Plays the URL in your voice channel. Do -join first.\n\
			**-leave**\n Leaves the voice channel and stops the audio.\
		")
		.setColor([25,175,25])

	message.reply("sent you help!")
	message.member.send(embed)
	message.delete()
}

module.exports.help = {
	name: "help",
}