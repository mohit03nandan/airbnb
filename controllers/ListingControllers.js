const {createItemService,deletemItemservice} = require("../services/ListingService")

const createItem = async(req,res) =>{
   try {
       const {name,description,location,price} = req.body;
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

const deleteItem = async(req,res) =>{
   try {
       const {id} = req.body;
      if (!id) {
        return res.status(400).json({
          message: "Please provide the item ID",
        });
      }
       const data = await deletemItemservice.delete({id});
       console.log(data)
       if(data){
          return res.status(200).json({
            message : "Item deleted successfully"
          })
       }else{
        return res.status(404).json({
          message: "Item not found",
        });
       }
   } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
   }
}


module.exports = {createItem,deleteItem}