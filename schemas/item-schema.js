const mongoose=require('mongoose')

const reqString={
    type:String,
    required:true,
}

const itemSchema=mongoose.Schema({
    Name:reqString,
    Type:reqString,
    Material:reqString,
    Enchantments:reqString,
    Lore:reqString,
    From:reqString,
    Availability:reqString,
})

module.exports=mongoose.model('Items',itemSchema)