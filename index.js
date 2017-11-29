const express = require('express');
var load 		= require('express-load'),
	sequelize 	= require('sequelize'),
	mysql		= require('mysql2'),
	session     = require('express-session'),
	flash 		= require('express-flash'),
	cookieParser= require('cookie-parser'),
	bodyParser  = require('body-parser'),
	cors 		= require('cors');

//Faz conexão com o banco de dados
const Sequelize = new sequelize('heroku_4e610a94c6e7504','b0c3820bc5640c','746880a7a6355ef',{
	host:'us-cdbr-iron-east-05.cleardb.net',
	dialect:'mysql'
});




//Verifica se conseguiu a conexão
Sequelize
	.authenticate()
	.then(() =>{
		console.log("Conexão estabelecida com sucesso!!")
	})
	.catch(err=> {
		console.error("Impossivel de conectar:", err);
	});
//Exporta a conexão
module.exports = Sequelize;



const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.get('/teste', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
  //.get('/', (req, res) => res.render('pages/index'))
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine', 'jade')
app.use(cookieParser());
app.use(session({ secret: 'branquim' }));
app.use(flash());
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



//Carregar rotas, modelos, etc.
load ('controllers')
	.then('routes')
	//.then('models')
	.into(app)