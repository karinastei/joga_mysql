const express = require('express');
//get using express router
const router = express.Router();
//define article controller and export it for this file
const articleController = require('../controllers/article');

//use controller function according to the route
router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);
//kui lihtsalt /create panin siis töötas, õpsil oli '/article/create'
router.get('/create', articleController.showNewArticleForm);
router.post('/create', articleController.createNewArticle);


//export article router for using in default application file
module.exports = router;