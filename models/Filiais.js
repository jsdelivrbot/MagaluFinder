var sequelize = require ('sequelize');
var Sequelize = require ('../index.js');
	
	const Filiais = Sequelize.define('tb_filiais',{
		CodFilial:sequelize.INTEGER,
		Descricao:sequelize.STRING,
		Endereco:sequelize.STRING,
		Bairro:sequelize.STRING,
		Cidade:sequelize.STRING,
		Cep:sequelize.STRING,
		Latitude:sequelize.STRING,
		Longitude:sequelize.STRING
	})
	module.exports.filiais = Filiais;


	/*Filiais.sync({force: true}).then(() => {
	  // Table created
	  return Filiais.create({
	  	CodFilial:'500',
		Descricao:'Loja1 Franca',
		Endereco:'Rua do Comercio, 1924',
		Bairro:'centro',
		Cidade:'Franca-SP',
		Cep:'14400-660',
		Latitude:'-20.536227',
		Longitude:'-47.401677'
	  });
	});*/