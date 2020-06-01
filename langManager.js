/*    
	langManager.js - Handles all the language for the bot so it can be unique.
	
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
    fs = require("fs");

/*---------------------------------------------------------------------------
	            JSON MANAGER RIGHT HERE LADS
---------------------------------------------------------------------------*/
const langFile = JSON.parse(fs.readFileSync("lang.json"));
var translationMap = new Map([]);

module.exports.updateTranslation = function(bot, keyType, value) {
	translationMap.set(keyType, value)
}

// This will run accessEmoji just in-case lol :thumbs_up:
module.exports.accessMSG = function(bot, jsName, replaceMap=translationMap) {
	// Table randomisation.
	var value = langFile["messages"][jsName]

	if (typeof(value) == "object") {
		value = value[Math.floor(Math.random()*value.length)];
	}

	if (value != null) {
		// Translation
		for (let [replace, newStr] of replaceMap) {
			value = value.replace(replace, newStr);
		} 
	}

	value = this.accessEMOJI(bot, value);

	return value;
}

module.exports.accessEMOJI = function(bot, str){
	if (str == null) return;

	bot.emojis.forEach(emoji => {
		str = str.replace(":" + emoji.name + ":", emoji);
	});

	return str
}