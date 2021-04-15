const mongo= require('../mongo');
const itemSchema=require('../schemas/item-schema.js')

module.exports={
    name:'update',
    description:'update item completly in database using name',


    async execute(message,args){

        if(!args.length){
            return message.channel.send(`${message.author} There was no input,Command: ${message} ,your input: ${args}`);
        }
        const rawMessage=message.content.slice(8); //Removes the "#update " from the original message
        const values=rawMessage.split(';');   //Splits the message with ";"
    
        if(values.length==7){
        await mongo().then(async(mongoose)=>{
            try{
                console.log('connected to mongo for update')
                const result = await itemSchema.findOneAndUpdate(
                    {
                        Name:`${values[0]}`
                    },
                    {
                        Type:`${values[1]}`,
                        Material:`${values[2]}`,
                        Enchantments:`${values[3]}`,
                        Lore:`${values[4]}`,
                        From:`${values[5]}`,
                        Availability:`${values[6]}`,
                    },
                    {
                        new:true,
                    }
                )
                console.log('RESULT:', result)
                
                message.channel.send(`Item updated.  ${result}`)
    
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
