module.exports = function(app){
	var login = app.controllers.login

	/* Aponta para controllers/home */
	app.route('/login')
		.get(login.index)
		.post(login.autenticacao)

	app.route('/logout')
		.get(login.logout)
}