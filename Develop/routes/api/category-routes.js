const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get Categories'});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = await Category.findByPk(req.params.id, { include: [{ model: Product }]});
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json({message: 'Failed to Find Category'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Failed to Create Category'});
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   const categoryId = parseInt(req.params.id, 10);
//   //links products associated with category id
//   const linkedProducts = await Product.findAll({ where: { category_id: categoryId } });
//   //if there are any products (more than 0), then delete products with category
//   if (linkedProducts.length > 0) {
//     await Product.destroy({ where: { category_id: categoryId } });
//   }
//   try {
//     const deletedCategory = await Category.destroy({
//       where: {
//         id: categoryId
//       }
//     });
//     res.status(200).json({ message: 'Category deleted successfully'});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  //finds category id
  const categoryId = parseInt(req.params.id, 10);
  //if category id isn't a number, return error
  if (isNaN(categoryId)) {
    return res.status(400).json({ message: 'Invalid category ID'});
  }

  try {
  //links products associated with category id
  const linkedProducts = await Product.findAll({ where: { category_id: categoryId } });
  //if there are any products (more than 0), then delete products with category
  if (linkedProducts.length > 0) {
    await Product.destroy({ where: { category_id: categoryId } });
  }
  //variable for items to delete
  const deleted = await Category.destroy({
    where: { id: categoryId }
  });

    //if the item doesn't exist, error
    if (deleted === 0) {
      return res.status(404).json({ message: 'Category not found'});
    }
    //if it does exist, it deletes
    res.status(200).json({ message: 'Category deleted successfully'});
  } catch (err) {
      //errors if it can't delete
      console.error('Error deleting category:', err);
      res.status(500).json({ message: 'Failed to delete category', error: err.message});
  }
});

module.exports = router;