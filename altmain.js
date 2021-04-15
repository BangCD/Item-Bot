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

else if(mongoCommand==='helpfind'){
     message.channel.send(' ``` To find an item use "#find" "item name". Example- #find Chainmail Coif ``` ')
    
}

else if(mongoCommand==='helpadmin'){

    message.channel.send('  To __**ADD**__ an item into the Database use `"#add" "item name;item type;material;enchantments;lore;From;Avalability"` make us of ";" after each category. Example- ```"#add Chainmail Coif;Helmet;Chainmail;Mending, Prot IV, Unbreaking III;A tough hood of steel rings.;Super Crate;No"``` \n To __**Update**__ an item completly that already exists in the Database use `"#update" "item name;item type;material;enchantments;lore;From;Avalability"`  Example- ```"#update Chainmail Coif;Helmet;Chainmail;Mending, Prot II, Unbreaking II;A tough hood of steel rings.;Weekly Crate;No"``` \n To Update just the avalability of an item that already exists in the Database use `"#updateava" "item name;Avalability"` Example- ```"#updateava" "Chainmail Coif;Yes"``` \n To __**Delete**__ an item completly that already exists in the Database use `"#delete" "item name"` Example- ```"#delete" "Chainmail Coif"``` ')
}












});//client.on CLOSE

client.login(token);