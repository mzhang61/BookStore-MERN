const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update, purchaseHistory} = require("../controllers/user");

//http://localhost:8000/api/secret/63267f54b5aee52dffc9e2e4
router.get('/secret/:userId',requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
}) ;

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);
//every time thre's userId on the route, the method userById will run
router.param('userId', userById);


module.exports = router;