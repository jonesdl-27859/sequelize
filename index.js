// module imports
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const Sequelize = require('Sequelize');
const app = express();
const router = express.Router();

// use json format for req body
app.use(bodyParser.json())

// connect to db
const sequelize = new Sequelize('Music', 'diane', null/*'database', 'username', 'password'*/, {
  host: 'localhost',
  dialect: 'sqlite', //'mysql'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: '/Users/ThedWord/Documents/coderCampBackEndFoundations/Sequelize/DataSources/Chinook_Sqlite_AutoIncrementPKs.sqlite'
});

// create models (define schema)
const Artist = sequelize.define(
  "Artist",
  {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  })
// API
// create
app.post('/artist', (req, res) => {
  Artist.findOrCreate({
    Name: req.body.name
  });
});

// read
app.get('/artist', (req, res) => {
  Artist.findAll().then(artists => {
    res.json(artists);
  });
});

// update
app.put('/artist/:id', (req, res) => {
  Artist.update(
    { Name: 'Kenny Rogers' },
    {
      where: {
        ArtistId: req.params.id
      }
    }
  ).then(result => {
    console.log(result);
  });
});

// delete
app.delete('/artist/id', (req, res) => {
  Artist.find({
    where: { ArtistId: req.params.id }
  }).then(artist => {
    artist.destroy();
  });
});
  // create API
  //app.get('/artist', (req, res) => {
  //Artist.findAll().then(artists => {
   // res.json(artists)
 // })
//})

// restful
// passport

// run server on port 3000
app.listen(3000, () => {
  console.log('server running')
})

module.exports = Artist;
