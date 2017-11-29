var sequelize = require ('sequelize');
var Sequelize = require ('../index.js');


const LP = Sequelize.define('tb_lp', {
	Filial: sequelize.INTEGER,
	Produto: sequelize.INTEGER
	});

module.exports.lp = LP

/*LP.sync({force: true}).then(() => {
	  // Table created
	  return LP.create({
	    Filial:1,
	    Produto:10002
	  });
	});*/