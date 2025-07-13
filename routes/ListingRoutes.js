const express = require('express');
const {createItem,deleteItem,updateItem, getItems} = require("../controllers/ListingControllers")
const verifytoken  = require("../middlewares/verifyToken")
const router = express.Router();


router.post('/createItem',verifytoken,createItem)
router.post('/deleteItem',verifytoken,deleteItem)
router.post('/updateItem',verifytoken,updateItem)
router.get('/getItems',getItems)


module.exports = router