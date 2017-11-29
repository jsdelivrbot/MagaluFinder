module.exports = function(app){
	var home = app.controllers.home
	

	/* Aponta para controllers/home */
	
	app.route('/')
		.get(home.index)
		.post(home.redirectSearch)

	app.route('/search')
		.get(home.search)
		.post(home.redirectSearch)

	app.route('/nearby/:id')
		.get(home.nearBy)
		.post(home.redirectSearch)

	app.route('/select/:id')
		.get(home.semLocalizacao,home.selected)
		.post(home.redirectSearch)
}