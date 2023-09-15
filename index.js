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

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const articleRoutes = require('./routes/article');//import article route

//to use article routes
app.use('/', articleRoutes);
app.use('/article', articleRoutes)

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