const express  = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const Server = express();
const PORT = 3001;

const con = mysql.createConnection({
  host: 'localhost',
  user: 'server',
  password: 'zaq1@WSX',
  database: 'crud_app'
})

con.connect((err) => {
  if (err) throw err;
  console.log("Connected To DataBase");
})

Server.use(cors());
Server.use(express.json());
Server.use(bodyParser.urlencoded({extended: false}));

Server.get('/api/status', (req, res) => {
  res.sendStatus(200);
})

Server.get('/api/get/recipes', async (req, res) => {
  con.query("SELECT id, title, icon FROM recipes", (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
})

Server.get('/api/get/recipes/:id', async (req, res) => {
  const id = req.params.id;

  con.query("SELECT id, title, description, ingredients, steps, images FROM recipes WHERE id = ?", id, (err, result) => {
    if (err) console.log(err);
    res.send(result[0]);
  });

})

Server.get('/api/get/image/:name', async (req, res) => {
  const options = {
    root: path.join(__dirname, 'images'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile(req.params.name, options);
})

Server.post('/api/post/create-recipe', async (req, res) => { 
  
  const data = {
    title: req.body.title, 
    description: req.body.description,
    ingredients: JSON.stringify(req.body.ingredients),
    steps: JSON.stringify(req.body.steps), 
    images: JSON.stringify(req.body.files),
    icon: req.body.icon
  }

  const sql = "INSERT INTO recipes (title, description, ingredients, steps, images, icon) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(sql, [data.title, data.description, data.ingredients, data.steps, data.images, data.icon], (result, err) => {
    if (!err) res.sendStatus(200)
    else res.send(err);
  })
})


Server.listen(PORT, () => {
  console.log("Listening on port 3001");
})