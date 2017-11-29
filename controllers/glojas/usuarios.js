module.exports = function(app){
	//Importar local dos models para Sequelize
	var modelsUsuarios 	= require('../../models/Usuarios');
	var modelsFiliais 	= require('../../models/Filiais');

	//Importar Models
	var Filiais = modelsFiliais.filiais
	var Usuarios = modelsUsuarios.usuarios

	var HomeController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			//Search no banco com atributos necessários
			Usuarios.findAll({
				atributes:['Nome','Usuario','Senha','Loja','Grupo']
			}).then(dados =>{
				//renderizo a pagina e levo os usuarios como lista, e o grupo do usuario como grupo.
				res.render('gLojas/usuarios/index',{
					grupo:req.session.grupo,
					lista:dados
				})
			})
			
		},
		//deleto o usuario que foi solicitado, recebo o ID como parametro
		dellusuario: function(req,res){
			var ID = req.params.id
			Usuarios.destroy({
				where:{id:ID}
			})
			req.flash('deleted','Usuario excluído com sucesso!')
			function callback(){
				res.redirect('/gLojas/usuarios')
			}
			setTimeout(callback,1000);
		},
		
		//renderiza a pagina para adicionar usuario
		addindex: function(req,res){
			//Aqui é feito um search, para que na adição seja setado uma filial existente
			Filiais.findAll({
				atributes:['CodFilial']
			}).then(dados =>{
				//renderizo a pagina e levo as filiais como lista, e o grupo do usuario como grupo.
				res.render('gLojas/usuarios/adicionar',{
					grupo:req.session.grupo,
					lista:dados
				})
			})
		},

		//função para adicionar o usuario
		addusuario: function(req,res){
			//caso seja gestor de lojas, a loja será 0
			if (req.body.Grupo==1){
				var loja = 0;
			}else{
				var loja = req.body.Loja
			}
			Usuarios.findOrCreate({where:{Usuario:req.body.Usuario}, 
				defaults:{
					Nome:req.body.Nome,
					Senha:req.body.Senha,
					Loja:loja,
					Grupo:req.body.Grupo
				}})
				.spread((user,created) =>{
					if (created == true){
						req.flash('created', 'Usuário adicionado com sucesso!')
						function callback(){
							res.redirect('/glojas/usuarios')
						}
						setTimeout(callback,1000);	
					}else{
						req.flash('info', 'Usuário já existente!')
						res.redirect('/glojas/usuarios')
					}
				})
		},

		alterar: function(req,res){
			var ID = req.params.id

			//Aqui é feito um search para localizar os dados do usuario que sera alterado
			Usuarios.findOne({
			where:{'id':ID},
			atributes:['Nome','Usuario','Senha','Loja','Grupo']
			}).then(function(results){
				res.render('gLojas/usuarios/alterar',{
					grupo:req.session.grupo,
					Nome:results.dataValues.Nome,
					Usuario:results.dataValues.Usuario,
					Senha:results.dataValues.Senha,
					Loja:results.dataValues.Loja,
					Grupo:results.dataValues.Grupo
				})
			})
					
		},

		salvaralteracao: function(req,res){
			var ID = req.params.id
			Usuarios.find({
				where:{'id':ID},
				atributes:['Nome','Usuario','Senha','Loja','Grupo']
			}).then(function(results){
				results.updateAttributes({
					Nome:req.body.Nome,
					Usuario:req.body.Usuario,
					Senha:req.body.Senha,
					Grupo:req.body.Grupo,
				});
			});	
			req.flash('created', 'Alteração salva com sucesso!')
			function callback(){
				res.redirect('/gLojas/usuarios')
			}
			setTimeout(callback,1000);
		}
	}
	return HomeController

}