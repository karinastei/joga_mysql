const express = require('express');
//get using express router
const router = express.Router();
//define article controller and export it for this file
const authorController = require('../controllers/author');

//use controller function according to the route
router.get('/:author_id', authorController.getAuthorArticle);

//export article router for using in default application file
module.exports = router;