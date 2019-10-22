// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	await message.react('✅')

	const id = message.guild.id
	const vc = bot.user.client.voiceConnections.get(id.toString())

	if (vc) {
		vc.disconnect()

		const embed = new Discord.RichEmbed()
			.setTitle("Kleebot - Music")
			.setDescription("Left Channel: - " + vc.channel.name)
			.setColor([175,25,25])

		if (embed) {
			message.channel.send({embed})
		} else {
			message.channel.send("Left Voice Channel")
		}
	}

	message.delete()
}

module.exports.help = {
	name: "leave",
}