var sequelize = require ('sequelize');
var Sequelize = require ('../index.js');


const Usuarios = Sequelize.define('tb_usuarios', {
	Nome: sequelize.STRING,
	Usuario: sequelize.STRING,
	Senha: sequelize.STRING,
	Loja: sequelize.INTEGER,
	Grupo:  sequelize.INTEGER
	});

module.exports.usuarios = Usuarios

/*Usuarios.sync({force: true}).then(() => {
	  // Table created
	  return Usuarios.create({
	    Nome:'Guilherme Branquinho',
	    Usuario:'guilherme',
	    Senha:'branquinho',
	    Loja:0,
	    Grupo:1
	  });
	});*/