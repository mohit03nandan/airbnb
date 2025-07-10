const express = require('express');
const {createItem} = require("../controllers/ListingControllers")
const verifytoken  = require("../middlewares/verifyToken")
const router = express.Router();


router.post('/createItem',verifytoken,createItem)

module.exports = router