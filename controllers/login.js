module.exports = function(app){
	var Sequelize 	 = require('sequelize');
	var sequelize = require('../index.js')

	//Importar local dos models para Sequelize
	var modelsUsuarios 	= require('../models/Usuarios');
	//Importar Models
	var Usuarios = modelsUsuarios.usuarios

	//Variaveis para usar em todo controller
	var usuario
	var validacao 

	var glojasController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			res.render('login/index')
			
		},

		autenticacao: function(req,res){
			usuario  = req.body.usuario;
			var password = req.body.password;


			//procurar usuario no banco para autenticação
			Usuarios.findOne({
				where: {'Usuario': usuario},
				attributes: ['Nome','Usuario','Senha','Loja','Grupo']
			}).then(function(results) {	
				if (results == null){
					req.flash('erro','Usuário não encontrado');
					res.redirect("/login");
				}else{
					if (password == results.dataValues.Senha){
						req.session.nome=results.dataValues.Nome;
						req.session.loja=results.dataValues.Loja;
						req.session.grupo=results.dataValues.Grupo;
						if(req.session.grupo == 1){
							res.redirect("/gLojas");
						}else if (req.session.grupo == 2){
							res.redirect("/gProdutos");
						}
						
					}else{
						req.flash('erro', 'Senha Inválida')
						res.redirect("/login");
					}
				}
			})			

		},
		//logout do usuario e redireciona para a pagina inicial do sistema
		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		}	
	}

	return glojasController

}