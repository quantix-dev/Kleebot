/*    
	announce.js - Pings an unpingable role with a specified message by a user.
	
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