const express = require('express');
const {testConnection} = require('../config/db')
const authRoutes = require("../routes/authRoutes");
const listingRoutes = require("../routes/ListingRoutes")
require("../jobs/dailyItem")
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())
app.use('/auth',authRoutes);
app.use('/listing',listingRoutes)

app.get('/',(req,res)=>{
     res.send("server run");
})

const PORT = process.env.PORT || 4999;

testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});