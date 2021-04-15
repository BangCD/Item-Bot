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

//    if(!args.length){
//        return message.channel.send(`There was no input,${message.author},Command: ${mongoCommand} ,your input: ${args}`); 
//    }

//    const rawMessage=message.content.slice(5); //Removes the "#add" from the original message
//    const values=rawMessage.split(';');   //Splits the message with ";"
   
//    if(values.length==7) {
//    await mongo().then(async(mongoose)=>{
//     try{
//         console.log('Connected to mongo for inserting items')
//         const item={
//             Name:`${values[0]}`,
//             Type:`${values[1]}`,
//             Material:`${values[2]}`,
//             Enchantments:`${values[3]}`,
//             Lore:`${values[4]}`,
//             From:`${values[5]}`,
//             Availability:`${values[6]}`,
//         }
//         await new itemSchema(item).save()
//         message.channel.send(`Item added.  ${values}`)
//     }
//     finally{
//         console.log('mongo closed')
//         mongoose.connection.close()
       
//     }

//    })
//    }
//    else{
//        message.channel.send(`${message.author} A required values is missing or an extra values was inserted, please input again in the correct format. Your input: ${values}`)
//    }
}

//UPDATE ITEMS AVALABILITY BY ITEM NAME IN DATABASE 
else if(mongoCommand==='updateava'){
    client.commands.get('updateava').execute(message,args);
//     if(!args.length){
//         return message.channel.send(`There was no input,${message.author},Command: ${mongoCommand} ,your input: ${args}`);
//     }
//     const rawMessage=message.content.slice(11); //Removes the "#updateava " from the original message
//     const values=rawMessage.split(';');   //Splits the message with ";"

//     if(values.length==2){
//     await mongo().then(async(mongoose)=>{
//         try{
//             console.log('connected to mongo for updating availabilty')
//             const result = await itemSchema.findOneAndUpdate(
//                 {
//                     Name:`${values[0]}`
//                 },
//                 {
//                     Availability:`${values[1]}`
//                 },
//                 {
//                     new:true,
//                 }
//             )
//             console.log('RESULT:', result)
            
//             message.channel.send(`Item updated.  ${result}`)

//         }
//         finally{
//             console.log('mongo closed')
//             mongoose.connection.close()
//         }

//     })
// }
// else{
//     message.channel.send(`${message.author} A required values is missing or an extra values was inserted, please input again in the correct format. Your input: ${values}`)
// }
}

// UPDATE ITEM COMPLETLY BY ITEM NAME 
else if(mongoCommand==='update'){
    client.commands.get('update').execute(message,args);
//     if(!args.length){
//         return message.channel.send(`There was no input,${message.author},Command: ${mongoCommand} ,your input: ${args}`);
//     }
//     const rawMessage=message.content.slice(8); //Removes the "#update " from the original message
//     const values=rawMessage.split(';');   //Splits the message with ";"

//     if(values.length==7){
//     await mongo().then(async(mongoose)=>{
//         try{
//             console.log('connected to mongo for update')
//             const result = await itemSchema.findOneAndUpdate(
//                 {
//                     Name:`${values[0]}`
//                 },
//                 {
//                     Type:`${values[1]}`,
//                     Material:`${values[2]}`,
//                     Enchantments:`${values[3]}`,
//                     Lore:`${values[4]}`,
//                     From:`${values[5]}`,
//                     Availability:`${values[6]}`,
//                 },
//                 {
//                     new:true,
//                 }
//             )
//             console.log('RESULT:', result)
            
//             message.channel.send(`Item updated.  ${result}`)

//         }
//         finally{
//             console.log('mongo closed')
//             mongoose.connection.close()
//         }

//     })
// }
// else{
//     message.channel.send(`${message.author} A required values is missing or an extra values was inserted, please input again in the correct format. Your input: ${values}`)
// }
}

//DELETE ITEM FROM DATABASE USING NAME 
else if(mongoCommand==='delete'){
    client.commands.get('delete').execute(message,args);

    // if(!args.length){
    //     return message.channel.send(`${message.author} A required values is missing or an extra values was inserted, please input again in the correct format. Your input: ${args}`)
    // }
    // const rawMessage=message.content.slice(8); //Removes the "#delete " from the original message
    // const values=rawMessage.split(';');   //Splits the message with ";"

    // await mongo().then(async(mongoose)=>{
    //     try{
    //         console.log('connected to mongo for delete')
    //         await itemSchema.deleteOne(
    //             {
    //                 Name:`${values[0]}`
    //             }
    //         )
    //         message.channel.send(`Item ${values[0]} was deleted`)
    //     }
    //     finally{
    //         console.log('mongo closed')
    //         mongoose.connection.close()
    //     }
    // })
}

//FIND ITEMS FROM DATABASE 
else if(mongoCommand==='find'){
    client.commands.get('find').execute(message,args);

//     if(!args.length){
//         return message.channel.send(`${message.author} A required values is missing or an extra values was inserted, please input again in the correct format. Your input: ${values}`)
//     }

//     const rawMessage=message.content.slice(6); //Removes the "#find " from the original message
//     const values=rawMessage.split(';');   //Splits the message with ";"


//     await mongo().then(async(mongoose)=>{
//         try{
//             console.log('connected to mongo for display')

//             const result= await itemSchema.findOne(
//                 {
//                     Name:`${values[0]}`
//                 },
//                 {
//                     '_id':0,
//                     '__v':0,
//                 }
//             )+''
//            // console.log('Result: ',result)
//             const res= result.slice(2,-2).split("',");
//             const name= res[0].split(": '");
//             const type= res[1].split(": '");
//             const mat= res[2].split(": '");
//             const encha= res[3].split(": '");
//             const lore= res[4].split(": '");
//             const from= res[5].split(": '");
//             const ava= res[6].split(": '");
            
//            // console.log(name);
            
//             const itemEmbed= new Discord.MessageEmbed()
//             .setColor('ffa500')
//             .setTitle(`${name[1]}`)
//             .setThumbnail('https://i.imgur.com/Pwma52X.jpg')
//             .addFields(
//                 {name:"Item name",value:`${name.pop()}`},
//                 {name:"Type",value:`${type.pop()}`},
//                 {name:"Material",value:`${mat.pop()}`},
//                 {name:"Enchantments",value:`${encha.pop()}`},
//                 {name:"Lore",value:`${lore.pop()}`},
//                 {name:"From",value:`${from.pop()}`},
//                 {name:"Avalability ",value:`${ava.pop()}`},
//             )
//             .setTimestamp();
//                 message.channel.send(itemEmbed);
//         }
//         finally{
//             console.log('mongo closed')
// 		mongoose.connection.close()
//         }
//     })
//    // message.channel.send(`this is what u gave me: ${args}`);
//     //message.channel.send(`this is what u gave me: ${values[0]}`);
}











});//client.on CLOSE

client.login(token);