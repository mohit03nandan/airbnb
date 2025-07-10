const {createItemService} = require("../services/ListingService")

const createItem = async(req,res) =>{
   try {
       const {name,description,location,price} = req.body;
       console.log(name,description,location,price)
       const adminId = req.user.id;
       if(!name || !description || !location || !price || !adminId){
          return res.status(400).json({
            message : "Please provide all required fields"
          })
       }

       const data = await createItemService.create({name,description,location,price,adminId});
       if(data){
           return res.status(201).json({
             message : "Item list successfully",
             data
           })
       }

   } catch (error) {
       return res.status(500).json({
          message : "something went wrong"
       })
   }
}

module.exports = {createItem}