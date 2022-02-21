const express = require('express');
const router = express();
const categoryController = require('../controller/categoryController');

router.post('/addCategory', categoryController.addCategory);

router.get('/category',categoryController.category);

router.get('/showEditCategory',categoryController.xyz);


router.post('/multiDeleteCategory', categoryController.multiDeleteCategory);

router.get('/viewCategory/:id', categoryController.viewCategory);

router.post('/updateCategory/:id', categoryController.updateCategory);

router.get('/deleteCategory/:id', categoryController.deleteCategory);




module.exports = router;