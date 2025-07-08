const bcrypt = require('bcryptjs');
const { prisma } = require('../config/db');

const registerService = {
  // Check if user already exists
  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  // Register new user
  register: async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // role: 'user' // optional if you added role field
      },
    });

    return user;
  }
};

module.exports = { registerService };
