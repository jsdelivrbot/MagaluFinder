module.exports = function(app){
	var app		  = require ('../index.js');
	var sequelize = require ('sequelize');
	var Sequelize = require ('../index.js');
	var latitude = 0;
	var longitude = 0;
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
				var dadosSortidos=[]
				for (i=0;i<=9;i++){
					dadosSortidos.push(dados[Math.ceil(Math.random() * dados.length)])
				}				
				res.render('pages/index',{
				lista:dadosSortidos
				})
			})
		},

		search:function(req,res){
			var search 	 =req.body.search;
			const Op = Sequelize.Op;
			Produtos.findAll({
				where:{[Op.or]:[{CodProduto:search},{Produto:{[Op.like]:'%'+search+'%'}},{Search:{[Op.like]:'%'+search+'%'}}]},
				atributes:['CodProduto','Imagem','Produto','Descricao','ValorProduto']
			}).then(dados =>{
				res.render('pages/index',{
				lista:dados,
				search:search
				})
			})
		},


		//Quando clica no produto, é solicitado suas coordenadas e feito préfiltro.
		getLocation:function(req,res){
			var ID = req.params.id;
			latitude =req.params.lat;
			longitude=req.params.lng;
			lojasProxima.length=0

			LP.findAll({
				where:{'Produto':ID},
				atributes:['Filial']
			}).then(function(lojas){
				
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
			if(latitude != 0){

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

						latitude=0;
						longitude=0;
					})
				})

			}else{
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
						proximas:0
					})
				})
			}			
		}

	}
	return HomeController

}