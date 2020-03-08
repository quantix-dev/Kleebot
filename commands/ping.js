/*    
	ping.js - Pings the bot to see what the latency is.
	
    Copyright (C) 2020  QuantixOfficial
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
 
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