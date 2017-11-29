function salvarAlteracao(idProduto){
	if (document.getElementById(idProduto).checked==true){
		window.location.href = '/gProdutos/AddLoja/'+idProduto;
	}
	if (document.getElementById(idProduto).checked==false){
		window.location.href = '/gProdutos/delLoja/'+idProduto;
	}
}