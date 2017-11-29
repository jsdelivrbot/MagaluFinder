module.exports = function(app){
	//Importar local dos models para Sequelize
	var modelsFiliais 	= require('../../models/Filiais');

	//Importar Models
	var Lojas = modelsFiliais.filiais

	var Latitude,Longitude

	var HomeController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			//Search no banco com atributos necessários
			Lojas.findAll({
				atributes:['CodFilial','Descricao','Endereco','Bairro','Cidade','Cep','Latitude','Longitude']
			}).then(dados =>{
				//renderizo a pagina e levo os lojas como lista, e o grupo do usuario como grupo.
				res.render('gLojas/lojas/index',{
					grupo:req.session.grupo,
					lista:dados
				})
			})
			
		},
		//deleto o loja que foi solicitado, recebo o ID como parametro
		dellloja: function(req,res){
			var ID = req.params.id
			Lojas.destroy({
				where:{id:ID}
			})
			req.flash('deleted','Loja removida com sucesso!')
			function callback(){
				res.redirect('/gLojas/lojas')
			}
			setTimeout(callback,1000);
		},
		
		//renderiza a pagina para adicionar loja
		addindex: function(req,res){
			res.render('gLojas/lojas/adicionar',{
				grupo:req.session.grupo
			})
		},

		//função para adicionar o loja
		addloja: function(req,res){
			Lojas.findOrCreate({where:{CodFilial:req.body.CodFilial}, 
				defaults:{
					Descricao:req.body.Descricao,
					Endereco:req.body.Endereco,
					Bairro:req.body.Bairro,
					Cidade:req.body.Cidade,
					Cep:req.body.Cep,
					Latitude:req.body.Latitude,
					Longitude:req.body.Longitude
				}})
				.spread((user,created) =>{
					if (created == true){
						req.flash('created', 'Loja inserida com sucesso!')
						function callback(){
							res.redirect('/glojas/lojas')
						}
						setTimeout(callback,1000);	
					}else{
						req.flash('info', 'Loja já cadastrada!')
						res.redirect('/glojas/lojas')
					}
				})
		},

		alterar: function(req,res){
			var ID = req.params.id

			//Aqui é feito um search para localizar os dados do loja que sera alterado
			Lojas.findOne({
			where:{'id':ID},
			atributes:['CodFilial','Descricao','Endereco','Bairro','Cidade','Cep','Latitude','Longitude']
			}).then(function(results){
				Latitude = results.dataValues.Latitude;
				Longitude = results.dataValues.Latitude;

				res.render('gLojas/lojas/alterar',{
					grupo:req.session.grupo,
					CodFilial:results.dataValues.CodFilial,
					Descricao:results.dataValues.Descricao,
					Endereco:results.dataValues.Endereco,
					Bairro:results.dataValues.Bairro,
					Cidade:results.dataValues.Cidade,
					Cep:results.dataValues.Cep
				})
			})
					
		},

		salvaralteracao: function(req,res){
			//Verifica se foi feita alguma alteração de endereço,
			//caso sim, pega as cordenadas nova e caso não permanece.
			if(req.body.Latitude != ''){
				if((Latitude != req.body.Latitude) || (Longitude != req.body.Longitude)){
					Latitude = req.body.Latitude
					Longitude = req.body.Longitude
				}
			}
			var ID = req.params.id
			Lojas.find({
				where:{'id':ID},
				atributes:['CodFilial','Descricao','Endereco','Bairro','Cidade','Cep','Latitude','Longitude']
			}).then(function(results){
				results.updateAttributes({
					CodFilial:req.body.CodFilial,
					Descricao:req.body.Descricao,
					Endereco:req.body.Endereco,
					Bairro:req.body.Bairro,
					Cidade:req.body.Cidade,
					Cep:req.body.Cep,
					Latitude:Latitude,
					Longitude:Longitude
				});
			});	
			req.flash('created', 'Alteração salva com sucesso!')
			function callback(){
				res.redirect('/gLojas/lojas')
			}
			setTimeout(callback,1000);
		}
	}
	return HomeController

}