//db connection
const con = require('../utils/db');

//constructor
const Article = (article) => {
    this.name = article.name
    this.slug = article.slug
    this.image = article.image
    this.body = article.body
    this.published = article.published
    this.author_id = article.author_id
};

//get all articles
Article.getAll = (result) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        articles = res
        console.log("articles: ", articles);
        result(null, articles);
    })
};

//get article by slug
Article.getBySlug = (slug, result) => {
    let query = `SELECT * FROM author INNER JOIN article ON article.author_id = author.id WHERE slug = "${slug}"`
    con.query(query, (err, res) => {
        if (err) {
            console.log("Error in Article.getBySlug: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Article.getBySlug got the following article: ", res[0]);
            result(null, res[0]);
        }
    });
}

module.exports = Article;