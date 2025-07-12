const cron = require('node-cron');
const {prisma} = require('../config/db')
const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

 


  cron.schedule('* * 1 * * *', async () => {
    console.log('running a task every second');
    try {
        const allAdminsWithPlaces = await prisma.user.findMany({
            where: { role: 'admin' },
            include: {
              listings: {
                where: { isdelete: false }
              }
            }
          });
        console.log(allAdminsWithPlaces)
        for (const item of allAdminsWithPlaces) {
            let listingsText = '';
            if (item.listings.length === 0) {
                listingsText = 'No listings found.';
            } else {
                listingsText = item.listings.map((listing, idx) =>
                    `Listing #${idx + 1}:\n` +
                    `Name: ${listing.name}\n` +
                    `Description: ${listing.description}\n` +
                    `Location: ${listing.location}\n` +
                    `Price: ${listing.price}\n`
                ).join('\n');
            }
        
            const mailOption = {
                from: process.env.EMAIL_USER,
                to: item.email,
                subject: 'Your Daily Listings',
                text: `Hello ${item.name},\n\nHere are your listings:\n\n${listingsText}`
            };
            await transporter.sendMail(mailOption);
        }

    } catch (err) {
        console.error('Error fetching admins or sending email:', err);
    }
});

module.exports = cron;