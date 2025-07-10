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

module.exports = {createItemService}
