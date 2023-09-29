const Article = require('../models/article.model');

//show all articles - index page
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('index', {
                articles: data
            })
        }
    })
};

//show article by this slug
const getArticleBySlug = (req, res) => {
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving article data'
            })
        } else {
            console.log(data)
            res.render('article', {
                article: data
            })
        }
    })
};

//create new article
const createNewArticle = (req, res) => {
    //new article from POST data (example from form)
    const newArticle = new Article({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id,
    })

    Article.createNew(newArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred sending article data'
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
};
const showArticle = (req, res) => {
    Article.getById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred getting article by id'
            })
        } else {
            console.log(data)
            res.render('edit', {
                article: data
            })
        }
    })
}
const updateArticle = (req, res) => {
    //update article from POST data
    const updatedArticle = new Article({
        id: req.params.id,
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: req.body.published,
        author_id: req.body.author_id
    })

    Article.updateById(updatedArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred updating article data'
            })
        } else {
            console.log(data)
            //shows all the articles
            res.redirect(`/`)
        }
    })
}

const deleteArticle = (req, res) => {
    Article.deleteById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred deleting article data'
            })
        } else {
            console.log(data)
            //shows all the articles
            res.redirect(`/`)
        }
    })
}


//display article form
const showNewArticleForm = (req, res) => {
    res.render('create_article')
};
//export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm,
    showArticle,
    updateArticle,
    deleteArticle
};
