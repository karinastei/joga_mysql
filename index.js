//application packages
const express = require('express')
const app = express()

const path = require('path')
//add template engine
const hbs = require('express-handlebars');
//setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))
//setup static public directory
app.use(express.static('public'));

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//create database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to joga_mysql db")
})

//show all articles - index page
app.get('/', (req, res) => {
    let query = "SELECT * FROM article, author";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        console.log(articles)
        res.render('index', {
            articles: articles
        })
    })
});

//show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT * FROM article LEFT JOIN author ON article.author_id = author.id WHERE slug ="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    });
});

//show author by this slug
app.get('/author_id/:author_id', (req, res) => {
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
});
//app start point
app.listen(3000, (localhost) => {
    console.log('App is started at http://localhost:3000')
});