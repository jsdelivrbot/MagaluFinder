module.exports = function(app){
	//Importar local dos models para Sequelize
	var modelsProdutos 	= require('../models/Produtos');
	var modelsLP 		= require('../models/lojas-produtos');

	//Importar Models
	var Produtos = modelsProdutos.produtos
	var LP = modelsLP.lp

	var HomeController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			res.render('gProdutos/index', {
				nome:req.session.nome,
				grupo:req.session.grupo
			})
			
		},

		loja:function(req,res){
			LP.findAll({
				where:{Filial:req.session.loja},
				atributes:['Produto']
			}).then(results =>{
				Produtos.findAll({
					atributes:['CodProduto','Imagem','Produto','Descricao','ValorProduto']
				}).then(dados =>{
					//renderizo a pagina e levo os produtos como lista, e o grupo do usuario como grupo.
					res.render('gProdutos/loja',{
						disponiveis:results,
						lista:dados,
						grupo:req.session.grupo
					})
				})	
			})
		},

		adicionar:function(req,res){
			var ID = req.params.id;
			LP.findOrCreate({where:{Filial:req.session.loja,Produto:ID}})
				.spread((user,created) =>{
					if (created == true){

					}else{
						req.flash('info', 'Loja já cadastrada!')
						res.redirect('/gProdutos/MinhaLoja')
					}
				})
		},

		dell: function(req,res){
			var ID = req.params.id
			LP.destroy({
				where:{Filial:req.session.loja,Produto:ID}
			})
		}
	}
	return HomeController

}