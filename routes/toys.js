const express = require("express");
const { ToyModel, validateToy } = require("../models/toyModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await ToyModel.find({});
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/search", async (req, res) => {
  try {
    const search = req.query.s;

    if (!search) {
      return res.status(400).json({ msg: "Please enter search query" });
    }

    const toys = await ToyModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { info: { $regex: search, $options: "i" } }
      ]
    });

    res.json(toys);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/category/:catname", async (req, res) => {
  try {
    const catname = req.params.catname;

    const data = await ToyModel.find({
      category: { $regex: catname, $options: "i" }
    });

    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ToyModel.findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ msg: "Toy not found" });
    }

    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", async (req, res) => {
  const validBody = validateToy(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    const toy = new ToyModel(req.body);
    await toy.save();
    res.json(toy);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  const validBody = validateToy(req.body);

  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    const id = req.params.id;
    const data = await ToyModel.updateOne({ _id: id }, req.body);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ToyModel.deleteOne({ _id: id });
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
