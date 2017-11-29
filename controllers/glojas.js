module.exports = function(app){
	//Importar local dos models para Sequelize
	var modelsProdutos 	= require('../models/Produtos');

	//Importar Models
	var Produtos = modelsProdutos.produtos

	var HomeController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			res.render('gLojas/index', {
				nome:req.session.nome,
				grupo:req.session.grupo
			})
			
		}
	}
	return HomeController

}