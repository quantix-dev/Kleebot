/*    
	help.js - This display help of all CMD's
	
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