const Discord= require("discord.js");
const fs=require('fs');
const  {token,prefix}=require('./config.json');
const mongo= require('./mongo');
const{Command}=require('discord.js-commando');
const itemSchema=require('./schemas/item-schema.js')

const client=new Discord.Client();
client.commands=new Discord.Collection();


const commandFiles= fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
}

client.once('ready',async()=>{
    console.log('Ready!');
});

client.on('message',async(message)=>{

if(!message.content.startsWith(prefix)||message.author.bot)return;
const args=message.content.slice(prefix.length).trim().split(' ');
const mongoCommand=args.shift().toLowerCase();


//ADD ITEMS TO DATABASE

if(mongoCommand==='add'){
client.commands.get('add').execute(message,args);
}

//UPDATE ITEMS AVALABILITY BY ITEM NAME IN DATABASE 
else if(mongoCommand==='updateava'){
    client.commands.get('updateava').execute(message,args);
}

// UPDATE ITEM COMPLETLY BY ITEM NAME 
else if(mongoCommand==='update'){
    client.commands.get('update').execute(message,args);
}

//DELETE ITEM FROM DATABASE USING NAME 
else if(mongoCommand==='delete'){
    client.commands.get('delete').execute(message,args);
}

//FIND ITEMS FROM DATABASE 
else if(mongoCommand==='find'){
    client.commands.get('find').execute(message,args);
}











});//client.on CLOSE

client.login(token);