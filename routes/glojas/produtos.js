module.exports = function(app){
	var produtos = app.controllers.glojas.produtos
	
	//Faço a requisição de autenticação, e sempre chamo ele antes de renderizar 
	//qualquer página
	autenticar = require('../../middleware/autenticar-gLojas')

	/* Aponta para controllers/home */
	app.route('/gLojas/produtos')
		.get(autenticar, produtos.index)

	app.route('/gLojas/dellproduto/:id')
		.get(autenticar,produtos.dellproduto)

	app.route('/gLojas/produtos/adicionar')
		.get(autenticar,produtos.addindex)
		.post(autenticar,produtos.addproduto)

	app.route('/gLojas/produtos/alterar/:id')
		.get(autenticar,produtos.alterar)
		.post(autenticar,produtos.salvaralteracao)

		
}