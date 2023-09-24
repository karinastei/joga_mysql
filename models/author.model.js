//db connection
const con = require('../utils/db');

//constructor
const Author = (author) => {
    this.author_id = author.author_id
    this.author_name = author.author_name
};

//get author by author_id
Author.getAuthor = (author_id, result) => {
    let getAuthorQuery = `SELECT article.*, author.author_name FROM article INNER JOIN author ON article.author_id = author.id WHERE author.id = ?;`;
    con.query(getAuthorQuery, [author_id], (err, res) => {
        if (err) {
            console.log("Error in Author.getAuthor: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            const authorData = {
                author_id: res[0].id,
                author_name: res[0].author_name,
                articles: res,
            };
            console.log("Author.getAuthor returned the following data: ", authorData);
            result(null, authorData);
        }
    });
};

module.exports = Author;
