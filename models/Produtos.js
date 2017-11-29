var sequelize = require ('sequelize');
var Sequelize = require ('../index.js');
	
	const Produtos = Sequelize.define('tb_produtos',{
		CodProduto:sequelize.INTEGER,
		Imagem:sequelize.STRING,
		Produto:sequelize.STRING,
		Descricao:sequelize.STRING(2000),
		Search:sequelize.STRING,
		ValorProduto:sequelize.DECIMAL(10,2)
	})
	module.exports.produtos = Produtos;


	/*Produtos.sync({force: true}).then(() => {
	  // Table created
	  return Produtos.create({
	    CodProduto:10002,
	    Imagem:"https://a-static.mlcdn.com.br/618x463/forno-de-embutir-eletrico-brastemp-gourmand-bo260arbna-inox-67l-grill-timer/magazineluiza/201074500/bf65d333ad8211710f9b719b6bb7f743.jpg",
	    Produto:'Forno de Embutir Elétrico Brastemp Gourmand - BO260ARBNA Inox 67L Grill Timer',
	    Descricao:'Somente o forno Brastemp Ative! Se adapta ao seu ritmo de vida ao acelerar o preparo dos alimentos e liberar tempo para poder fazer o que você gosta! Conta com rápido pré aquecimento que chega à temperatura de 200°C, 20% mais rápido. O antifingerprint é uma tecnologia aplicada na superfície do produto que faz com que as impressões digitais, poeiras e gorduras sejam facilmente removidas. Ele mantém aquecido, descongela e fermenta, além de possuir a função Pão Pizza. Ideal para quem não dispensa praticidade e sofisticação!',
		Search:'forno, fornos, brastemp',
		ValorProduto:1990.00
	  });
	});*/