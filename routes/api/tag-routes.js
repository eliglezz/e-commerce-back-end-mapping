const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((dbTag) => res.status(200).json(dbTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { 
      id: req.params.id,
    },
    include: [{ model: Product }],
  })
    .then((dbTag) => {
      if (!dbTag) {
        res.status(404).json({ message: "No Tag found with this ID!" });
      } else {
        res.status(200).json(dbTag);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTag) => res.status(200).json(dbTag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.body.id,
    },
  })
    .then((dbTag) => {
      if (!dbTag) {
        res.status(404).json({ message: "No Tag with this ID!" });
      } else {
        res.status(200).json(dbTag);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((dbTag) => {
      if (!dbTag) {
        res.status(404).json({ message: "No Tag found with this ID!" });
      } else {
        res.status(200).json(dbTag);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;