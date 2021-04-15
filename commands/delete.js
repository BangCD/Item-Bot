const mongo= require('../mongo');
const itemSchema=require('../schemas/item-schema.js')

module.exports={
    name:'delete',
    description:'delete item completly from database using name',


    async execute(message,args){ 

        if(!args.length){
            return message.channel.send(`${message.author} There was no input,Command: ${message} ,your input: ${args}`)
        }
        const rawMessage=message.content.slice(8); //Removes the "#delete " from the original message
        const values=rawMessage.split(';');   //Splits the message with ";"
    
        await mongo().then(async(mongoose)=>{
            try{
                console.log('connected to mongo for delete')
                await itemSchema.deleteOne(
                    {
                        Name:`${values[0]}`
                    }
                )
                message.channel.send(`Item ${values[0]} was deleted`)
            }
            finally{
                console.log('mongo closed')
                mongoose.connection.close()
            }
        })
    }


    }