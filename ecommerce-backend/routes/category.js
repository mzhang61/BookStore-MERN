const express = require('express');
const router = express.Router();

const { create , categoryById, read, update, remove, list} = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById} = require("../controllers/user");


router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
//every time thre's userId on the route, the method userById will run
router.param('userId', userById);

module.exports = router;