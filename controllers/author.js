//import database connection
const con = require('../utils/db');

//show author by this slug
const getAuthor = (req, res) => {
    let query = `SELECT * FROM article JOIN author ON article.author_id = author.id WHERE author_id ="${req.params.author_id}"`
    let getName = `SELECT author_name FROM author WHERE id ="${req.params.author_id}"`
    let author
    con.query(query, (err, result) => {
        if (err) throw err;
        author = result
        console.log(author)
        con.query(getName, (err, nameResult) => {
            if (err) throw err;
            const author_name = nameResult[0].author_name;
            console.log(author_name)
            res.render('author', {
                author: author,
                author_name: author_name
            });
        });
    });
};

//export controller functions
module.exports = {
    getAuthor
};