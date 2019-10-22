// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	if (message.member.voiceChannel) {
		await message.react('✅')
			
		try {
			const vconnect = await message.member.voiceChannel.join()
		} catch(x) {
			console.error(x)
		}

		const embed = new Discord.RichEmbed()
			.setTitle("Kleebot - Music")
			.setDescription("Moved channel to - " + message.member.voiceChannel.name)
			.setColor([25,175,25])

		message.channel.send({embed})
	} else {
		message.channel.send("You must join a voicechannel first.")
	}

	message.delete()
}

module.exports.help = {
	name: "join",
}