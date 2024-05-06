const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: "*"
    })
)


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'post_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/post_data', (req, res) => {
    const sql = "SELECT * FROM posts";
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving posts:', err);
            res.status(500).send('Error retrieving posts');
            return;
        }
        res.json(result);
    });
});

app.post('/make_post', (req, res) => {
    const post_title = req.body.title
    const post_author = req.body.author
    const post_content = req.body.content
    const post_date = req.body.date
    const sql = "INSERT INTO posts (Title, Author, Content, Date) VALUES (?,?,?,?)"
    connection.query(sql, [post_title,post_author,post_content, post_date], (err, result) => {
        if (err) {
            console.error('Error making post:', err);
            res.status(500).send('Error making post');
            return;
        }
        res.status(200).send("Successfull");
        console.log("added")
    });
    
});


app.get('/post/:postId', (req, res) => {
    try {
        const postId = req.params.postId;
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});