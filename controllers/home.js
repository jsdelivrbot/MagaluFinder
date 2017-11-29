module.exports = function(app){
	var app		  = require ('../index.js');
	var sequelize = require ('sequelize');
	var Sequelize = require ('../index.js');
	var search;
	var latitude;
	var longitude;
	var lojasProxima = []

	//Importar local dos models para Sequelize
	var modelsProdutos 	= require('../models/Produtos');
	var modelsLP 		= require('../models/lojas-produtos');
	var modelsFiliais 	= require('../models/Filiais');

	//Importar Models
	var Produtos = modelsProdutos.produtos
	var LP = modelsLP.lp
	var Lojas = modelsFiliais.filiais

	var HomeController = {
		//Função Index, chamada pela "route"
		index: function(req,res){
			//Procura lista de produtos, renderiza e envia os dados encontrados
			Produtos.findAll({
				atributes:['CodProduto','Imagem','Produto','Descricao','ValorProduto']
			}).then(dados =>{
				res.render('pages/index',{
				lista:dados
				})
			})
		},

		//Quando o cliente é redirecionado, é solicitado suas coordenadas e o que procura
		redirectSearch:function(req,res){
			latitude =req.body.Latitude;
			longitude=req.body.Longitude;
			search 	 =req.body.search;
			res.redirect('/search')
		},

		search:function(req,res){
			lojasProxima.length = 0
			const Op = Sequelize.Op;
			Produtos.findAll({
				where:{[Op.or]:[{CodProduto:search},{Produto:{[Op.like]:'%'+search+'%'}},{Search:{[Op.like]:'%'+search+'%'}}]},
				atributes:['CodProduto','Imagem','Produto','Descricao','ValorProduto']
			}).then(dados =>{
				res.render('pages/index',{
				lista:dados,
				search:search,
				Lat:latitude
				})
			})
		},

		nearBy:function(req,res){
			lojasProxima.length = 0
			var teste
			
			var ID = req.params.id;
			LP.findAll({
				where:{'Produto':ID},
				atributes:['Filial']
			}).then(function(lojas){
				console.log('testeaqui'+lojas.length)
				
				for(i=0;i<lojas.length;i++){
					Lojas.findOne({
						where:{'CodFilial':lojas[i].dataValues.Filial}
					}).then(function(proxima){
						if 	((parseFloat(proxima.dataValues.Latitude) 	> (parseFloat(latitude)+1))||
							(parseFloat(proxima.dataValues.Latitude) 	< (parseFloat(latitude)-1))||
							(parseFloat(proxima.dataValues.Longitude) 	> (parseFloat(longitude)+1))||
							(parseFloat(proxima.dataValues.Longitude)	< (parseFloat(longitude)-1))){
						}else{
							lojasProxima.push(proxima.dataValues.CodFilial)
						}						
					})
					
					
				}
				//Cria uma pausa para a alteração ser salva e abrir na pagina usuarios
				function callback(){
					res.redirect('/select/'+ID)
				}
				setTimeout(callback,1000);	
			})
			
		},
		selected:function(req,res){
			
			const Op = Sequelize.Op;
			var ID = req.params.id;
			console.log('aqui'+lojasProxima)


			Lojas.findAll({
				where:{'CodFilial':{[Op.in]: [lojasProxima]}}
			}).then(function(proximas){
				Produtos.findOne({
					where:{'CodProduto':ID},
					atributes:['CodProduto','Imagem','Produto','Descricao','ValorProduto']
				}).then(function(results){
					res.render('pages/selected',{
						CodProduto:results.dataValues.CodProduto,
						Imagem:results.dataValues.Imagem,
						Produto:results.dataValues.Produto,
						Descricao:results.dataValues.Descricao,
						ValorProduto:results.dataValues.ValorProduto,
						Lat:latitude,
						Long:longitude,
						proximas:proximas
					})
				})
			})
			
		},

		semLocalizacao:function(req,res,next){
			if (search){
				return next();
			}else{
				req.flash('erro','Para te ajudar, precisamos que você permita exibir sua localização!')
				return res.redirect('/')
			}
			
		}
	}
	return HomeController

}