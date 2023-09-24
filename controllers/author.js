//show author by this slug
const Author = require('../models/author.model');

const getAuthorArticle = (req, res) => {
    Author.getAuthor(req.params.author_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            res.render('author', {
                author: data.articles,
                author_name: data.author_name
            })
        }
    })
};

//export controller functions
module.exports = {
    getAuthorArticle
};