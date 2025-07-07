// const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma!");
  } catch (err) {
    console.error("❌ Failed to connect:", err.message);
  }
}

module.exports = { prisma, testConnection };
