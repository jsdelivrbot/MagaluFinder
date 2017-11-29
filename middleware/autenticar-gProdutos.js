module.exports = function(req,res,next){
	
	if (req.session.grupo == '2'){
		return next();
	}
	if (req.session.grupo == 1){
		req.flash('falha','Você não tem permissão para abrir a página solicitada!');
		return res.redirect('/gLojas');	
	}else{
		req.flash('falha','Você não tem permissão para abrir a página solicitada!');
		return res.redirect('/login');	
	}

}