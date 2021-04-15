const mongo= require('../mongo');
const itemSchema=require('../schemas/item-schema.js')

module.exports={
    name:'add',
    description:'add item into the  database',

    

    async execute(message,args){
        if(!args.length){
            return message.channel.send(`${message.author} There was no input,Command: ${message} ,your input: ${args}`); 
        }
     
        const rawMessage=message.content.slice(5); //Removes the "#add" from the original message
        const values=rawMessage.split(';');   //Splits the message with ";"
        
        if(values.length==7) {
        await mongo().then(async(mongoose)=>{
         try{
             console.log('Connected to mongo for inserting items')
             const item={
                 Name:`${values[0]}`,
                 Type:`${values[1]}`,
                 Material:`${values[2]}`,
                 Enchantments:`${values[3]}`,
                 Lore:`${values[4]}`,
                 From:`${values[5]}`,
                 Availability:`${values[6]}`,
             }
             await new itemSchema(item).save()
             message.channel.send(`Item added.  ${values}`)
         }
         finally{
             console.log('mongo closed')
             mongoose.connection.close()
            
         }
     
        })
        }
        else{
            message.channel.send(`${message.author} A required values is missing or an extra values was inserted, please input again in the correct format. Your input: ${values}`)
        }





    }

}