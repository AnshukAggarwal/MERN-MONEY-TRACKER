const express = require("express");
const router = express.Router();
const Category = require("../Models/categoryModel");

router.post("/add", async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name: name });
  try {
    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
