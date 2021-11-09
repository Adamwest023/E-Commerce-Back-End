const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  }
  )
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    // be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  }).then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'no category found with this id.' })
    }
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.post({
    category_name: req.body.category_name,
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      // update a category by its `id` value
      where: {
        id: req.params.id
      }
    }
  ).then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(400).json({ message: 'No category found with this id' });
      return;
    } res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
     where: { 
       id:req.params.id 
      }
    }
  ).then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(500).json({ message: 'no category could be deleted from this id'})
    }
  })
  // delete a category by its `id` value
});

module.exports = router;
