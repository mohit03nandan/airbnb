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
      const exists = await prisma.place.findUnique({ where: { id } });
      if (!exists) {
        return null;
      }

      const data = await prisma.place.update({
        where: { id },
        data: {
          isdelete: true
        }
      });
      return data;
    } catch (error) {
      console.error("Service Error:", error.message);
      return null;
    }
  }
};


const UpdateItemservice = {
  update: async ({ id, name, description, location, price }) => {
    try {
      const exists = await prisma.place.findFirst({
        where: {
          id,
          isdelete: false
        }
      });

      if (!exists) {
        return null;
      }

      const data = await prisma.place.update({
        where: { id },
        data: {
          name,
          description,
          location,
          price
        }
      });

      return data;

    } catch (error) {
      console.error("Update Item Service Error:", error.message);
      return null;
    }
  }
};



module.exports = {createItemService,deletemItemservice,UpdateItemservice}
