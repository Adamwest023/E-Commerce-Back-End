const router = require('express').Router();

const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
    ],
    include: [
      {
        model: Product,
        attributes: ['id']
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: { id: req.params.id },
    attributes: [
      'id'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id']
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No products by that tag' })
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: { id: req.params.id }
    }).then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'no tag found at the id' });
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.delete('/:id', (req, res) => {
  Tag.delete({
    where: { id: req.params.id }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'no tag found at the id' });
      }
      res.json(dbTagData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
      // delete on tag by its `id` value
    });
});

module.exports = router;
