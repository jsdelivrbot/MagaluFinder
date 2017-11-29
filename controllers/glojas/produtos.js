module.exports = function(app){
	//Importar local dos models para Sequelize
	var modelsProdutos 	= require('../../models/Produtos');

	//Importar Models
	var Produtos = modelsProdutos.produtos

	var HomeController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			//Search no banco com atributos necessários
			Produtos.findAll({
				atributes:['CodProduto','Imagem','Produto','Descricao','ValorProduto']
			}).then(dados =>{
				//renderizo a pagina e levo os produtos como lista, e o grupo do usuario como grupo.
				res.render('gLojas/produtos/index',{
					grupo:req.session.grupo,
					lista:dados
				})
			})
			
		},
		//deleto o usuario que foi solicitado, recebo o ID como parametro
		dellproduto: function(req,res){
			var ID = req.params.id
			Produtos.destroy({
				where:{id:ID}
			})
			req.flash('deleted','Produto excluído com sucesso!')
			function callback(){
				res.redirect('/gLojas/produtos')
			}
			setTimeout(callback,1000);
		},
		
		//renderiza a pagina para adicionar produto
		addindex: function(req,res){
			res.render('gLojas/produtos/adicionar',{
				grupo:req.session.grupo
			})
		},

		//função para adicionar o produto
		addproduto: function(req,res){
			Produtos.findOrCreate({where:{CodProduto:req.body.CodProduto}, 
				defaults:{
					Imagem:req.body.Imagem,
					Produto:req.body.Produto,
					Descricao:req.body.Descricao,
					Search:req.body.Search,
					ValorProduto:req.body.ValorProduto
				}})
				.spread((user,created) =>{
					if (created == true){
						req.flash('created', 'Item adicionado com sucesso!')
						function callback(){
							res.redirect('/glojas/produtos')
						}
						setTimeout(callback,1000);	
					}else{
						req.flash('info', 'Item já existente!')
						res.redirect('/glojas/produtos')
					}
				})
		},

		alterar: function(req,res){
			var ID = req.params.id
			Produtos.findOne({
				where:{'id':ID},
				atributes:['CodProduto','Imagem','Produto','Descricao','Search','ValorProduto']
				}).then(function(results){
					res.render('gLojas/produtos/alterar',{
						grupo:req.session.grupo,
						CodProduto:results.dataValues.CodProduto,
						Imagem:results.dataValues.Imagem,
						Produto:results.dataValues.Produto,
						Descricao:results.dataValues.Descricao,
						Search:results.dataValues.Search,
						ValorProduto:results.dataValues.ValorProduto
					})
				})		
		},

		salvaralteracao: function(req,res){
			var ID = req.params.id
			Produtos.find({
				where:{'id':ID},
				atributes:['CodProduto','Imagem','Produto','Descricao','Search','ValorProduto']
			}).then(function(results){
				results.updateAttributes({
					CodProduto:req.body.CodProduto,
					Imagem:req.body.Imagem,
					Produto:req.body.Produto,
					Descricao:req.body.Descricao,
					Search:req.body.Search,
					ValorProduto:req.body.ValorProduto
				});
			});	
			req.flash('created', 'Alteração salva com sucesso!')
			function callback(){
				res.redirect('/gLojas/produtos')
			}
			setTimeout(callback,1000);
		}
	}
	return HomeController

}