module.exports = function(app){
	var gprodutos = app.controllers.gprodutos
	
	//Faço a requisição de autenticação, e sempre chamo ele antes de renderizar 
	//qualquer página
	autenticar = require('../middleware/autenticar-gProdutos')

	/* Aponta para controllers/home */
	app.route('/gProdutos')
		.get(autenticar, gprodutos.index)
		
	app.route('/gProdutos/MinhaLoja')
		.get(autenticar, gprodutos.loja)

	app.route('/gProdutos/addLoja/:id')
		.get(autenticar, gprodutos.adicionar)

	app.route('/gProdutos/delLoja/:id')
		.get(autenticar, gprodutos.dell)
}