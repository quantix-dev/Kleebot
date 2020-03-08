// Quantix (c) creative commons license 2019
var connectionX = null
const Discord = require("discord.js")
    fs = require("fs");

/*---------------------------------------------------------------------------
	            JSON MANAGER RIGHT HERE LADS
---------------------------------------------------------------------------*/
const langFile = JSON.parse(fs.readFileSync("lang.json"));
var translationMap = new Map([]);

module.exports.updateTranslation = function(keyType, value) {
	translationMap.set(keyType, value)
}

// This will run accessEmoji just in-case lol :thumbs_up:
module.exports.accessMSG = function(jsName, replaceMap=translationMap) {
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

	value = this.accessEMOJI(value);

	return value;
}

module.exports.accessEMOJI = function(str){
	if (str == null) return;

	bot.emojis.forEach(emoji => {
		str = str.replace(":" + emoji.name + ":", emoji);
	});

	return str
}