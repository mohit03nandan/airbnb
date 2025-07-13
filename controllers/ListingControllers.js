const {createItemService,deletemItemservice,UpdateItemservice,getItemsService} = require("../services/ListingService");
const { sendEmail } = require("../utils/emailUtils");
const {emailformat} = require("../static/emailformat")
const {cacheService} = require("../services/cacheService")


const createItem = async (req, res) => {
  try {
    const { name, description, location, price } = req.body;
    const adminId = req.user.id;
    if (!name || !description || !location || !price || !adminId) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const data = await createItemService.create({
      name,
      description,
      location,
      price,
      adminId,
    });
    if (data) {
      try {
        const text = emailformat({name,description,location,price})
        await sendEmail({
          to: req.user.email,
          subject: text,
          text: `Your Item ${name}`,
        });
      } catch (error) {
        console.error("Email sending failed:", error);
      }
      return res.status(201).json({
        message: "Item list successfully",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong !!!!!!",
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please provide the item ID",
      });
    }
    const data = await deletemItemservice.delete({ id });
    if (data) {
      return res.status(200).json({
        message: "Item deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, name, description, location, price } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please Provide The Item Id",
      });
    }
    const data = await UpdateItemservice.update({
      id,
      name,
      description,
      location,
      price,
    });
    if (data) {
      return res.status(200).json({
        message: "Item update successfully",
      });
    } else {
      return res.status(404).json({
        message: "Item not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

const getItems = async (req, res) => {
  try {
    const data = await cacheService.getCache("items");
    if (data) {
      return res.status(200).json({
        message: "Items fetched successfully",
        data,
      });
    } else {
      const data = await getItemsService.getItems();
      await cacheService.setCache("items", data);
      return res.status(200).json({
        message: "Items fetched successfully",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong !!!",
    });
  }
};

module.exports = { createItem, deleteItem, updateItem,getItems };
