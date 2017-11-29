module.exports = function(app){
	var usuarios = app.controllers.glojas.usuarios
	
	//Faço a requisição de autenticação, e sempre chamo ele antes de renderizar 
	//qualquer página
	autenticar = require('../../middleware/autenticar-gLojas')

	/* Aponta para controllers/home */
	app.route('/gLojas/usuarios')
		.get(autenticar, usuarios.index)

	app.route('/gLojas/dellusuario/:id')
		.get(autenticar,usuarios.dellusuario)

	app.route('/gLojas/usuarios/adicionar')
		.get(autenticar,usuarios.addindex)
		.post(autenticar,usuarios.addusuario)

	app.route('/gLojas/usuarios/alterar/:id')
		.get(autenticar,usuarios.alterar)
		.post(autenticar,usuarios.salvaralteracao)

		
}