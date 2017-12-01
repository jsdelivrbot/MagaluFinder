module.exports = function(app){
	var home = app.controllers.home
	

	/* Aponta para controllers/home */
	
	app.route('/')
		.get(home.index)
		.post(home.search)

	app.route('/getLocation/:id/:lat/:lng')
		.get(home.getLocation)

	app.route('/search')
		.get(home.search)
		.post(home.search)


	app.route('/select/:id')
		.get(home.selected)
		.post(home.search)
}