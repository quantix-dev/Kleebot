// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")

const bingeEmoji = "<:binge:625054771174440981>"

module.exports.run = async (bot, message, args) => {
	// Code in here.
	const m = await message.channel.send(`Loading... `).catch()
	var ping = Math.round(bot.ping);
	var latency = m.createdTimestamp - message.createdTimestamp
	var averagePing = (ping + latency) / 2	

	m.edit(`pong :ping_pong:\n~~   ~~ **Around ${latency} ms API Latency**\n~~   ~~ **Around ${ping} ms Latency**`)
	
	if (averagePing  >= 100) {
		if (averagePing >= 500) {
			message.channel.send(`NeYOH the ping is **WAy** HiGh! ${bingeEmoji} `).catch()
			return;
		}

		message.channel.send("NeYOH the ping is HiGh! :straight_ruler: ").catch()
	} else {
		message.channel.send("YeOOH the ping is EpIC! :star: ").catch()
	}
}

module.exports.help = {
	name: "ping",

	category: "other",
	commandHelp: "Ping the bot to see how fast our API is doing!",
	cooldown: 5
}