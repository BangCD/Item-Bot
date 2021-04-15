# Item-Bot
config.json-
- "token" : Add your discord bot token here
- "mongoPath": Add the path to you mongodb database.
 

Commands- 

- Find- To find an item use "#find" "item name". 
Example- #find Chainmail Coif

- Add- To __**ADD**__ an item into the Database use `"#add" "item name;item type;material;enchantments;lore;From;Avalability"` make us of ";" after each category. 
Example- `"#add Chainmail Coif;Helmet;Chainmail;Mending, Prot IV, Unbreaking III;A tough hood of steel rings.;Super Crate;No`

- Update- To __**Update**__ an item completly that already exists in the Database use `"#update" "item name;item type;material;enchantments;lore;From;Avalability"`
Example- `"#update Chainmail Coif;Helmet;Chainmail;Mending, Prot II, Unbreaking II;A tough hood of steel rings.;Weekly Crate;No"`

- Updateava - To Update just the avalability of an item that already exists in the Database use `"#updateava" "item name;Avalability"` 
Example-`"#updateava" "Chainmail Coif;Yes"`

- Delete- To __**Delete**__ an item completly that already exists in the Database use `"#delete" "item name"` 
Example- "#delete" "Chainmail Coif"
*************************************
The mongodb schema uses 
- Name (Name of the item)
- Type (Type of the item, Ex- Helmet, pickaxe, music disc)
- Material (What material the item is made of, Example-Gold, Diamond, Pigstep, "None" (if the item doesnt have multiple material type) )
- Enchantment (All the enchantments that item contains, Example- "Mending, Prot IV, Unbreaking III" , " Prot IV & Unbreaking III " , "None"(if item doesnt have enchantments) )
- Lore (Lore of the item, Example- "For a Knight in Shining Armour!" , "A tough hood of steel rings."  "None"(if item doesnt have lore) )
- From (Place where this item is from, Example-Super Crate, Weekly Crate, Halloween 2020 prize)
- Availability (If the item is still obtainable, Yes/ No)

All these are required fields when inputting in mongodb.
