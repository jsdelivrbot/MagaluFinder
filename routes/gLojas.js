module.exports = function(app){
	var gLojas = app.controllers.glojas
	autenticar = require('../middleware/autenticar-gLojas')

	/* Aponta para controllers/home */
	app.route('/gLojas')
		.get(autenticar, gLojas.index)
}