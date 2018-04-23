/** ****************************************************************************************
 * A METTRE DANS UN AUTRE FICHIER :'(
 */
var RandomHandGen = {  
    randomNbs :'123456789',
    randomFamilies :'psmz',
    randomHonors :'1234567',
}

RandomHandGen.checkHand=function(randomHand){
    var b = true
    for(var i in RandomHandGen.randomFamilies){
        if(i ==='z'){
            for(var j in RandomHandGen.randomHonors){
                b = b&&this.checkEach(randomHand,i+""+j)
            }
        }else{
            for(var j in RandomHandGen.randomNbs){
                b = b&&this.checkEach(randomHand,i+""+j)
            }
        }
    }
    return true
}

RandomHandGen.generateHand=function(){

    var randomHand=''
    var i = 0;
    
    while (i < 13) {
        var randomChar = RandomHandGen.randomFamilies[Math.floor(Math.random() * RandomHandGen.randomFamilies.length)];
        var randomNb = ''
        if(randomChar==='z'){
            randomNb = RandomHandGen.randomHonors[Math.floor(Math.random() * RandomHandGen.randomHonors.length)];
        }else{
            randomNb = RandomHandGen.randomNbs[Math.floor(Math.random() * RandomHandGen.randomNbs.length)];
        }
        randomHand+=randomNb+randomChar+"/"
        ++i
    }

    if(this.checkHand(randomHand)){
        return this.prepareHand(randomHand)
    }else{
        return generateHand(res)
    }
}

RandomHandGen.prepareHand=function(randomHand){
    return randomHand
    .split("/")
    .map(x => x.split("").reverse().join(""))
    .sort()
    .map(x=>x.split("").reverse().join(""))
    .join("/")
    .replace("1z","ton")
    .replace("2z","nan")
    .replace("3z","sha")
    .replace("4z","pei")
    .replace("5z","haku")
    .replace("6z","hatsu")
    .replace("7z","chun")
    .split("/")
    .map(x=>x=bot.emojis.find("name",x))
    .join("")
}

RandomHandGen.checkEach = function(randomHand,toSearch){
    var count = 0
    var pos = randomHand.indexOf(toSearch)
    while(pos>-1){
        ++count
        pos=randomHand.indexOf(toSearch,++pos)
    }
    return count<=4
}

/** ****************************************************************************************
 * LE BON FICHIER
 */
const Discord = require('../../node_modules/discord.js')
const bot = new Discord.Client()
var playingShanten=false;

bot.on('ready',function(){
    bot.user.setAvatar('./avatar.png')
    bot.user.setActivity('Mahjong')
})

bot.on('message',function(msg){
    if(msg.content === '!ping'){
        msg.channel.send('pong')
    }
    
    if(msg.content === '!help'){
        msg.channel.send('Use !help --all for more help.')
    }

    if(msg.content === '!help --all'){
        msg.channel.send('I can\'t do anything for you right now, please wait for me to be ready.')
    }

    if(msg.content === '!shanten'){
        msg.channel.send(RandomHandGen.generateHand())
        this.playingShanten = true
    }
    if(playingShanten && msg.content.startsWith("1")){
        msg.channel.send('nice try!')
        this.playingShanten = false
    }
})

bot.login(MY_TOKEN);