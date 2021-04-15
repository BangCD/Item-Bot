const Discord= require("discord.js");
const mongo= require('../mongo');
const itemSchema=require('../schemas/item-schema.js')

module.exports={
    name:'find',
    description:'find item from database using name',


    async execute(message,args){ 

        if(!args.length){
            return message.channel.send(`${message.author} There was no input,Command: ${message} ,your input: ${args}`)
        }
    
        const rawMessage=message.content.slice(6); //Removes the "#find " from the original message
        const values=rawMessage.split(';');   //Splits the message with ";"
    
    
        await mongo().then(async(mongoose)=>{
            try{
                console.log('connected to mongo for display')
    
                const result= await itemSchema.findOne(
                    {
                        Name:`${values[0]}`
                    },
                    {
                        '_id':0,
                        '__v':0,
                    }
                )+''
               
                const res= result.slice(2,-2).split("',");
                const name= res[0].split(": '");
                const type= res[1].split(": '");
                const mat= res[2].split(": '");
                const encha= res[3].split(": '");
                const lore= res[4].split(": '");
                const from= res[5].split(": '");
                const ava= res[6].split(": '");
                
              
                
                const itemEmbed= new Discord.MessageEmbed()
                .setColor('ffa500')
                .setTitle(`${name[1]}`)
                .setThumbnail('https://i.imgur.com/Pwma52X.jpg')
                .addFields(
                    {name:"Item name",value:`${name.pop()}`},
                    {name:"Type",value:`${type.pop()}`},
                    {name:"Material",value:`${mat.pop()}`},
                    {name:"Enchantments",value:`${encha.pop()}`},
                    {name:"Lore",value:`${lore.pop()}`},
                    {name:"From",value:`${from.pop()}`},
                    {name:"Avalability ",value:`${ava.pop()}`},
                )
                .setTimestamp();
                    message.channel.send(itemEmbed);
            }
            finally{
                console.log('mongo closed')
            mongoose.connection.close()
            }
        })
    }


    }