const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize') // ORM
const crypto = require('crypto');

const sequelize = new Sequelize('crud_app', 'server', 'zaq1@WSX', {
  host: 'localhost',
  dialect: 'mysql'
})

const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected")
  } catch (err) {
    console.error('Unable to connect');
  }
}

// Data Base Models
const Users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  permissions: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

const Sessions = sequelize.define('sessions', {
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sessionid: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  }
})

const Recipes = sequelize.define('recipes', {
  title: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.JSON,
    allowNull: false
  },
  steps: {
    type: DataTypes.JSON,
    allowNull: false
  },
  images: {
    type: DataTypes.JSON,
  },
  icon: {
    type: DataTypes.STRING(45)
  }
})

const Server = express();
const PORT = 3001;

Server.use(cors());
Server.use(express.json());
Server.use(bodyParser.urlencoded({extended: false}));

// METHOD GET

/* Get Server Status */
Server.get('/api/status', (req, res) => {
  res.sendStatus(200);
})

/* Get All Recipes From DB */
Server.get('/api/get/recipes', async (req, res) => {
  await Recipes.findAll({raw: true}).then((result) => {
    if (result !== undefined && result) res.send(result);
    else res.sendStatus(404);
  })
})

/* Get Single Recipe From DB */
Server.get('/api/get/recipes/:id', async (req, res) => {
  await Recipes.findOne({where: {id: req.params.id}}).then((result) => {
    if (result !== undefined && result) res.send(result.dataValues);
    else res.sendStatus(404);
  })
})

/* Get Image From Server */
Server.get('/api/get/image/:name', async (req, res) => {
  if (req.params.name === null) res.sendStatus(404);
  else {
    const options = {
      root: './images'
    }
    res.sendFile(req.params.name, options);
  }
})

// METHOD POST

Server.post('/api/post/create-recipe', async (req, res) => { 
  
  const data = {
    title: req.body.title, 
    description: req.body.description,
    ingredients: JSON.stringify(req.body.ingredients),
    steps: JSON.stringify(req.body.steps), 
    images: JSON.stringify(req.body.files),
    icon: req.body.icon
  }

  await Recipes.create({
    title: data.title, 
    description: data.description, 
    ingredients: data.ingredients, 
    steps: data.steps, 
    images: data.images,
    icon: data.icon
  }, { fields: ['title', 'description', 'ingredients', 'steps', 'images', 'icon']}).then( (result) => {
    res.send(result);
  })
})

// METHOD DELETE

Server.delete('/api/delete/delete-recipe/:id', async (req, res) => {
  await Recipes.destroy({ where:  {id: req.params.id }})
    .then((result) => res.sendStatus(200));
})

// USER AUTHENTICATION
Server.post('/api/auth/login', async (req, res) => {
  Users.findOne({where: {
    username: req.body.username,
    password: req.body.password
  }}).then( (result) => {
    if (result) {
      const data = {
        id: result.getDataValue('id'),
        sessionId: crypto.randomBytes(32).toString('hex')
      }
      
      Sessions.create({
        userid: data.id,
        sessionid: data.sessionId
      }).then( (result) => {
        if (result) res.send(data.sessionId);
        else res.send(null)
      })

    } else res.send(null)
  } )
})

Server.get('/api/auth/validate/:sessionid', async (req, res) => {
  Sessions.findOne({where: {
    sessionid: req.params.sessionid
  }})
    .then( (result) => {
      console.log(result);
      if (result) res.sendStatus(200)
      else res.sendStatus(204)
    })
})

Server.get('/api/get/userPermissionLevel/:sessionid', (req, res) => {
  Users.findOne({where: {
    id: Sessions.findOne({where: {
      sessionid: req.props.sessionid
    }})
  }})
    .then( (result) => {
      if (result) res.send(result.getDataValue('permissions'))
      else res.sendStatus(204);
    })
})

Server.delete('/api/auth/logout/:sessionid', (req, res) => {
  Sessions.destroy({where: {
    sessionid: req.params.sessionid
  }})
    .then( (result) => {
      if (result) res.sendStatus(200);
      else res.sendStatus(204);
    })
})



Server.listen(PORT, () => {
  console.log("Listening on port 3001");
})

