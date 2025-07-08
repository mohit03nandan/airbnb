const bcrypt = require('bcryptjs');
const { prisma } = require('../config/db');

const registerService = {
  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  register: async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }
};

const Loginservice = {
  userfindByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  userpassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = { registerService, Loginservice };
