module.exports = function(app){
	var lojas = app.controllers.glojas.lojas
	
	//Faço a requisição de autenticação, e sempre chamo ele antes de renderizar 
	//qualquer página
	autenticar = require('../../middleware/autenticar-gLojas')

	/* Aponta para controllers/home */
	app.route('/gLojas/lojas')
		.get(autenticar, lojas.index)

	app.route('/gLojas/dellloja/:id')
		.get(autenticar,lojas.dellloja)

	app.route('/gLojas/lojas/adicionar')
		.get(autenticar,lojas.addindex)
		.post(autenticar,lojas.addloja)

	app.route('/gLojas/lojas/alterar/:id')
		.get(autenticar,lojas.alterar)
		.post(autenticar,lojas.salvaralteracao)

		
}