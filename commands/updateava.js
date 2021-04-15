const mongo= require('../mongo');
const itemSchema=require('../schemas/item-schema.js')

module.exports={
    name:'updateava',
    description:'update item avalability in database using name',


    async execute(message,args){
    if(!args.length){
        return message.channel.send(`${message.author} There was no input,Command: ${message} ,your input: ${args}`);
    }
    const rawMessage=message.content.slice(11); //Removes the "#updateava " from the original message
    const values=rawMessage.split(';');   //Splits the message with ";"

    if(values.length==2){
    await mongo().then(async(mongoose)=>{
        try{
            console.log('connected to mongo for updating availabilty')
            const result = await itemSchema.findOneAndUpdate(
                {
                    Name:`${values[0]}`
                },
                {
                    Availability:`${values[1]}`
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
