/*    
	leave.js - Leaves the current voice channel and disconnects the music.
	
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
    if (message.guild.voiceConnection != null) {
		message.guild.voiceConnection.disconnect()
        message.channel.send("ME NL E E A V E NOW!!");
        global.gc();
    } else {
        message.channel.send("ME NOT IN VOICECHEN STOP TRY MAKE ME LOOK NOT SMARTT");
    }
}

module.exports.help = {
	name: "leave",

	category: "music",
  	commandHelp: "[-leave] kleebot will leave the vc! this good idea.",
  	cooldown: 4
}