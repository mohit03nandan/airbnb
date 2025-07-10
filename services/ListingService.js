const { prisma } = require('../config/db');

const createItemService = {
    create: async({name,description,location,price,adminId}) =>{
           const data = await prisma.place.create({
                data : {
                       name,
                       description,
                       location,
                       price : parseInt(price),
                       adminId
                }
           })
           return data
    }
}

const deletemItemservice = {
  delete: async ({ id }) => {
    try {
      console.log("inside data");
      
      const exists = await prisma.place.findUnique({ where: { id } });
      if (!exists) {
        console.log("Record not found");
        return null;
      }

      const data = await prisma.place.update({
        where: { id },
        data: {
          isdelete: true
        }
      });

      console.log("deleted data", data);
      return data;
    } catch (error) {
      console.error("Service Error:", error.message);
      return null;
    }
  }
};


module.exports = {createItemService,deletemItemservice}
