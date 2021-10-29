const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((dbCategory) => {
      if (dbCategory.length) {
        res.status(200).json(dbCategory);
      } else {
        res.status(404).json({ message: "No Category found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occurred", err: err });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.body.id,
    },
    include: {
      Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  }).then((dbCategory) => {
    if (!dbCategory) {
      res.status(404).json({ message: "No Category found!" });
    } else {
      console.log(err);
      res.status(500).json({ message: "an error occurred", err: err });
    }
  });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategory) => res.status(200).json(dbCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "an error occurred", err: err });
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(404).json({ message: "No Category found with this ID!" });
        return;
      } else {
        res.status(200).json(dbCategory);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(404).json({ message: "No Category found with this id!" });
      } else {
        res.status(200).json(dbCategory);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
