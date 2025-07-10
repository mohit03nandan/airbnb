const express = require('express');
const {createItem,deleteItem} = require("../controllers/ListingControllers")
const verifytoken  = require("../middlewares/verifyToken")
const router = express.Router();


router.post('/createItem',verifytoken,createItem)
router.post('/deleteItem',verifytoken,deleteItem)


module.exports = router